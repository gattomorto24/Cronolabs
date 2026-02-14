// verify-payment.js
// Backend Node.js per verifica ordine PayPal

const express = require('express');
let fetch;
async function getFetch() {
  if (!fetch) {
    fetch = (await import('node-fetch')).default;
  }
  return fetch;
}
const app = express();
app.use(express.json());

// Inserisci qui il tuo Client ID e Secret Key in modo sicuro
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_API = 'https://api.paypal.com'; // Live

app.post('/verify-payment', async (req, res) => {
  const { orderID } = req.body;
  if (!orderID) return res.status(400).json({ error: 'Missing orderID' });

  try {
    const fetchFn = await getFetch();
    // Ottieni access token
    const basicAuth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
    const tokenRes = await fetchFn(`${PAYPAL_API}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Verifica ordine
    const orderRes = await fetchFn(`${PAYPAL_API}/v2/checkout/orders/${orderID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const orderData = await orderRes.json();

    if (orderData.status === 'COMPLETED') {
      // Erogazione servizio, salvataggio DB, ecc.
      return res.json({ status: 'COMPLETED', order: orderData });
    } else {
      return res.json({ status: orderData.status });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Errore verifica PayPal', details: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`PayPal verify backend in ascolto su ${PORT}`);
});
