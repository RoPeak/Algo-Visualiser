import { useState, useEffect, useCallback, useRef } from 'react';
import { bubbleSort, type SortStep } from '../algorithms/sorting';

export type AlgorithmType = 'bubble' | 'merge' | 'quick';


export const useSorting = () => {
    const [array, setArray] = useState<number[]>([]);
    const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
    const [isSorting, setIsSorting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(50);
    const [comparison, setComparison] = useState<number[]>([]); // Indices being compared
    const sortingRef = useRef<boolean>(false); // Ref to track sorting state immediately for loop
    const pausedRef = useRef<boolean>(false); // Ref for pause state

    const resetArray = useCallback(() => {
        // Allow reset if not sorting OR if paused
        if (sortingRef.current && !pausedRef.current) return;
        const newArray = Array.from({ length: 50 }, () =>
            Math.floor(Math.random() * 500) + 10
        );
        setArray(newArray);
        setComparison([]);
        setIsSorting(false);
        setIsPaused(false);
        pausedRef.current = false;
        sortingRef.current = false; // Ensure sorting ref is cleared
    }, []);

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
        } else {
            // Placeholder for other algos
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
            const delay = Math.max(10, 1000 - (speed * 10));
            await new Promise((resolve) => setTimeout(resolve, delay));
        }

        setIsSorting(false);
        sortingRef.current = false;
        setComparison([]);
    }, [array, algorithm, isSorting, speed]);

    useEffect(() => {
        resetArray();
    }, [resetArray]);

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
    };
};
