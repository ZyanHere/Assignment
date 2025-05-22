### 4. Memory Leaks:

- Memory leaks <ins>**_are pieces of memory that the application have used in the past_**</ins>, _but is not needed any longer_ <ins>but has not yet been returned back to us to the pool of free memory</ins>.

##### <ins>Example:</ins>

<img src="./images_used/compressed_Images/Memory_Leaks.png">


##### <ins> 3 Common Memory leaks:</ins>

1. Global Variables

   - If these are deeply nested objects, then it will use more memory.
   - So <ins>**_try to avoid declaring more Global variables_**</ins>.
     <br/>

2. Event Listeners

   - Adding event listeners and forget to remove them
     <br/>

3. Timers

   - clear the timers
