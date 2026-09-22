import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import ExploreMap from './pages/ExploreMap';
import CraftAndLoom from './pages/CraftAndLoom';
import Participate from './pages/Participate';
import Taste from './pages/Taste';
import PointPlanner from './pages/PointPlanner';
import Destinations from './pages/Destinations';
import LocalEvents from './pages/LocalEvents';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1a1a1a] text-stone-100 selection:bg-[#D9822B] selection:text-stone-950">
        <AppShell>
          <Routes>
            <Route path="/" element={<Navigate to="/explore" replace />} />
            <Route path="/explore" element={<ExploreMap />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/craft" element={<CraftAndLoom />} />
            <Route path="/participate" element={<Participate />} />
            <Route path="/taste" element={<Taste />} />
            <Route path="/local-events" element={<LocalEvents />} />
            <Route path="/plan-my-trip" element={<PointPlanner />} />
            <Route path="/plan" element={<Navigate to="/plan-my-trip" replace />} />
          </Routes>
        </AppShell>
      </div>
    </Router>
  );
}