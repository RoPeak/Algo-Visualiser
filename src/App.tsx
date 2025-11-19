
import { useSorting } from './hooks/useSorting';
import { VisualiserBoard } from './components/VisualiserBoard';

function App() {
  const { array, comparison, resetArray, runSort, isSorting } = useSorting();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8 gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Algo Visualiser
        </h1>
        <p className="text-gray-400">Visualise sorting algorithms in real-time</p>
      </div>

      <VisualiserBoard array={array} comparison={comparison} />

      <div className="flex gap-4">
        <button
          onClick={resetArray}
          disabled={isSorting}
          className="px-6 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 rounded-lg font-medium transition-colors border border-gray-700"
        >
          Generate New Array
        </button>
        <button
          onClick={runSort}
          disabled={isSorting}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg font-medium transition-colors"
        >
          Sort (Bubble)
        </button>
      </div>
    </div>
  );
}

export default App
