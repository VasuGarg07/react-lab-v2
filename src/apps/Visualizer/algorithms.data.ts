export interface AlgoInfo {
    name: string;
    description: string;
    timeComplexity: string;
    spaceComplexity: string;
    caption: string;
    code: string;
}

export interface SortingStats {
    comparisons: number;
    swaps: number;
    arrayAccesses: number;
    startTime?: number;
    endTime?: number;
}

export interface SortingState {
    comparing: number[];
    swapping: number[];
    pivot: number[];
    sorted: number[];
    current: number[];
}

export const Algorithms: Record<string, AlgoInfo> = {
    bubbleSort: {
        name: "Bubble Sort",
        description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        caption: "The array is nearly sorted or small in size.",
        code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`
    },
    selectionSort: {
        name: "Selection Sort",
        description: "Divides the input list into a sorted and an unsorted region, repeatedly selecting the smallest element from the unsorted region.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        caption: "Memory space is limited and simplicity is preferred over performance.",
        code: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i)
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`
    },
    insertionSort: {
        name: "Insertion Sort",
        description: "Builds the sorted array one item at a time by comparisons and shifting elements.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        caption: "Dealing with small datasets or continuously sorting incoming data.",
        code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`
    },
    mergeSort: {
        name: "Merge Sort",
        description: "Divides the array into halves, sorts them and then merges them back together.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        caption: "Stable sorting is required and O(n log n) performance is needed regardless of input.",
        code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length)
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  return [...result, ...left.slice(i), ...right.slice(j)];
}`
    },
    quickSort: {
        name: "Quick Sort",
        description: "Selects a 'pivot' element and partitions the array around the pivot.",
        timeComplexity: "O(n log n) avg, O(n²) worst",
        spaceComplexity: "O(log n)",
        caption: "Average-case performance is critical and the data doesn't have many duplicates.",
        code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const p = partition(arr, low, high);
    quickSort(arr, low, p - 1);
    quickSort(arr, p + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot)
      [arr[++i], arr[j]] = [arr[j], arr[i]];
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`
    },
    heapSort: {
        name: "Heap Sort",
        description: "Builds a max heap from the array and repeatedly extracts the maximum element.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        caption: "Guaranteed O(n log n) performance with minimal space usage is required.",
        code: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const l = 2 * i + 1, r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`
    },
    cocktailSort: {
        name: "Cocktail Sort",
        description: "A variation of bubble sort that sorts in both directions on each pass through the list.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        caption: "Elements at the beginning and end of the list need to be moved quickly.",
        code: `function cocktailSort(arr) {
  let swapped = true;
  let start = 0, end = arr.length - 1;
  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
    swapped = false;
    end--;
    for (let i = end - 1; i >= start; i--) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    start++;
  }
  return arr;
}`
    },
    shellSort: {
        name: "Shell Sort",
        description: "Generalizes insertion sort by allowing the exchange of items that are far apart.",
        timeComplexity: "O(n log n) to O(n²)",
        spaceComplexity: "O(1)",
        caption: "Better performance than simple quadratic algorithms is needed with O(1) space.",
        code: `function shellSort(arr) {
  const n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i], j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}`
    }
};
