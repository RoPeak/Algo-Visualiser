export type SortStep = {
    array: number[];
    comparison: number[];
};

export function* bubbleSort(array: number[]): Generator<SortStep> {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Yield comparison step
            yield {
                array: [...arr],
                comparison: [j, j + 1],
            };

            if (arr[j] > arr[j + 1]) {
                // Swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                // Yield swap step (same comparison indices, new array)
                yield {
                    array: [...arr],
                    comparison: [j, j + 1],
                };
            }
        }
    }

    // Final state
    yield {
        array: [...arr],
        comparison: [],
    };
}
