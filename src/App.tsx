import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { FloorMapPage } from './pages/FloorMapPage';
import { CafePage } from './pages/CafePage';
import { RewardsPage } from './pages/RewardsPage';
import { ProposalPage } from './pages/ProposalPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParams, setPageParams] = useState<any>({});

  const handleNavigate = (page: string, params?: any) => {
    setCurrentPage(page);
    if (params) setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation Header */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Area */}
      <main className="flex-1 pt-16">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'booking' && (
          <BookingPage
            onNavigate={handleNavigate}
            initialSeatId={pageParams.selectedSeatId}
            initialZone={pageParams.selectedZone}
            preselectedCart={pageParams.preselectedCart}
          />
        )}
        {currentPage === 'floor-map' && <FloorMapPage onNavigate={handleNavigate} />}
        {currentPage === 'cafe' && <CafePage onNavigate={handleNavigate} />}
        {currentPage === 'rewards' && <RewardsPage onNavigate={handleNavigate} />}
        {currentPage === 'proposal' && <ProposalPage />}
      </main>

      {/* Global AI Chatbot Concierge */}
      <ChatWidget />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
