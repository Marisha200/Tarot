
import React, { useState, useEffect, useCallback } from 'react';
import { MAJOR_ARCANA, MINOR_ARCANA_SUITS } from './constants';
import { CardDetail } from './components/CardDetail';
import { Card } from './components/Card';
import { ApiKeyInstructions } from './components/ApiKeyInstructions';
import { isApiKeyConfigured } from './services/geminiService';
import type { ArcanaType } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'arcana'>('dashboard');
  const [selectedArcana, setSelectedArcana] = useState<ArcanaType | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());
  const [apiKeyReady, setApiKeyReady] = useState<boolean>(false);

  useEffect(() => {
    setApiKeyReady(isApiKeyConfigured());

    try {
      const storedProgress = localStorage.getItem('tarotProgress');
      if (storedProgress) {
        setCompletedCards(new Set(JSON.parse(storedProgress) as string[]));
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
      setCompletedCards(new Set());
    }
  }, []);

  const saveProgress = (updatedProgress: Set<string>) => {
    try {
      localStorage.setItem('tarotProgress', JSON.stringify(Array.from(updatedProgress)));
    } catch (error)      {
       console.error("Failed to save progress to localStorage", error);
    }
  };

  const handleMarkAsComplete = useCallback((cardName: string) => {
    setCompletedCards(prev => {
      const newProgress = new Set(prev);
      newProgress.add(cardName);
      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  const selectArcana = (arcana: ArcanaType) => {
    setSelectedArcana(arcana);
    setView('arcana');
  };

  const goBackToDashboard = () => {
    setView('dashboard');
    setSelectedArcana(null);
    setSelectedCard(null);
  };

  const goBackToGrid = () => {
    setSelectedCard(null);
  };

  if (!apiKeyReady) {
    return <ApiKeyInstructions />;
  }

  const renderDashboard = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-900 to-indigo-900">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">Curso Interactivo de Tarot</h1>
        <p className="text-lg text-gray-300">Desvela los secretos de los Arcanos.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <button
          onClick={() => selectArcana('major')}
          className="group relative p-8 bg-gray-800 rounded-lg shadow-2xl hover:bg-purple-900/50 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
          <h2 className="text-3xl font-bold text-white mb-2 z-10 relative">Arcanos Mayores</h2>
          <p className="text-gray-400 z-10 relative">El viaje del alma y las grandes lecciones de la vida.</p>
        </button>
        <button
          onClick={() => selectArcana('minor')}
          className="group relative p-8 bg-gray-800 rounded-lg shadow-2xl hover:bg-pink-900/50 transition-all duration-300 transform hover:-translate-y-1"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
          <h2 className="text-3xl font-bold text-white mb-2 z-10 relative">Arcanos Menores</h2>
          <p className="text-gray-400 z-10 relative">Las experiencias y desafíos del día a día.</p>
        </button>
      </div>
    </div>
  );

  const renderCardGrid = () => {
    const isMajor = selectedArcana === 'major';
    const title = isMajor ? 'Arcanos Mayores' : 'Arcanos Menores';
    
    return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-900 to-indigo-900">
        <button onClick={goBackToDashboard} className="mb-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
          &larr; Volver al Inicio
        </button>
        <h2 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{title}</h2>
        
        {isMajor ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {MAJOR_ARCANA.map(card => (
              <Card key={card} name={card} onClick={() => setSelectedCard(card)} isCompleted={completedCards.has(card)} />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(MINOR_ARCANA_SUITS).map(([suit, cards]) => (
              <div key={suit}>
                <h3 className="text-2xl font-semibold mb-4 text-pink-400">{suit}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
                  {cards.map(card => (
                    <Card key={card} name={card} onClick={() => setSelectedCard(card)} isCompleted={completedCards.has(card)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (selectedCard) {
    return <CardDetail cardName={selectedCard} onBack={goBackToGrid} onComplete={handleMarkAsComplete} />;
  }

  if (view === 'arcana') {
    return renderCardGrid();
  }

  return renderDashboard();
};

export default App;
