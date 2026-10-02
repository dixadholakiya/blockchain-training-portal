# Blockchain in Action — Training Portal

> **Hands-on Blockchain Simulation for Defence & Naval Officers**

An interactive, web-based training portal for a 120-minute workshop that teaches blockchain fundamentals through fictional naval logistics scenarios. Designed for non-technical officers — no programming knowledge required.

---

## ⚠ Safety Notice

**This is an EDUCATIONAL SIMULATION only.**

- No real cryptocurrency, wallets, or private keys are used
- No real defence, operational, or classified data is involved
- All names, ships, organisations, transactions, and data are entirely **fictional**
- Do not enter any real sensitive information into the portal

---

## Features

- **5 Interactive Learning Modules:**
  1. **Blockchain Explorer** — Browse fictional blocks and naval logistics transactions
  2. **Build & Verify a Block** — Create blocks with real SHA-256 hashing
  3. **Detect Tampering** — See what happens when blockchain data is altered
  4. **Smart Contract Simulation** — Step through automated procurement verification
  5. **Naval Logistics Case Study** — Trace a spare part through the supply chain

- **Glossary** — 12 blockchain terms in plain language
- **Naval Applications** — Defence use cases and important limitations
- **Instructor Mode** — Workshop management, schedule, discussion questions, answer key
- **Scoring System** — 100-point formative assessment across all modules
- **Progress Tracking** — Saves to browser localStorage automatically
- **Fully Responsive** — Works on desktop, tablet, and mobile

---

## Technology Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | Component-based UI framework |
| [Vite](https://vite.dev) | Fast build tool and dev server |
| [React Router](https://reactrouter.com) | Client-side routing (HashRouter for GitHub Pages) |
| [CryptoJS](https://github.com/brix/crypto-js) | SHA-256 hashing for block-building demos |
| Vanilla CSS | Custom design system (no CSS framework dependency) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/dixadholakiya/blockchain-training-portal.git
cd blockchain-training-portal

# Install dependencies
npm install
```

### Run Locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Deploy on GitHub Pages

### Option 1: Manual Deployment

```bash
# Build the production bundle
npm run build

# The built files are in the `dist/` folder
# Push the `dist/` folder contents to the `gh-pages` branch
```

### Option 2: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

After pushing, go to **Settings → Pages** and select the `gh-pages` branch.

---

## How to Customise Transactions

All fictional data is stored in `src/data/`:

- **`blockchainData.js`** — Blocks and transactions for the Explorer
- **`caseStudyData.js`** — NAV-SPARE-204 journey and quiz questions
- **`glossaryData.js`** — Glossary terms and definitions

Edit these files to customise the training scenarios for your specific workshop needs.

---

## Project Structure

```
blockchain-training-portal/
├── index.html                  # HTML entry point
├── package.json
├── vite.config.js              # Vite config (base path for GitHub Pages)
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component with routing
    ├── index.css               # Complete design system
    ├── context/
    │   └── TrainingContext.jsx  # State management (React Context)
    ├── data/
    │   ├── blockchainData.js   # Fictional blockchain data
    │   ├── caseStudyData.js    # Case study journey & quiz
    │   └── glossaryData.js     # Glossary terms
    ├── utils/
    │   └── hashing.js          # SHA-256 utility
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── BlockchainExplorer.jsx
    │   ├── BuildBlock.jsx
    │   ├── TamperDetection.jsx
    │   ├── SmartContract.jsx
    │   ├── CaseStudy.jsx
    │   ├── Glossary.jsx
    │   ├── Applications.jsx
    │   ├── InstructorMode.jsx
    │   └── TrainingComplete.jsx
    └── components/
        └── Layout/
            └── Sidebar.jsx
```

---

## Instructor PIN

The default Instructor Mode PIN is: **`1234`**

Change this in `src/pages/InstructorMode.jsx` if needed.

---

## License

This project is provided for educational purposes. Feel free to adapt it for your training needs.

---

*Built as a companion tool for the research paper: "Blockchain in Action: A Hands-on Introduction for Defence & Naval Officers"*
