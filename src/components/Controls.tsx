import { Play, Pause, RotateCcw } from 'lucide-react';
import type { AlgorithmType } from '../hooks/useSorting';

interface ControlsProps {
    algorithm: AlgorithmType;
    setAlgorithm: (algo: AlgorithmType) => void;
    isSorting: boolean;
    isPaused: boolean;
    togglePause: () => void;
    resetArray: () => void;
    runSort: () => void;
    speed: number;
    setSpeed: (speed: number) => void;
    arraySize: number;
    setArraySize: (size: number) => void;
}

export const Controls = ({
    algorithm,
    setAlgorithm,
    isSorting,
    isPaused,
    togglePause,
    resetArray,
    runSort,
    speed,
    setSpeed,
    arraySize,
    setArraySize,
}: ControlsProps) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-6 p-6 bg-gray-800/80 rounded-xl border border-gray-700 backdrop-blur-sm w-full max-w-5xl">
            <div className="flex items-center gap-4">
                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
                    disabled={isSorting}
                    className="px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    <option value="bubble">Bubble Sort</option>
                    <option value="merge">Merge Sort</option>
                    <option value="quick">Quick Sort</option>
                    <option value="insertion">Insertion Sort</option>
                    <option value="selection">Selection Sort</option>
                    <option value="heap">Heap Sort</option>
                    <option value="cocktail">Cocktail Shaker Sort</option>
                </select>
            </div>

            <div className="h-8 w-px bg-gray-700" />

            <div className="flex items-center gap-2">
                <button
                    onClick={resetArray}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                    title="Reset Array"
                >
                    <RotateCcw size={20} />
                </button>

                {!isSorting ? (
                    <button
                        onClick={runSort}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                    >
                        <Play size={20} />
                        <span>Sort</span>
                    </button>
                ) : (
                    <button
                        onClick={togglePause}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${isPaused
                            ? 'bg-green-600 hover:bg-green-500 text-white'
                            : 'bg-yellow-600 hover:bg-yellow-500 text-white'
                            }`}
                    >
                        {isPaused ? <Play size={20} /> : <Pause size={20} />}
                        <span>{isPaused ? 'Resume' : 'Pause'}</span>
                    </button>
                )}
            </div>

            <div className="h-8 w-px bg-gray-700" />

            <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-400 font-medium">Speed</span>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                <div className="h-8 w-px bg-gray-700" />

                <div className="flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-400 font-medium">Size: {arraySize}</span>
                    <input
                        type="range"
                        min="10"
                        max="100"
                        value={arraySize}
                        onChange={(e) => setArraySize(Number(e.target.value))}
                        disabled={isSorting}
                        className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};
