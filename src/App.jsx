import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreatePortfolioPage from './pages/CreatePortfolioPage';
import PreviewPortfolioPage from './pages/PreviewPortfolioPage';
import PublicPortfolioPage from './pages/PublicPortfolioPage';
import { loadSavedPortfolio, savePortfolio } from './services/storage';

export default function App() {
  const [portfolioData, setPortfolioData] = useState(() => loadSavedPortfolio());

  // Save automatically whenever state changes
  useEffect(() => {
    savePortfolio(portfolioData);
  }, [portfolioData]);

  const updatePortfolioData = (updater) => {
    setPortfolioData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      savePortfolio(next);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-bgLight text-textMain">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/create"
            element={
              <CreatePortfolioPage
                portfolioData={portfolioData}
                setPortfolioData={updatePortfolioData}
              />
            }
          />
          <Route
            path="/preview"
            element={
              <PreviewPortfolioPage
                portfolioData={portfolioData}
                setPortfolioData={updatePortfolioData}
              />
            }
          />
          <Route path="/portfolio/:slug" element={<PublicPortfolioPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
