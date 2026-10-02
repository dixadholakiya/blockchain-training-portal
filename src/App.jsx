import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useTraining } from './context/TrainingContext.jsx';
import Dashboard from './pages/Dashboard.jsx';
import BlockchainExplorer from './pages/BlockchainExplorer.jsx';
import BuildBlock from './pages/BuildBlock.jsx';
import TamperDetection from './pages/TamperDetection.jsx';
import SmartContract from './pages/SmartContract.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import Glossary from './pages/Glossary.jsx';
import Applications from './pages/Applications.jsx';
import InstructorMode from './pages/InstructorMode.jsx';
import TrainingComplete from './pages/TrainingComplete.jsx';
import SecurityCaseStudy from './pages/SecurityCaseStudy.jsx';
import Sidebar from './components/Layout/Sidebar.jsx';
import { NavLink, useLocation } from 'react-router-dom';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { allComplete } = useTraining();
  const location = useLocation();

  return (
    <>
      {/* Classified information warning */}
      <div className="warning-banner" role="alert">
        Training simulation only — Do not enter real operational, classified, sensitive or personal information.
      </div>

      {/* Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo">⛓</div>
          <div>
            <div className="header-title">Blockchain in Action</div>
            <div className="header-subtitle">Hands-on Simulation for Defence & Naval Officers</div>
          </div>
        </div>
        <nav className="header-nav">
          <NavLink to="/" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`} end>Dashboard</NavLink>
          <NavLink to="/security-cases" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>Security Cases</NavLink>
          <NavLink to="/glossary" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>Glossary</NavLink>
          <NavLink to="/applications" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>Applications</NavLink>
          <NavLink to="/instructor" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>Instructor</NavLink>
        </nav>
        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle navigation menu">
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Layout */}
      <div className="app-layout">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/explorer" element={<BlockchainExplorer />} />
            <Route path="/build" element={<BuildBlock />} />
            <Route path="/tamper" element={<TamperDetection />} />
            <Route path="/smart-contract" element={<SmartContract />} />
            <Route path="/case-study" element={<CaseStudy />} />
            <Route path="/security-cases" element={<SecurityCaseStudy />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/instructor" element={<InstructorMode />} />
            <Route path="/complete" element={<TrainingComplete />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
}
