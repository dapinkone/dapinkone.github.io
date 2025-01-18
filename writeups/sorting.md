# Sorting

### insertion sort

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

#### Benefits:

- For small n, O(n^2) tends to be faster than the oft-preferred theretical fastest O(nlogn) of other sorts like heapsort, mergesort, quicksort.
- Simple to implement.
- Inplace, requiring no further space requirements, or recursive calls on the stack.
- If data is mostly sorted, can be very fast.

#### Detriments:

- That O(n^2) time.


