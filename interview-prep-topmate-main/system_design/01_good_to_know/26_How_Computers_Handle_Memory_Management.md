
# How Do Computers Handle Memory Management?

[Watch on Youtube](https://www.youtube.com/watch?v=FLZc4xH4E8U)

---


  Different systems employ different techniques for memory management, each with their own advantages and disadvantages.  
  Being able to speak to the pros and cons of each may be helpful in your upcoming technical interviews.  


  - Memory management deals with how systems allocate and free up memory during the execution of a program.  
  Older languages like **C** or **C++** don't have any kind of automatic memory management. Developers had to:  
  - Allocate and release memory explicitly by calling `malloc` and `free` in C.  
  - Use `new` and `delete` in C++.  

  A critical requirement for managing memory is that **each allocation is matched to exactly one deallocation**.  
  - If the developer forgets to release allocated memory:  
    - The system can't reclaim it.  
    - This results in **memory leaks**, making the memory unusable until the program terminates.  
  - Over time, this causes programs to run out of memory and crash, especially problematic for critical servers or operating systems.  
  - If a developer accidentally releases previously deallocated memory:  
    - It might release memory currently in use, leading to **unpredictable and disastrous consequences**.

### Manual memory management has:  
  - The least overhead for the program.  
  - The highest potential for bugs due to reliance on developers remembering to call appropriate deallocation functions.  

  This has led to many issues in the past. Thus, most modern programming languages employ **automatic memory management mechanisms**.  

  Two common patterns are:  
  1. **Garbage Collection**  
  2. **Automatic Reference Counting**  

  Let’s dive deeper into these patterns.

- **Garbage Collection**  
  - The **most common pattern** for deallocating memory.  
  - Used by languages like **Java**, **Go**, and many others.  
  - Process:  
    - When the system detects low memory, it pauses program execution to run a **garbage collector**.  
    - The garbage collector:  
      1. Marks all in-use memory in the program.  
      2. Compacts the heap by moving all reachable memory to the beginning of the heap.  
      3. Updates references to new locations.  
      4. Releases all unreachable memory.  
    - Optimizes the number of times it runs by identifying:  
      - Short-lived memory.  
      - Persistent memory.  
    - Memory is assigned a **generation**, which determines how frequently it is cleared.  

- **Automatic Reference Counting (ARC)**  
  - Maintains a **reference count** for each allocated memory block.  
  - Process:  
    - When a variable refers to an object, the reference count is incremented.  
    - When the variable stops referencing the object, the count is decremented.  
    - When the count reaches zero, the memory is immediately freed.  
  - Used by **Apple** in Objective-C and Swift (iOS).  

  **Comparison**:  
  - **Garbage Collection**:  
    - Developer-friendly.  
    - Removes mental overhead of managing references.  
    - Can pause the program at random points, unsuitable for real-time interactive apps.  
  - **Automatic Reference Counting**:  
    - More developer overhead.  
    - Avoids pauses but requires attention to:  
      - Avoiding reference cycles that cause memory leaks.  
      - Managing additional space for storing reference counts.  

  - Development teams often don’t have a choice in memory management strategies.  
  - The choice is dictated by the programming language used in the project.  
  - Developers need to optimize experiences within the language/platform limitations.  

---