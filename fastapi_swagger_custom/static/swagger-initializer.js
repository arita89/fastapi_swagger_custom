window.onload = function () {
    const successAudio = new Audio('/static/success.mp3');
    const failAudio = new Audio('/static/fail.mp3');
    let soundOn = true;
    let audioEnabled = false;
    let darkMode = false;

    // --- DARK MODE TOGGLE ---
    function addDarkModeButton() {
        if (document.getElementById("dark-mode-btn")) return;
        const btn = document.createElement("button");
        btn.id = "dark-mode-btn";
        btn.innerText = "🌙 Dark Mode";
        btn.style.position = "fixed";
        btn.style.bottom = "60px";
        btn.style.right = "20px";
        btn.style.zIndex = 1000;
        btn.style.padding = "10px 16px";
        btn.style.borderRadius = "8px";
        btn.style.border = "none";
        btn.style.background = "#333";
        btn.style.color = "#fff";
        btn.style.fontSize = "16px";
        btn.style.cursor = "pointer";
        btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
        btn.onclick = function () {
            darkMode = !darkMode;
            if (darkMode) {
                document.body.classList.add("swagger-dark");
                btn.innerText = "☀️ Light Mode";
            } else {
                document.body.classList.remove("swagger-dark");
                btn.innerText = "🌙 Dark Mode";
            }
        };
        document.body.appendChild(btn);
    }

    // --- STEALTH CAT EASTER EGG ---
    function addStealthCatEasterEgg() {
        if (document.getElementById("signature-easter-egg")) return;
        const cat = document.createElement("div");
        cat.id = "signature-easter-egg";
        cat.innerText = "🐱";
        cat.title = "";
        cat.style.position = "fixed";
        cat.style.bottom = "8px";
        cat.style.left = "8px";
        cat.style.zIndex = "1001";
        cat.style.opacity = "0.14";
        cat.style.fontSize = "28px";
        cat.style.userSelect = "none";
        cat.style.cursor = "pointer";
        cat.style.transition = "opacity 0.2s, color 0.3s, background 0.3s";
        cat.onmouseenter = () => { cat.style.opacity = "0.5"; }
        cat.onmouseleave = () => { cat.style.opacity = "0.14"; }
        cat.onclick = function () {
            // Detect dark mode by checking class on body
            const isDark = document.body.classList.contains("swagger-dark");
            cat.innerText = "🎉 congrats, you found 1/973 cats! arto";
            cat.style.opacity = "1";
            cat.style.background = isDark ? "#23242a" : "#faf7e7";
            cat.style.color = isDark ? "#fff" : "#2d1460";
            cat.style.padding = "8px 12px";
            cat.style.borderRadius = "8px";
            cat.style.fontSize = "16px";
            cat.style.fontWeight = "bold";
            cat.style.boxShadow = "0 2px 12px rgba(0,0,0,0.20)";
            successAudio.currentTime = 0;
            successAudio.play();
            setTimeout(() => {
                cat.innerText = "🐱";
                cat.style.opacity = "0.14";
                cat.style.background = "none";
                cat.style.color = "";
                cat.style.padding = "0";
                cat.style.borderRadius = "0";
                cat.style.fontSize = "28px";
                cat.style.fontWeight = "normal";
                cat.style.boxShadow = "none";
            }, 2400);
        };
        document.body.appendChild(cat);
    }

    // --- SOUND BUTTON ---
    function addSoundButton() {
        if (document.getElementById("sound-toggle-btn")) return;
        const btn = document.createElement("button");
        btn.id = "sound-toggle-btn";
        btn.innerText = "🔊 Sound: ON";
        btn.style.position = "fixed";
        btn.style.bottom = "20px";
        btn.style.right = "20px";
        btn.style.zIndex = 1000;
        btn.style.padding = "10px 16px";
        btn.style.borderRadius = "8px";
        btn.style.border = "none";
        btn.style.background = "#222";
        btn.style.color = "#fff";
        btn.style.fontSize = "16px";
        btn.style.cursor = "pointer";
        btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        btn.onclick = function () {
            soundOn = !soundOn;
            btn.innerText = soundOn ? "🔊 Sound: ON" : "🔇 Sound: OFF";
        };
        document.body.appendChild(btn);
    }

    // Wait for Swagger UI to render, then add buttons
    function waitForExtras() {
        if (document.getElementById("swagger-ui")) {
            addSoundButton();
            addDarkModeButton();
            addStealthCatEasterEgg();
        } else {
            setTimeout(waitForExtras, 300);
        }
    }
    waitForExtras();

    // --- DARK MODE CSS ---
    const style = document.createElement('style');
    style.innerHTML = `
      .swagger-dark {
        background: #19191b !important;
      }
      .swagger-dark #swagger-ui,
      .swagger-dark .swagger-ui {
        background: #222 !important;
        color-scheme: dark;
      }
      .swagger-dark .topbar,
      .swagger-dark .information-container,
      .swagger-dark .scheme-container,
      .swagger-dark .scheme-container, 
      .swagger-dark .opblock-tag,
      .swagger-dark .opblock-summary,
      .swagger-dark .opblock-section-header {
        background: #23242a !important;
        color: #eee !important;
      }
      .swagger-dark .opblock {
        background: #24262b !important;
        border-color: #393d4a !important;
      }
      .swagger-dark .response,
      .swagger-dark .responses-inner {
        background: #23242a !important;
        color: #fff !important;
      }
      .swagger-dark .btn,
      .swagger-dark .opblock-summary-control {
        background: #111 !important;
        color: #fff !important;
      }
      .swagger-dark .response-col_status {
        background: #23242a !important;
        color: #ffcb00 !important;
      }
      .swagger-dark .tab li {
        background: #23242a !important;
        color: #eee !important;
      }
    `;
    document.head.appendChild(style);

    // Enable sounds after first user interaction (browser policy)
    function enableAudioOnce() {
        audioEnabled = true;
        window.removeEventListener('click', enableAudioOnce);
    }
    window.addEventListener('click', enableAudioOnce);

    // Patch fetch to play sounds on API response
    const origFetch = window.fetch;
    window.fetch = async function () {
        try {
            const response = await origFetch.apply(this, arguments);
            if (audioEnabled && soundOn) {
                if (response.ok) {
                    successAudio.currentTime = 0;
                    successAudio.play();
                } else {
                    failAudio.currentTime = 0;
                    failAudio.play();
                }
            }
            return response;
        } catch (err) {
            if (audioEnabled && soundOn) {
                failAudio.currentTime = 0;
                failAudio.play();
            }
            throw err;
        }
    };

    SwaggerUIBundle({
        url: '/openapi.json',
        dom_id: '#swagger-ui',
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout"
    });
};
