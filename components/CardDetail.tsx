
import React, { useState, useEffect } from 'react';
import type { TarotCardDetails, QuizQuestion } from '../types';
import { getCardDetails } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';

interface CardDetailProps {
  cardName: string;
  onBack: () => void;
  onComplete: (cardName: string) => void;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-purple-300 mb-4">{title}</h3>
        <div className="text-gray-300 space-y-3 prose prose-invert max-w-none">{children}</div>
    </div>
);

const Quiz: React.FC<{ quiz: QuizQuestion[]; onQuizComplete: () => void }> = ({ quiz, onQuizComplete }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(quiz.length).fill(null));
    const [submitted, setSubmitted] = useState(false);

    const handleAnswer = (questionIndex: number, option: string) => {
        if (submitted) return;
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[questionIndex] = option;
            return newAnswers;
        });
    };
    
    const handleSubmit = () => {
        setSubmitted(true);
        const correctAnswers = quiz.every((q, i) => answers[i] === q.correctAnswer);
        if (correctAnswers) {
            onQuizComplete();
        }
    };

    const allAnswered = answers.every(a => a !== null);
    const score = quiz.reduce((acc, q, i) => acc + (answers[i] === q.correctAnswer ? 1 : 0), 0);

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg mt-8">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">Prueba de Conocimiento</h3>
            {quiz.map((q, index) => (
                <div key={index} className="mb-6">
                    <p className="font-semibold mb-3 text-lg">{q.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map(option => {
                            const isSelected = answers[index] === option;
                            const isCorrect = q.correctAnswer === option;
                            let buttonClass = 'bg-gray-700 hover:bg-purple-700';
                            if (submitted) {
                                if (isCorrect) {
                                    buttonClass = 'bg-green-600';
                                } else if (isSelected && !isCorrect) {
                                    buttonClass = 'bg-red-600';
                                } else {
                                    buttonClass = 'bg-gray-600 opacity-70';
                                }
                            } else if (isSelected) {
                                buttonClass = 'bg-purple-600';
                            }
                            return (
                                <button key={option} onClick={() => handleAnswer(index, option)} className={`w-full p-3 rounded-lg transition-colors duration-200 text-left ${buttonClass}`}>
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
            {!submitted && (
                <button 
                    onClick={handleSubmit} 
                    disabled={!allAnswered}
                    className="w-full mt-4 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                >
                    Comprobar Respuestas
                </button>
            )}
            {submitted && (
                <div className="mt-6 text-center p-4 rounded-lg bg-gray-900">
                    <p className="text-xl font-bold">Has acertado {score} de {quiz.length} preguntas.</p>
                    {score === quiz.length ? (
                        <p className="text-green-400 mt-2">¡Lección completada! Has dominado esta carta.</p>
                    ) : (
                        <p className="text-yellow-400 mt-2">¡Casi lo tienes! Revisa el material y vuelve a intentarlo.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export const CardDetail: React.FC<CardDetailProps> = ({ cardName, onBack, onComplete }) => {
  const [details, setDetails] = useState<TarotCardDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCardDetails(cardName);
        setDetails(data);
      } catch (err) {
        setError('No se pudo cargar el contenido de la carta. Por favor, inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [cardName]);
  
  const handleQuizComplete = () => {
      onComplete(cardName);
  };

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat p-4 sm:p-6 md:p-8" style={{backgroundImage: "url('https://picsum.photos/1920/1080?blur=5&grayscale')"}}>
        <div className="max-w-4xl mx-auto">
            <button onClick={onBack} className="mb-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-lg">
            &larr; Volver a las Cartas
            </button>
            
            {loading && <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>}
            
            {error && <div className="bg-red-800/80 text-white p-4 rounded-lg text-center">{error}</div>}

            {details && (
            <div className="space-y-8">
                <header className="text-center p-6 bg-gray-900/60 backdrop-blur-sm rounded-xl">
                    <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{details.name}</h2>
                </header>

                <InfoCard title="Descripción General">
                    <p>{details.description}</p>
                </InfoCard>

                <InfoCard title="La Historia de la Carta">
                     <p>{details.story}</p>
                </InfoCard>
                
                 <InfoCard title="Palabras Clave">
                    <div className="flex flex-wrap gap-2">
                        {details.keywords.map(kw => (
                            <span key={kw} className="bg-purple-500/50 text-purple-200 text-sm font-medium px-3 py-1 rounded-full">{kw}</span>
                        ))}
                    </div>
                </InfoCard>

                <div className="grid md:grid-cols-2 gap-8">
                     <InfoCard title="Significado al Derecho">
                        <p>{details.uprightMeaning}</p>
                    </InfoCard>
                     <InfoCard title="Significado Invertido">
                        <p>{details.reversedMeaning}</p>
                    </InfoCard>
                </div>
                
                {details.quiz && details.quiz.length > 0 && (
                    <Quiz quiz={details.quiz} onQuizComplete={handleQuizComplete} />
                )}
            </div>
            )}
        </div>
    </div>
  );
};
