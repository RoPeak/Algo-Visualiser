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

export function* insertionSort(array: number[]): Generator<SortStep> {
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        yield { array: [...arr], comparison: [i, j] };

        while (j >= 0 && arr[j] > key) {
            yield { array: [...arr], comparison: [j, j + 1] };
            arr[j + 1] = arr[j];
            j = j - 1;
            yield { array: [...arr], comparison: [j + 1] };
        }
        arr[j + 1] = key;
        yield { array: [...arr], comparison: [j + 1] };
    }

    yield { array: [...arr], comparison: [] };
}

export function* selectionSort(array: number[]): Generator<SortStep> {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            yield { array: [...arr], comparison: [minIdx, j] };
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            yield { array: [...arr], comparison: [i, minIdx] };
        }
    }

    yield { array: [...arr], comparison: [] };
}

export function* heapSort(array: number[]): Generator<SortStep> {
    const arr = [...array];
    const n = arr.length;

    function* heapify(n: number, i: number): Generator<SortStep> {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
            yield { array: [...arr], comparison: [largest, left] };
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }

        if (right < n) {
            yield { array: [...arr], comparison: [largest, right] };
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            yield { array: [...arr], comparison: [i, largest] };
            yield* heapify(n, largest);
        }
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        yield* heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        yield { array: [...arr], comparison: [0, i] };
        yield* heapify(i, 0);
    }

    yield { array: [...arr], comparison: [] };
}

export function* cocktailShakerSort(array: number[]): Generator<SortStep> {
    const arr = [...array];
    let start = 0;
    let end = arr.length - 1;
    let swapped = true;

    while (swapped) {
        swapped = false;

        for (let i = start; i < end; i++) {
            yield { array: [...arr], comparison: [i, i + 1] };
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
                yield { array: [...arr], comparison: [i, i + 1] };
            }
        }

        if (!swapped) break;

        swapped = false;
        end--;

        for (let i = end - 1; i >= start; i--) {
            yield { array: [...arr], comparison: [i, i + 1] };
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
                yield { array: [...arr], comparison: [i, i + 1] };
            }
        }

        start++;
    }

    yield { array: [...arr], comparison: [] };
}
