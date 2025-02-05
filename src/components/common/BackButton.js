"use client";

export default function BackButton({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="text-2xl font-bold text-gray-800 hover:text-gray-600"
    >
      ←
    </button>
  );
} 