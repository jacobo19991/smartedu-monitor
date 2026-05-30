import { useState } from 'react';
import { Dashboard } from './pages/Dashboard';
import { Landing } from './pages/Landing';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  if (currentView === 'landing') {
    return <Landing onEnterDemo={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="relative w-full min-h-screen">
      <Dashboard />
      <button 
        type="button"
        onClick={() => setCurrentView('landing')}
        className="absolute top-4 right-4 z-[100] bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md shadow-md transition-colors font-medium border border-border/50"
      >
        Volver a inicio
      </button>
    </div>
  );
}

export default App;
