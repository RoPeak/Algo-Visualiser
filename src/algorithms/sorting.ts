export type SortStep = {
    array: number[];
    comparison: number[];
};

export function* bubbleSort(array: number[]): Generator<SortStep> {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            yield {
                array: [...arr],
                comparison: [j, j + 1],
            };

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                yield {
                    array: [...arr],
                    comparison: [j, j + 1],
                };
            }
        }
    }

    yield {
        array: [...arr],
        comparison: [],
    };
}

export function* mergeSort(array: number[]): Generator<SortStep> {
    const arr = [...array];

    function* merge(start: number, mid: number, end: number): Generator<SortStep> {
        const left = arr.slice(start, mid + 1);
        const right = arr.slice(mid + 1, end + 1);
        let i = 0, j = 0, k = start;

        while (i < left.length && j < right.length) {
            yield { array: [...arr], comparison: [start + i, mid + 1 + j] };

            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }
            yield { array: [...arr], comparison: [k] };
            k++;
        }

        while (i < left.length) {
            yield { array: [...arr], comparison: [start + i] };
            arr[k] = left[i];
            yield { array: [...arr], comparison: [k] };
            i++;
            k++;
        }

        while (j < right.length) {
            yield { array: [...arr], comparison: [mid + 1 + j] };
            arr[k] = right[j];
            yield { array: [...arr], comparison: [k] };
            j++;
            k++;
        }
    }

    function* mergeSortHelper(start: number, end: number): Generator<SortStep> {
        if (start >= end) return;
        const mid = Math.floor((start + end) / 2);
        yield* mergeSortHelper(start, mid);
        yield* mergeSortHelper(mid + 1, end);
        yield* merge(start, mid, end);
    }

    yield* mergeSortHelper(0, arr.length - 1);
    yield { array: [...arr], comparison: [] };
}

export function* quickSort(array: number[]): Generator<SortStep> {
    const arr = [...array];

    function* quickSortHelper(low: number, high: number): Generator<SortStep> {
        if (low < high) {
            const pivot = arr[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                yield { array: [...arr], comparison: [j, high] };
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    yield { array: [...arr], comparison: [i, j] };
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            yield { array: [...arr], comparison: [i + 1, high] };

            const pi = i + 1;

            yield* quickSortHelper(low, pi - 1);
            yield* quickSortHelper(pi + 1, high);
        }
    }

    yield* quickSortHelper(0, arr.length - 1);
    yield { array: [...arr], comparison: [] };
}
