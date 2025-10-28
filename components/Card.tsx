
import React from 'react';

interface CardProps {
  name: string;
  onClick: () => void;
  isCompleted: boolean;
}

export const Card: React.FC<CardProps> = ({ name, onClick, isCompleted }) => {
  return (
    <button
      onClick={onClick}
      className={`relative group h-28 flex items-center justify-center p-2 text-center font-semibold text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
        isCompleted
          ? 'bg-gradient-to-br from-green-500 to-teal-600'
          : 'bg-gray-700 hover:bg-purple-800'
      }`}
    >
      {isCompleted && (
        <span className="absolute top-1 right-1 text-xs" title="Completado">✅</span>
      )}
      <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-lg"></div>
      <span className="relative z-10 text-sm">{name}</span>
    </button>
  );
};
