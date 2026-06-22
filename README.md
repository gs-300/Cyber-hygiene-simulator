# Cyber-Hygiene Interactive Simulator

A lightweight, web-based digital equity tool designed to reduce technical vulnerability in underserved communities by translating complex threat indicators into accessible, interactive learning modules.

## 🚀 Live Demo

[Insert your GitHub Pages link here once deployed]

---

## 📌 Project Overview

Non-technical community members (such as seniors, digital literacy learners, and job seekers) are disproportionately targeted by social engineering tactics. Traditional cybersecurity training often relies on dense, jargon-heavy text.

This project bridges that gap by offering a hands-on, gamified **"Spot the Red Flag"** simulator. Users interact with simulated device environments (Webmail interfaces and SMS messaging apps) to uncover active threats, receiving instant, bite-sized educational feedback rooted in **CompTIA Security+** methodologies.

> **Portfolio Frame:** This application directly blends frontend development principles (Semantic HTML, modern CSS layouts, and modular DOM manipulation) with practical cybersecurity analysis (identifying indicators of compromise, typosquatting, and artificial urgency).

---

## 🛡️ Cybersecurity Alignment (Security+ Objectives)

This tool actively trains users on the following threat vectors and social engineering principles:

- **Phishing & Smishing Detection:** Recognizing malicious message patterns across different communication channels.
- **Typosquatting / Lookalike Domains:** Highlighting how attackers manipulate Uniform Resource Locators (URLs) to mimic trusted brands.
- **Psychological Triggers:** Demonstrating how attackers leverage _Artificial Urgency_ and _Coercion_ to bypass user suspicion.

---

## ✨ Key Features

- **Adaptive Device Mockups:** CSS-driven layouts that seamlessly transition from a desktop webmail interface to a mobile device skin based on the active scenario.
- **Interactive Discovery Engine:** Real-time event listeners monitor user interaction with embedded text, dynamically highlighting found vulnerabilities and calculating progression scores.
- **Accessible Architecture:** Employs accessible HTML semantics, high-contrast color choices, `aria-live` feedback regions, and keyboard routing (`Tab` and `Enter/Space` navigation) to ensure digital equity for all user demographics.
- **Modular Data Structure:** Scenarios are separated into an isolated data file, allowing developers to inject new threat templates rapidly without touching core application logic.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** Vanilla HTML5, CSS3 (CSS Variables, CSS Grid, Flexbox), JavaScript (ES6+ Module Pattern)
- **Design Paradigm:** Mobile-friendly, high-legibility layout with zero heavy external framework overhead.

```text
📁 cyber-hygiene-simulator
 ├── index.html       # Application UI structure & accessibility layout
 ├── styles.css       # Visual presentation, interface skins, & animations
 ├── scenarios.js     # Robust object array data library for threat matrices
 └── app.js           # Core state management & DOM interaction handling
```

## 🔧 Local Setup & Installation

To run this project locally without any dependencies:

### 1) Clone this repository to your machine:

```Bash
   git clone [https://github.com/YOUR-USERNAME/cyber-hygiene-simulator.git](https://github.com/YOUR-USERNAME/cyber-hygiene-simulator.git)
```

### 2) Navigate into the project directory:

```Bash
   cd cyber-hygiene-simulator
```

### 3) Open index.html directly in your web browser, or serve it using the VS Code Live Server extension for real-time live-reloads.

## 🔮 Future Roadmaps

- Scenario Builder: An administrative dashboard allowing educators to easily paste raw text and highlight strings to create custom scenarios.

- Localized Translation: Implementing multi-language localization to broaden community reach across non-English speaking demographics.

- Telemetry Logging: Integrating lightweight local storage tracking to measure overall user improvement trends over time.
