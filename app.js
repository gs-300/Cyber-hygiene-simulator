// app.js
document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  let discoveredFlags = new Set();
  let startTime = null;
  let currentLanguage = "en"; // Default base language
  const totalFlagsPerScenario = 3;

  // UI Translation Dictionary (i18n mapping)
  const uiTranslations = {
    en: {
      appTitle: "Cyber-Hygiene Interactive Simulator",
      portfolioSubtitle: "Portfolio Edition: Interactive Digital Equity Tool",
      prevBtn: "← Previous Scenario",
      nextBtn: "Next Scenario →",
      metaFromLabel: "From:",
      metaSubjectLabel: "Subject:",
      trackerTitle: "Threat Tracker",
      flagsFound: "Flags Found:",
      discoveredIndicators: "Discovered Indicators",
      historyTitle: "Your Training History",
      historySubtitle: "Stored locally in your browser's secure context",
      clearLogs: "Clear Logs",
      defaultPlaceholder: "Scan the simulated communication on the left. Click on areas that look suspicious to identify cyber threat indicators.",
      victoryMessage: "<strong>Excellent Analysis!</strong> You have successfully uncovered all critical vulnerabilities within this context wrapper.",
      confirmClear: "Are you sure you want to delete all local performance logs?",
      logPlaceholder: "Complete a scenario to log your performance.",
      scoreDurationUnit: "Time:"
    },
    es: {
      appTitle: "Simulador Interactivo de Ciberhigiene",
      portfolioSubtitle: "Edición de Portafolio: Herramienta de Equidad Digital Interactiva",
      prevBtn: "← Escenario Anterior",
      nextBtn: "Siguiente Escenario →",
      metaFromLabel: "De:",
      metaSubjectLabel: "Asunto:",
      trackerTitle: "Rastreador de Amenazas",
      flagsFound: "Amenazas Detectadas:",
      discoveredIndicators: "Indicadores Descubiertos",
      historyTitle: "Su Historial de Entrenamiento",
      historySubtitle: "Almacenado localmente en el contexto seguro de su navegador",
      clearLogs: "Borrar Registros",
      defaultPlaceholder: "Examine la comunicación simulada a la izquierda. Haga clic en las áreas sospechosas para identificar los indicadores de amenazas cibernéticas.",
      victoryMessage: "<strong>¡Excelente análisis!</strong> Ha descubierto con éxito todas las vulnerabilidades críticas dentro de este entorno.",
      confirmClear: "¿Está seguro de que desea eliminar todos los registros de rendimiento locales?",
      logPlaceholder: "Complete un escenario para registrar su rendimiento.",
      scoreDurationUnit: "Tiempo:"
    }
  };

  // DOM Declarations
  const scenarioTitle = document.getElementById("scenario-title");
  const deviceScreen = document.getElementById("device-screen");
  const screenHeader = document.getElementById("screen-header");
  const metaFrom = document.getElementById("meta-from");
  const metaSubject = document.getElementById("meta-subject");
  const metaSubjectRow = document.getElementById("meta-subject-row");
  const messageContent = document.getElementById("message-content");
  
  const scoreCounter = document.getElementById("score-counter");
  const progressFill = document.getElementById("progress-fill");
  const explanationsList = document.getElementById("explanations-list");
  
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // DOM Elements for Analytics
  const analyticsList = document.getElementById("analytics-list");
  const clearDataBtn = document.getElementById("clear-data-btn");

  // Language selector DOM Element
  const langSelector = document.getElementById("lang-selector");

  /**
   * Applies the dictionary text transformations across all marked static UI items
   */
  function translateStaticUI() {
    const translationSet = uiTranslations[currentLanguage];
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const translationKey = element.getAttribute("data-i18n");
      if (translationSet[translationKey]) {
        element.innerHTML = translationSet[translationKey];
      }
    });
  }

  /**
   * Initializes and renders a scenario based on its array index and current language
   */
  function initScenario(index, isLanguageSwap = false) {
    const currentData = scenarios[index];

    // If changing languages mid-game, don't clear score progress
    if (!isLanguageSwap) {
      discoveredFlags.clear();
      updateScoreUI();
      explanationsList.innerHTML = `<p class="placeholder-text" data-i18n="defaultPlaceholder">${uiTranslations[currentLanguage].defaultPlaceholder}</p>`;
      startTime = Date.now(); // Start scenario clock
    }

    scenarioTitle.textContent = currentData.title[currentLanguage];
    screenHeader.textContent = currentData.interfaceLabel[currentLanguage];
    metaFrom.innerHTML = currentData.meta.from[currentLanguage];

    if (currentData.type === "email") {
      deviceScreen.className = "device-screen email-mode";
      metaSubjectRow.style.display = "block";
      metaSubject.textContent = currentData.meta.subject[currentLanguage];
    } else {
      deviceScreen.className = "device-screen sms-mode";
      metaSubjectRow.style.display = "none";
    }

    messageContent.innerHTML = currentData.body[currentLanguage];

    // Restore visual highlight state for found flags during a language toggle
    discoveredFlags.forEach(flagKey => {
      const activeFlagElement = messageContent.querySelector(`[data-flag="${flagKey}"]`);
      if (activeFlagElement) {
        activeFlagElement.classList.add("found");
        activeFlagElement.setAttribute("aria-label", "Discovered Threat Indicator Flag");
      }
    });

    // Rebuild explanation lists dynamically to reflect language adjustments
    if (discoveredFlags.size > 0) {
      explanationsList.innerHTML = "";
      discoveredFlags.forEach(flagKey => {
        const cardEl = document.createElement("div");
        cardEl.className = "explanation-item";
        cardEl.innerHTML = `<p>${currentData.explanations[flagKey][currentLanguage]}</p>`;
        explanationsList.appendChild(cardEl);
      });

      if (discoveredFlags.size === totalFlagsPerScenario) {
        const victoryAlert = document.createElement("div");
        victoryAlert.className = "explanation-item";
        victoryAlert.style.borderColor = "var(--accent-blue)";
        victoryAlert.innerHTML = `<p>${uiTranslations[currentLanguage].victoryMessage}</p>`;
        explanationsList.appendChild(victoryAlert);
      }
    }

    // Attach interaction handling logic across targets
    const interactionTargets = deviceScreen.querySelectorAll(".flag-target");
    interactionTargets.forEach(target => {
      // Avoid attaching listeners to already found nodes
      const flagKey = target.getAttribute("data-flag");
      if (discoveredFlags.has(flagKey)) {
        target.classList.add("found");
        return;
      }

      target.addEventListener("click", handleFlagInteraction);
      // Accessible keyboard routing support
      target.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleFlagInteraction(e);
        }
      });
    });

    // Update global layout navigation control rules
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === scenarios.length - 1;
    
    // Maintain language text translation for button states
    prevBtn.innerHTML = uiTranslations[currentLanguage].prevBtn;
    nextBtn.innerHTML = uiTranslations[currentLanguage].nextBtn;
  }

  /**
   * Handles user interaction when clicking or focusing/pressing Enter on a threat indicator
   */
  function handleFlagInteraction(event) {
    const node = event.currentTarget;
    const flagKey = node.getAttribute("data-flag");
    const operationalDataset = scenarios[currentIndex];

    if (discoveredFlags.has(flagKey)) return;

    // Add identifier token, update viewport styling attributes
    discoveredFlags.add(flagKey);
    node.classList.add("found");
    node.setAttribute("aria-label", "Discovered Threat Indicator Flag");

    // Remove instructions layout placeholder message on initial hit
    if (discoveredFlags.size === 1) {
      explanationsList.innerHTML = "";
    }

    // Append localized instructional alert cards
    const cardEl = document.createElement("div");
    cardEl.className = "explanation-item";
    cardEl.innerHTML = `<p>${operationalDataset.explanations[flagKey][currentLanguage]}</p>`;
    explanationsList.appendChild(cardEl);

    updateScoreUI();
  }

  /**
   * Updates progress bar, scores, and saves analytics telemetry when a scenario is completed
   */
  function updateScoreUI() {
    scoreCounter.textContent = `${discoveredFlags.size} / ${totalFlagsPerScenario}`;
    const percent = Math.min((discoveredFlags.size / totalFlagsPerScenario) * 100, 100);
    progressFill.style.width = `${percent}%`;
    
    if (discoveredFlags.size === totalFlagsPerScenario) {
      const victoryAlert = document.createElement("div");
      victoryAlert.className = "explanation-item";
      victoryAlert.style.borderColor = "var(--accent-blue)";
      victoryAlert.innerHTML = `<p>${uiTranslations[currentLanguage].victoryMessage}</p>`;
      explanationsList.appendChild(victoryAlert);

      // Save user metrics to Local Storage
      saveTelemetry(scenarios[currentIndex].title[currentLanguage], discoveredFlags.size);
    }
  }

  /**
   * Captures time metrics and saves performance log records to the browser's localStorage
   */
  function saveTelemetry(scenarioTitle, flagsFound) {
    const endTime = Date.now();
    const timeSpentSeconds = Math.round((endTime - startTime) / 1000);
    
    // 1. Fetch old logs or initialize empty array
    let logs = JSON.parse(localStorage.getItem("cyberSimTelemetry")) || [];
    
    // 2. Build the new record entry
    const newLog = {
      scenario: scenarioTitle,
      score: `${flagsFound}/3`,
      duration: `${timeSpentSeconds}s`,
      date: new Date().toLocaleDateString()
    };
    
    // 3. Save it back to the browser
    logs.push(newLog);
    localStorage.setItem("cyberSimTelemetry", JSON.stringify(logs));
    
    // 4. Instantly refresh the display dashboard
    renderAnalytics();
  }

  /**
   * Reads metrics logs from localStorage and updates the Training History DOM elements
   */
  function renderAnalytics() {
    let logs = JSON.parse(localStorage.getItem("cyberSimTelemetry")) || [];
    
    if (logs.length === 0) {
      analyticsList.innerHTML = `<li class="placeholder-text" data-i18n="logPlaceholder">${uiTranslations[currentLanguage].logPlaceholder}</li>`;
      return;
    }
    
    // Loop through logs and build HTML items
    analyticsList.innerHTML = logs.map(log => `
      <li class="analytics-item">
        <span><strong>${log.scenario}</strong> (${log.date})</span>
        <span>${uiTranslations[currentLanguage].trackerTitle.split(" ")[0]}: ${log.score} | ${uiTranslations[currentLanguage].scoreDurationUnit} ${log.duration}</span>
      </li>
    `).join("");
  }

  // --- Global Event Listeners ---

  // Lang Dropdown Listener
  langSelector.addEventListener("change", (e) => {
    currentLanguage = e.target.value;
    translateStaticUI();
    initScenario(currentIndex, true);
    renderAnalytics();
  });

  // Paging controls: Previous Scenario
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      initScenario(currentIndex);
    }
  });

  // Paging controls: Next Scenario
  nextBtn.addEventListener("click", () => {
    if (currentIndex < scenarios.length - 1) {
      currentIndex++;
      initScenario(currentIndex);
    }
  });

  // Clear data event listener
  clearDataBtn.addEventListener("click", () => {
    if (confirm(uiTranslations[currentLanguage].confirmClear)) {
      localStorage.removeItem("cyberSimTelemetry");
      renderAnalytics();
    }
  });

  // --- Initial Launch Commands ---

  // 1. Apply baseline static translation elements on init
  translateStaticUI();

  // 2. Load the first scenario game screen
  initScenario(currentIndex);

  // 3. Read and print any historical performance metrics already stored in this browser
  renderAnalytics();
});