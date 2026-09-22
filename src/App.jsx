import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import LandingHome from './pages/LandingHome';
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
      <div className="min-h-screen bg-stone-100 text-stone-900 selection:bg-amber-500 selection:text-white">
        <Routes>
          {/* Landing page now shares the standard AppShell with top navbar */}
          <Route path="/" element={<AppShell><LandingHome /></AppShell>} />

          {/* Inner application tabs */}
          <Route path="/explore" element={<AppShell><ExploreMap /></AppShell>} />
          <Route path="/destinations" element={<AppShell><Destinations /></AppShell>} />
          <Route path="/craft" element={<AppShell><CraftAndLoom /></AppShell>} />
          <Route path="/participate" element={<AppShell><Participate /></AppShell>} />
          <Route path="/taste" element={<AppShell><Taste /></AppShell>} />
          <Route path="/local-events" element={<AppShell><LocalEvents /></AppShell>} />
          <Route path="/plan-my-trip" element={<AppShell><PointPlanner /></AppShell>} />
          <Route path="/plan" element={<Navigate to="/plan-my-trip" replace />} />
        </Routes>
      </div>
    </Router>
  );
}