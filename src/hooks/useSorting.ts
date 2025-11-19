import { useState, useEffect, useCallback, useRef } from 'react';
import { bubbleSort, mergeSort, quickSort, insertionSort, selectionSort, type SortStep } from '../algorithms/sorting';

export type AlgorithmType = 'bubble' | 'merge' | 'quick' | 'insertion' | 'selection';

export const useSorting = () => {
    const [array, setArray] = useState<number[]>([]);
    const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
    const [isSorting, setIsSorting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(50);
    const [arraySize, setArraySize] = useState(50);
    const [comparison, setComparison] = useState<number[]>([]); // Indices being compared
    const sortingRef = useRef<boolean>(false); // Ref to track sorting state immediately for loop
    const pausedRef = useRef<boolean>(false); // Ref for pause state
    const speedRef = useRef<number>(speed); // Ref for speed to access latest value in loop

    const resetArray = useCallback(() => {
        // Always allow reset. Force stop sorting.
        sortingRef.current = false;
        setIsSorting(false);
        setIsPaused(false);
        pausedRef.current = false;

        // Generate a linear distribution (1 to 100% height)
        const newArray = Array.from({ length: arraySize }, (_, i) => {
            // Scale values to be between 10 and 500 (height range)
            return Math.floor(10 + (i / (arraySize - 1)) * 490);
        });

        // Fisher-Yates Shuffle
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }

        setArray(newArray);
        setComparison([]);
    }, [arraySize]);

    const togglePause = useCallback(() => {
        setIsPaused((prev) => {
            pausedRef.current = !prev;
            return !prev;
        });
    }, []);

    const runSort = useCallback(async () => {
        if (isSorting) return;
        setIsSorting(true);
        sortingRef.current = true;

        let generator: Generator<SortStep>;

        if (algorithm === 'bubble') {
            generator = bubbleSort(array);
        } else if (algorithm === 'merge') {
            generator = mergeSort(array);
        } else if (algorithm === 'quick') {
            generator = quickSort(array);
        } else if (algorithm === 'insertion') {
            generator = insertionSort(array);
        } else if (algorithm === 'selection') {
            generator = selectionSort(array);
        } else {
            setIsSorting(false);
            sortingRef.current = false;
            return;
        }

        for (const step of generator) {
            while (pausedRef.current) {
                if (!sortingRef.current) break;
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            if (!sortingRef.current) break; // Allow stopping

            setArray(step.array);
            setComparison(step.comparison);
            // Speed calculation: Higher value = faster (lower delay)
            // Input 1-100. Delay 1000ms to 10ms.
            const currentSpeed = speedRef.current;
            const delay = Math.max(10, 1000 - (currentSpeed * 10));
            await new Promise((resolve) => setTimeout(resolve, delay));
        }

        setIsSorting(false);
        sortingRef.current = false;
        setComparison([]);
    }, [array, algorithm, isSorting, speed]);

    useEffect(() => {
        resetArray();
    }, [resetArray]);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    return {
        array,
        setArray,
        algorithm,
        setAlgorithm,
        isSorting,
        setIsSorting,
        comparison,
        setComparison,
        resetArray,

        runSort,
        isPaused,
        togglePause,
        speed,
        setSpeed,
        arraySize,
        setArraySize,
    };
};
