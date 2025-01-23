# Sorting

## Why sorting?

## "Maximum" Speed and Big-O notation

Comparison sorts have a theoretical upper limit of O(nlogn).

## How can we go faster?

- We may have knowledge about the data we're sorting.
  - Is the data mostly sorted?
- How large is the array we're sorting?

### How do we define "sorted"? For our purposes?
```python
    def isSorted(self, A):
        # test for sortedness.
        if A is None:
            return False
        
        if len(A) <= 1:
            return True

        last = A[0]
        for e in A[1:]:
            if last > e: # objects are out of order.
                return False
            last = e
        return True
```

## Baseline.

To begin optimizing, we have to have some baselines to start from. Lets use some classic sorts, merge sort, and insertion sort, because they're relatively simple to implement:

### Merge Sort (recursive)

Merge sort uses a common algorithmic technique, "divide and conquer", cutting the list in two and sorting the subsequent lists. Recursion is an intuitive approach for divide and conquer. This yields that theoretical O(nlogn) speed:

```python
    def merge(self, A, B):  # merges two sorted lists
        C = list()
        while len(A) > 0 and len(B) > 0:
            if A[-1] >= B[-1]:
                C.append(A.pop())
            else:
                C.append(B.pop())

        C.extend(A[::-1])
        C.extend(B[::-1])
        return C[::-1]

    def mergesort(self, A):  # merge sort without mutation
        N = len(A)
        if N < 2:
            return A
        if N == 2:
            if A[0] > A[1]:
                return A[::-1]

        return self.merge(self.mergesort(A[: N // 2]), self.mergesort(A[N // 2 :]))
```
### Insertion Sort

Insertion sort uses the idea that if everything from 0..i is sorted, we can sort 0..i+1 by inserting the new element in the already-sorted list, yielding O(n^2) time.

```python
    def inplaceInsertionSort(self, A):
        if len(A) <= 1:
            return
        arr = A
        # Traverse through 1 to len(arr)
        for i in range(1, len(arr)):
            key = arr[i]
            # Move elements of arr[0..i-1], that are
            # greater than key, to one position ahead
            # of their current position
            j = i - 1
            while j >= 0 and key < arr[j]:
                arr[j + 1] = arr[j]
                j -= 1
                arr[j + 1] = key
  ```

