import { useState, useEffect, useCallback, useRef } from 'react';
import { bubbleSort, type SortStep } from '../algorithms/sorting';

export type AlgorithmType = 'bubble' | 'merge' | 'quick';


export const useSorting = () => {
    const [array, setArray] = useState<number[]>([]);
    const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
    const [isSorting, setIsSorting] = useState(false);
    const [comparison, setComparison] = useState<number[]>([]); // Indices being compared
    const sortingRef = useRef<boolean>(false); // Ref to track sorting state immediately for loop

    const resetArray = useCallback(() => {
        if (sortingRef.current) return; // Prevent reset while sorting
        const newArray = Array.from({ length: 50 }, () =>
            Math.floor(Math.random() * 500) + 10
        );
        setArray(newArray);
        setComparison([]);
        setIsSorting(false);
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
            if (!sortingRef.current) break; // Allow stopping
            setArray(step.array);
            setComparison(step.comparison);
            await new Promise((resolve) => setTimeout(resolve, 50)); // Hardcoded speed for now
        }

        setIsSorting(false);
        sortingRef.current = false;
        setComparison([]);
    }, [array, algorithm, isSorting]);

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
    };
};
