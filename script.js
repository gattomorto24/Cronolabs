    <!-- JAVASCRIPT (Logica di overlay aggiornata) -->
        // Stato Globale Pagina
        let currentPage = 'home';
        
        // Stato Globale Impostazioni
        let useAlerts = true;
        let useSystemTheme = false;
        const systemThemeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
        
        // --- FUNZIONE DI NAVIGAZIONE PRINCIPALE ---
        function navigateTo(pageId) {
            const pages = document.querySelectorAll('.page-content');
            const targetPage = document.getElementById(`page-${pageId}`);
            const sideMenuNavList = document.getElementById('side-menu-nav-list');
            
            if (!targetPage) { console.error(`Pagina non trovata: ${pageId}`); return; }
            
            pages.forEach(page => page.classList.remove('active'));
            targetPage.classList.add('active');
            
            if (sideMenuNavList) {
                sideMenuNavList.querySelectorAll('.list-item').forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-page') === pageId) {
                        item.classList.add('active');
                    }
                });
            }
            
            currentPage = pageId;
            window.scrollTo(0, 0);
            
            if (isMenuOpen) closeSideMenu();
        }
        
        // --- Inizializzazione al caricamento ---
        document.addEventListener('DOMContentLoaded', () => {
            initNavbar();
            initOverlays();
            initThemeSwitcher();
            initTiltEffect();
            initDragScroll();
            initCronoAIFeatures();
            initControlCenterWidgets();
            initCollapsibleMenus();

            // Carica accento salvato
            const savedAccent = localStorage.getItem('cronolab-accent') || 'blue';
            document.documentElement.setAttribute('data-accent-color', savedAccent);

            navigateTo('home');
        });

        // Variabili globali per gli overlay
        let isMenuOpen = false;
        let isAlertOpen = false; // Separato da modal
        let isSettingsOpen = false;
        
        const body = document.body;
        const backdrop = document.getElementById('backdrop');
        const sidePanel = document.getElementById('side-panel');
        const alertModal = document.getElementById('alert-modal-overlay');
        const settingsOverlay = document.getElementById('control-center-overlay');

        // Funzioni di chiusura specifiche
        function closeSideMenu() {
            sidePanel.classList.remove('active');
            if (!isAlertOpen && !isSettingsOpen) { 
                backdrop.classList.remove('active');
                body.classList.remove('no-scroll');
            }
            isMenuOpen = false;
        }
        
        function closeAlertModal() {
            alertModal.classList.remove('active');
            if (!isMenuOpen && !isSettingsOpen) {
                backdrop.classList.remove('active');
                body.classList.remove('no-scroll');
            }
            isAlertOpen = false;
        }
        
        function closeControlCenter() {
            settingsOverlay.classList.remove('active');
            if (!isMenuOpen && !isAlertOpen) {
                body.classList.remove('no-scroll');
            }
            isSettingsOpen = false;
        }
        
        function openAlertModal() {
            if (isMenuOpen) closeSideMenu();
            if (isSettingsOpen) closeControlCenter();
            alertModal.classList.add('active');
            backdrop.classList.add('active');
            body.classList.add('no-scroll');
            isAlertOpen = true;
        }

        /* --- GESTIONE OVERLAYS --- */
        function initOverlays() {
            // Bottoni Navbar
            const menuBtn = document.getElementById('menu-toggle-btn');
            const quickSettingsBtn = document.getElementById('quick-settings-btn');
            
            // Bottoni Side Menu
            const closeMenuBtn = document.getElementById('close-menu-btn');
            const navLinks = document.querySelectorAll('#side-menu-nav-list a[data-page]');
            const openSettingsBtn = document.getElementById('open-settings-overlay-btn');
            
            // Bottoni Control Center
            const closeSettingsBtn = document.getElementById('control-center-close-btn');
            const testAlertBtn = document.getElementById('open-alert-btn'); // Bottone Test Alert
            

            function openMenu() {
                if (isAlertOpen) closeAlertModal(); 
                if (isSettingsOpen) closeControlCenter(); 
                sidePanel.classList.add('active');
                backdrop.classList.add('active');
                body.classList.add('no-scroll');
                isMenuOpen = true;
            }

            function openControlCenter() {
                if (isMenuOpen) closeSideMenu();
                if (isAlertOpen) closeAlertModal();
                settingsOverlay.classList.add('active');
                body.classList.add('no-scroll');
                isSettingsOpen = true;
            }

            // Listeners Navbar
            if (menuBtn) menuBtn.addEventListener('click', openMenu);
            if (quickSettingsBtn) quickSettingsBtn.addEventListener('click', openControlCenter);

            // Listeners Side Menu
            if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeSideMenu);
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    const pageId = link.getAttribute('data-page');
                    if(pageId) navigateTo(pageId); 
                });
            });
            if (openSettingsBtn) openSettingsBtn.addEventListener('click', openControlCenter);
            
            // Listeners Control Center
            if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeControlCenter);
            if (testAlertBtn) {
                testAlertBtn.addEventListener('click', () => {
                     showNotification({
                        title: 'Test Alert',
                        message: 'Questo è un alert di test. Se disattivi "Mostra come Alert", diventerà un toast.',
                        buttons: [
                            { text: 'Annulla', class: 'secondary' }, 
                            { text: 'OK', class: 'primary', callback: () => showNotification({ title: 'Successo!', message: 'Callback eseguita.', buttons: [{ text: 'Chiudi'}] }) }
                        ]
                    });
                });
            }

            // Listener Backdrop
            if (backdrop) {
                backdrop.addEventListener('click', () => {
                    if (isMenuOpen) closeSideMenu();
                    if (isAlertOpen) closeAlertModal();
                });
            }
            
            // Listener ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (isAlertOpen) closeAlertModal();
                    else if (isSettingsOpen) closeControlCenter();
                    else if (isMenuOpen) closeSideMenu();
                }
            });
        }
        
        /* --- Logica Widget Control Center --- */
        function initControlCenterWidgets() {
            const pageContainer = document.getElementById('page-container');
            
            // Slider Luminosità
            const brightnessSlider = document.getElementById('cc-slider-brightness');
            if (brightnessSlider) {
                const track = brightnessSlider.nextElementSibling;
                brightnessSlider.addEventListener('input', (e) => {
                    const value = e.target.value;
                    track.style.height = `${value}%`;
                    pageContainer.style.filter = `brightness(${value}%)`;
                });
            }

            // Slider Scala Contenuto
            const scaleSlider = document.getElementById('cc-slider-scale');
            if (scaleSlider) {
                const track = scaleSlider.nextElementSibling;
                scaleSlider.addEventListener('input', (e) => {
                    const value = e.target.value; // 0 (normal) a 100 (piccolo)
                    track.style.height = `${value}%`;
                    const scaleValue = 1.0 - (value / 100) * 0.3; 
                    pageContainer.style.transform = `scale(${scaleValue})`;
                });
            }
            
            // Selettore Colore
            const colorBtns = document.querySelectorAll('.cc-color-btn');
            const savedAccent = localStorage.getItem('cronolab-accent') || 'blue';
            
            let activeBtn = document.querySelector(`.cc-color-btn[data-color="${savedAccent}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }

            colorBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const colorName = btn.dataset.color;
                    
                    document.documentElement.setAttribute('data-accent-color', colorName);
                    localStorage.setItem('cronolab-accent', colorName);
                    
                    colorBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });

            // Toggle "Mostra come Alert"
            const alertModeToggle = document.getElementById('toggle-alert-mode');
            if (alertModeToggle) {
                useAlerts = localStorage.getItem('cronolab-use-alerts') !== 'false';
                alertModeToggle.checked = useAlerts;
                
                alertModeToggle.addEventListener('change', (e) => {
                    useAlerts = e.target.checked;
                    localStorage.setItem('cronolab-use-alerts', useAlerts);
                });
            }
            
            // Toggle "Automatico"
            const autoThemeToggle = document.getElementById('toggle-automatic-theme');
            const radioLight = document.getElementById('theme-radio-light');
            const radioDark = document.getElementById('theme-radio-dark');
            const lightLabel = radioLight.closest('label');
            const darkLabel = radioDark.closest('label');

            function setAutoThemeState(isAutomatic) {
                useSystemTheme = isAutomatic;
                radioLight.disabled = isAutomatic;
                radioDark.disabled = isAutomatic;
                lightLabel.classList.toggle('disabled', isAutomatic);
                darkLabel.classList.toggle('disabled', isAutomatic);
                
                if (isAutomatic) {
                    showNotification({
                        title: 'Tema Automatico Attivato',
                        message: 'Il tema si adatterà alle impostazioni del tuo sistema.',
                        buttons: [{ text: 'OK' }]
                    });
                    // Applica immediatamente il tema di sistema
                    applySystemTheme();
                } else {
                     // Ritorna al tema salvato manualmente
                    setTheme(localStorage.getItem('cronolab-theme') || 'cronolab');
                }
            }
            
            if (autoThemeToggle) {
                // Carica stato (default false)
                useSystemTheme = localStorage.getItem('cronolab-auto-theme') === 'true';
                autoThemeToggle.checked = useSystemTheme;
                setAutoThemeState(useSystemTheme); // Applica stato iniziale
                
                autoThemeToggle.addEventListener('change', (e) => {
                    const isAutomatic = e.target.checked;
                    localStorage.setItem('cronolab-auto-theme', isAutomatic);
                    setAutoThemeState(isAutomatic);
                });
            }
        }
        
        function applySystemTheme() {
            if (useSystemTheme) {
                 setTheme(systemThemeMatcher.matches ? 'cronolab' : 'light', true); // true = non salvare in manuale
            }
        }
        // Listener per cambi tema di sistema
        systemThemeMatcher.addEventListener('change', applySystemTheme);


        /* --- THEME SWITCHER (Logica aggiornata) --- */
        function initThemeSwitcher() {
            // Elementi Control Center
            const radioLight = document.getElementById('theme-radio-light');
            const radioDark = document.getElementById('theme-radio-dark');
            
            // Carica tema salvato
            const savedTheme = localStorage.getItem('cronolab-theme') || 'cronolab';
            setTheme(savedTheme, true); // true = inizializzazione

            // Listeners per Control Center
            if (radioLight) {
                radioLight.addEventListener('change', () => {
                    if(radioLight.checked) setTheme('light');
                });
            }
            if (radioDark) {
                radioDark.addEventListener('change', () => {
                    if(radioDark.checked) setTheme('cronolab');
                });
            }
        }
        
        // Funzione setTheme globale (aggiornata)
        window.setTheme = function(themeName, isInitialization = false) {
            document.body.setAttribute('data-theme', themeName);
            
            // Salva solo se non è in modalità automatica O se è l'init
            if (!useSystemTheme || isInitialization) {
                 localStorage.setItem('cronolab-theme', themeName);
            }

            // Sincronizza i radio button nel Control Center
            const radioLight = document.getElementById('theme-radio-light');
            const radioDark = document.getElementById('theme-radio-dark');
            
            if (themeName === 'light') {
                if (radioLight) radioLight.checked = true;
            } else {
                if (radioDark) radioDark.checked = true;
            }
        };

        /* --- NAVBAR SCROLL --- */
        function initNavbar() {
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 10);
            });
        }

        /* --- TILT EFFECT --- */
        function initTiltEffect() {
            const cards = document.querySelectorAll('.post-preview-card, .cc-widget');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left; 
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -4;
                    const rotateY = ((x - centerX) / centerX) * 4;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
                });
            });
        }

        /* --- DRAG TO SCROLL --- */
        function initDragScroll() {
            const sliders = document.querySelectorAll('.horizontal-scroll-wrapper');
            sliders.forEach(slider => {
                let isDown = false;
                let startX, scrollLeft;
                slider.style.cursor = 'grab';
                slider.addEventListener('mousedown', (e) => {
                    isDown = true;
                    slider.style.cursor = 'grabbing';
                    startX = e.pageX - slider.offsetLeft;
                    scrollLeft = slider.scrollLeft;
                });
                slider.addEventListener('mouseleave', () => { isDown = false; slider.style.cursor = 'grab'; });
                slider.addEventListener('mouseup', () => { isDown = false; slider.style.cursor = 'grab'; });
                slider.addEventListener('mousemove', (e) => {
                    if(!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - slider.offsetLeft;
                    const walk = (x - startX) * 2;
                    slider.scrollLeft = scrollLeft - walk;
                });
            });
        }

        /* --- NUOVO SISTEMA DI NOTIFICHE --- */
        
        // La nuova funzione principale per le notifiche
        window.showNotification = function(options) {
            // options = { title, message, buttons: [{ text, class, callback }] }
            
            if (useAlerts) {
                showAlertModal(options);
            } else {
                // Se non si usano alert, mostra un semplice toast
                _showToast(options.message);
            }
        }

        // Funzione interna per mostrare i Toast
        function _showToast(message) {
            const container = document.getElementById('toaster-container');
            if (!container) return;
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            container.appendChild(toast);
            setTimeout(() => {
                toast.classList.add('fade-out');
                toast.addEventListener('animationend', () => toast.remove());
            }, 3000);
        }
        
        // Funzione interna per mostrare gli Alert dinamici
        function showAlertModal(options) {
            const titleEl = document.getElementById('alert-modal-title');
            const messageEl = document.getElementById('alert-modal-message');
            const footerEl = document.getElementById('alert-modal-footer');
            
            // Popola titolo e messaggio
            titleEl.textContent = options.title || 'Notifica';
            messageEl.textContent = options.message || '';
            
            // Pulisci bottoni precedenti
            footerEl.innerHTML = '';
            
            // Crea nuovi bottoni
            if (!options.buttons || options.buttons.length === 0) {
                // Fallback con bottone OK
                options.buttons = [{ text: 'OK' }];
            }
            
            options.buttons.forEach(btnData => {
                const button = document.createElement('button');
                button.textContent = btnData.text;
                button.className = 'alert-btn';
                
                // Aggiungi classi per stile
                if (options.buttons.length === 1) {
                    button.classList.add('alert-btn-single');
                } else {
                    button.classList.add('alert-btn-pair');
                }
                
                if (btnData.class === 'destructive') {
                    button.classList.add('destructive');
                }
                
                // Aggiungi listener
                button.onclick = () => {
                    closeAlertModal();
                    if (btnData.callback && typeof btnData.callback === 'function') {
                        btnData.callback();
                    }
                };
                
                footerEl.appendChild(button);
            });
            
            // Apri il modale
            openAlertModal();
        }


        /* --- LOGICA CronoAI (Rinominato) --- */
        function initCronoAIFeatures() {
            const generateBtn = document.getElementById('cronoai-generate-btn');
            const promptInput = document.getElementById('cronoai-prompt-input');
            if (generateBtn && promptInput) {
                generateBtn.addEventListener('click', async () => {
                    const userPrompt = promptInput.value;
                    if (!userPrompt) {
                        showNotification({ 
                            title: 'Input Mancante', 
                            message: 'Per favore, inserisci un argomento.',
                            buttons: [{ text: 'OK' }]
                        });
                        return;
                    }
                    setLoadingState(generateBtn, true);
                    const systemPrompt = "Sei un editor di un blog di design e tecnologia. Genera 5 titoli creativi per un post basato sull'argomento dell'utente. Restituisci *solo* una lista numerata (es. '1. Titolo...\\n2. Titolo...'), e nient'altro.";
                    try {
                        const responseText = await callCronoAI_API(userPrompt, systemPrompt);
                        displayCronoAIResults(responseText);
                    } catch (error) {
                        console.error("Errore chiamata CronoAI:", error);
                        showNotification({ 
                            title: 'Errore API', 
                            message: 'Errore durante la generazione delle idee.',
                            buttons: [{ text: 'OK' }]
                        });
                    } finally {
                        setLoadingState(generateBtn, false);
                    }
                });
            }
        }
        function setLoadingState(button, isLoading) {
            if (isLoading) {
                button.classList.add('loading');
                button.disabled = true;
            } else {
                button.classList.remove('loading');
                button.disabled = false;
            }
        }
        async function callCronoAI_API(userQuery, systemPrompt) {
            const apiKey = ""; // Lasciato vuoto
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
            const payload = {
                contents: [{ parts: [{ text: userQuery }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
            };
            const response = await fetchWithRetry(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }, 3);
            if (!response.ok) throw new Error(`Errore API: ${response.statusText}`);
            const result = await response.json();
            if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts[0].text) {
                return result.candidates[0].content.parts[0].text;
            } else {
                throw new Error("Formato risposta API non valido.");
            }
        }
        async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
            for (let i = 0; i < retries; i++) {
                try {
                    const response = await fetch(url, options);
                    if (!response.ok && response.status === 429) {
                        throw new Error('Rate limited');
                    }
                    return response;
                } catch (error) {
                    if (i === retries - 1) throw error;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                }
            }
        }
        function displayCronoAIResults(responseText) {
            const container = document.getElementById('cronoai-results-container');
            container.innerHTML = '';
            const ideas = responseText.split('\n')
                                      .map(line => line.replace(/^\d+\.\s*/, ''))
                                      .filter(line => line.trim().length > 0);
            if (ideas.length === 0) {
                container.innerHTML = '<p class="gemini-idea-item" style="color: var(--text-secondary);">Non sono state trovate idee. Prova un argomento diverso.</p>';
                return;
            }
            ideas.forEach(ideaText => {
                const ideaElement = document.createElement('div');
                ideaElement.className = 'gemini-idea-item';
                ideaElement.textContent = ideaText;
                container.appendChild(ideaElement);
            });
        }

        /* --- MENU COLLAPSIBILI (Articoli & Snippet) --- */
        function initCollapsibleMenus() {
            const articlesToggle = document.getElementById('articles-toggle');
            const articlesSubmenu = document.getElementById('articles-submenu');
            const snippetsToggle = document.getElementById('snippets-toggle');
            const snippetsSubmenu = document.getElementById('snippets-submenu');

            if (articlesToggle && articlesSubmenu) {
                articlesToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    articlesToggle.classList.toggle('active');
                    articlesSubmenu.classList.toggle('active');
                });
            }

            if (snippetsToggle && snippetsSubmenu) {
                snippetsToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    snippetsToggle.classList.toggle('active');
                    snippetsSubmenu.classList.toggle('active');
                });
            }
        }

        /* --- MODAL PAYPAL --- */
        let isPayPalOpen = false;
        const paypalModal = document.getElementById('paypal-modal-overlay');

        window.openPayPalModal = function() {
            if (isMenuOpen) closeSideMenu();
            if (isSettingsOpen) closeControlCenter();
            if (isAlertOpen) closeAlertModal();
            paypalModal.classList.add('active');
            backdrop.classList.add('active');
            body.classList.add('no-scroll');
            isPayPalOpen = true;
        }

        window.closePayPalModal = function() {
            paypalModal.classList.remove('active');
            backdrop.classList.remove('active');
            body.classList.remove('no-scroll');
            isPayPalOpen = false;
        }

        // Aggiungi gestione backdrop per PayPal
        document.addEventListener('DOMContentLoaded', () => {
            if (backdrop) {
                const originalBackdropClick = backdrop.onclick;
                backdrop.addEventListener('click', () => {
                    if (isPayPalOpen) closePayPalModal();
                });
            }

            // Gestione ESC per PayPal
            const originalKeyDown = document.onkeydown;
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && isPayPalOpen) {
                    closePayPalModal();
                }
            });
        });
