import DiceRoller from '../components/DiceRoller';

export default function Home() {
  return (
    <div className='flex justify-center items-center flex-col h-screen bg-gray-900 text-white'>
      <h1 className='pb-10'>Gerador de Dados RPG</h1>
      <DiceRoller />
    </div>
  );
}