// app.js
document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  let discoveredFlags = new Set();
  const totalFlagsPerScenario = 3;

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

  function initScenario(index) {
    // Reset application tracker states
    discoveredFlags.clear();
    updateScoreUI();
    explanationsList.innerHTML = `<p class="placeholder-text">Scan the simulated communication on the left. Click on areas that look suspicious to identify cyber threat indicators.</p>`;

    const currentData = scenarios[index];

    // Build the container frame attributes
    scenarioTitle.textContent = currentData.title;
    screenHeader.textContent = currentData.interfaceLabel;
    metaFrom.innerHTML = currentData.meta.from;

    if (currentData.type === "email") {
      deviceScreen.className = "device-screen email-mode";
      metaSubjectRow.style.display = "block";
      metaSubject.textContent = currentData.meta.subject;
    } else {
      deviceScreen.className = "device-screen sms-mode";
      metaSubjectRow.style.display = "none";
    }

    messageContent.innerHTML = currentData.body;

    // Attach interaction handling logic across targets
    const interactionTargets = deviceScreen.querySelectorAll(".flag-target");
    interactionTargets.forEach(target => {
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
  }

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
    cardEl.innerHTML = `<p>${operationalDataset.explanations[flagKey]}</p>`;
    explanationsList.appendChild(cardEl);

    updateScoreUI();
  }

  function updateScoreUI() {
    scoreCounter.textContent = `${discoveredFlags.size} / ${totalFlagsPerScenario}`;
    const percent = Math.min((discoveredFlags.size / totalFlagsPerScenario) * 100, 100);
    progressFill.style.width = `${percent}%`;
    
    if (discoveredFlags.size === totalFlagsPerScenario) {
      const victoryAlert = document.createElement("div");
      victoryAlert.className = "explanation-item";
      victoryAlert.style.borderColor = "var(--accent-blue)";
      victoryAlert.innerHTML = `<p><strong>Excellent Analysis!</strong> You have successfully uncovered all critical vulnerabilities within this context wrapper.</p>`;
      explanationsList.appendChild(victoryAlert);
    }
  }

  // Hook operational paging click tracking mechanisms
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      initScenario(currentIndex);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < scenarios.length - 1) {
      currentIndex++;
      initScenario(currentIndex);
    }
  });

  // Seed baseline system configuration values initially
  initScenario(currentIndex);
});