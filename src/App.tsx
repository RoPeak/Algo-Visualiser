import { useSorting } from './hooks/useSorting';
import { VisualiserBoard } from './components/VisualiserBoard';
import { Controls } from './components/Controls';

function App() {
  const {
    array,
    comparison,
    resetArray,
    runSort,
    isSorting,
    algorithm,
    setAlgorithm,
    isPaused,
    togglePause,
    speed,
    setSpeed,
  } = useSorting();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8 gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Algo Visualiser
        </h1>
        <p className="text-gray-400">Visualise sorting algorithms in real-time</p>
      </div>

      <VisualiserBoard array={array} comparison={comparison} />

      <Controls
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        isSorting={isSorting}
        isPaused={isPaused}
        togglePause={togglePause}
        resetArray={resetArray}
        runSort={runSort}
        speed={speed}
        setSpeed={setSpeed}
      />

      <footer className="text-gray-500 text-sm mt-8">
        <p>© {new Date().getFullYear()} Algo Visualiser. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}

export default App
