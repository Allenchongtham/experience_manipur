import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import ExploreMap from './pages/ExploreMap';
import CraftAndLoom from './pages/CraftAndLoom';
import Participate from './pages/Participate';
import Taste from './pages/Taste';
import PlanExperience from './pages/PlanExperience';

export default function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/explore" replace />} />
          <Route path="/explore" element={<ExploreMap />} />
          <Route path="/craft" element={<CraftAndLoom />} />
          <Route path="/participate" element={<Participate />} />
          <Route path="/taste" element={<Taste />} />
          <Route path="/plan" element={<PlanExperience />} />
        </Routes>
      </AppShell>
    </Router>
  );
}