"use client"
import React, { useState } from 'react';

function DiceRoller() {
  const [d6Result, setD6Result] = useState(null);
  const [d12Result, setD12Result] = useState(null);

  const rollDice = (sides) => {
    return Math.floor(Math.random() * sides) + 1;
  };

  const handleRoll = () => {
    const d6 = rollDice(6);
    const d12 = rollDice(12);

    setD6Result(d6);
    setD12Result(d12);
  };

  const getResult = (result, sides) => {
    if (sides === 6) {
      if (result <= 2) return 'Pressão';
      if (result <= 4) return 'Nulo';
      return 'Sucesso';
    } else {
      if (result <= 4) return 'Pressão';
      if (result <= 8) return 'Nulo';
      return 'Sucesso';
    }
  };

  return (
    <div className='flex justify-center items-center flex-col h-[500px] w-[300px] bg-gray-800 text-white rounded-lg'>
      <p>D6: {d6Result} - {getResult(d6Result, 6)}</p>
      <p>D12: {d12Result} - {getResult(d12Result, 12)}</p>
      <button onClick={handleRoll} className='mt-4 p-2 border border-gray-600 rounded-md shadow-lg bg-amber-500 text-black'>Rolar Dados</button>
    </div>
  );
}

export default DiceRoller;