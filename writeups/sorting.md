# Sorting

## Why sorting?

It seems rudimentary, but lets begin with the definition or sorted:
- A is sorted, if for each element in A, all previous elements are less than or equal. We can use this definition to test our sorts are functioning correctly throughout development:
```python
def isSorted(A):
	if len(A) <= 1:
		return True
	last = A[0]
	for e in A[1:]:
		if last > e:
			return False
    return True
	```


## Baseline.

To begin optimizing, we have to have some baselines to start from. Lets use some classic sorts, merge sort, and insertion sort, because they're relatively simple to implement:

## "Maximum" Speed and Big-O notation

Comparison sorts have a theoretical upper limit of O(nlogn).

## How can we go faster?

- We may have knowledge about the data we're sorting.
  - Is the data mostly sorted?
- How large is the array we're sorting?

### Merge Sort (recursive)

Merge sort uses a common algorithmic technique, "divide and conquer", cutting the list in two and sorting the subsequent lists. Recursion is an intuitive approach for divide and conquer. This yields that theoretical O(nlogn) speed:

```python
	def merge(A, B):  # merges two sorted lists
        C = list()
        while len(A) > 0 and len(B) > 0:
            if A[-1] >= B[-1]:
                C.append(A.pop())
            else:
                C.append(B.pop())
        C.extend(A)
        C.extend(B)
        return C[::-1]

	def mergesort(A):  # merge sort without mutation
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

## Benchmarks

To determine what's what, we need a benchmark framework. So we use the timeit module, and random.choices to take a random sampling and graph the results:
```python
from timeit import timeit
import time
from random import choices

full_sample_size = 2_000

benchsets = [
        ("mergesort", Solution().mergesort),  # not inplace
        ("bisectInsertion", Solution().bisectInsertion),
        ("inplaceInsertionSort", Solution().inplaceInsertionSort), # slow for large values.

def bench(name, F):
    results = list()
    for sample_size in range(1, full_sample_size, full_sample_size//10):
        S = choices(range(full_sample_size), k=sample_size)
        results.append(
            (sample_size, timeit(lambda: F(S[:]), number=7))
        )
    return (name, results)

import matplotlib.pyplot as plt

for name, data in [bench(*s) for s in benchsets]:
    x, y = zip(*data)
    plt.plot(x, y, label=name)

plt.legend()
plt.ylabel("Time")
plt.xlabel("Sample size")
# collect names of sorts, and sample size into a unique name
sort_names = " ".join(sorted(dict(benchsets).keys()))
plt.savefig(f"{sort_names} {full_sample_size}.png")

```
Here's our baseline comparison of merge sort vs inplace insertion sort, over a relatively small sample size


As we expect, merge sort is much faster than insertion sort. But can we do anything about that?

