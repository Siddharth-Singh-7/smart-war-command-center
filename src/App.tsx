import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { CommandHeader } from './components/CommandHeader';
import { ThreatAnalysis } from './components/ThreatAnalysis';
import { DecisionSupport } from './components/DecisionSupport';
import { TacticalDataStream } from './components/TacticalDataStream';
import { BattlefieldViz } from './components/BattlefieldViz';

// Lazy load new pages
const IntelligenceHub = lazy(() => import('./pages/IntelligenceHub'));
const LogisticsHub = lazy(() => import('./pages/LogisticsHub'));
const CommHub = lazy(() => import('./pages/CommHub'));

function App() {
  return (
    <Router>
      <DashboardLayout
        header={<CommandHeader />}
        leftPanel={<ThreatAnalysis />}
        rightPanel={<DecisionSupport />}
        centerContent={
          <Suspense fallback={
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-primary font-orbitron animate-pulse">INITIATING SECURE LINK...</div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<BattlefieldViz />} />
              <Route path="/intel" element={<IntelligenceHub />} />
              <Route path="/logistics" element={<LogisticsHub />} />
              <Route path="/comms" element={<CommHub />} />
            </Routes>
          </Suspense>
        }
        bottomBar={<TacticalDataStream />}
      />
    </Router>
  );
}

export default App;
