# BookMyShow LLD | Mock Machine Coding Round | Interview Preparation

[Watch on YouTube](https://www.youtube.com/watch?v=pBG3BAsWCug)


---

- **Discussion Prompt**: Preference for cinema halls and different seating arrangements.
- Highlight: Challenges in online booking, such as seat blocking due to navigation issues.

---

- **Introduction**: Mock interview session on BookMyShow seat allocation LLD.
- **Special Guest**: Ashutosh from Amazon.
  - Career experience: Worked at Policy Bazaar, Cisco, Cognizant, and Amazon.

---

- **Introduction by Ashutosh**:
  - Current Role: Front-end handling of Amazon Mini TV.
  - Tech Stack: React Native.
  - Career Path: From a T3 college to Cognizant, Cisco, Policy Bazaar, Kuku FM, and Amazon.

---

- **Problem Statement**: Building a UI for dynamic seat booking.
  - **Requirements**:
    - Focus on the front-end.
    - Select and reserve seats.
    - Multiple seat types.
    - Alternate seating arrangement.
    - A grid layout with rows and columns.

---

- **Design Diagram**:
  - **Grid Structure**:
    - **Seat Group**: Contains a label and rows.
    - **Seat Row**: Contains a name and multiple seats.
  - **Seat**:
    - Parameters: Price, type, availability, color, and onClick event.
    - Example Types: Available, Not Available, Senior Citizen.

---

- **Concurrent Seat Booking**:
  - **Challenges**:
    - Blocking seats during selection.
    - Releasing seats if the user navigates away or doesn’t finalize payment.
  - **Methods**:
    1. Block on seat selection.
    2. Block during payment initiation.
    3. Block at payment gateway interaction.

---

- **Handling Seat Release**:
  - Explicit cancelation.
  - Navigation hooks for page transitions.
  - Listener for tab close or reload: `beforeunload` event listener.

```javascript
window.addEventListener('beforeunload', (event) => {
    if (hasReservedSeats()) {
        event.preventDefault();
        event.returnValue = '';
        releaseReservedSeats();
    }
});
```

---


- **Implementation**:
  - **Tech Stack**: React with TypeScript.
  - **Interfaces**:
    - `SeatGroup`:
      ```typescript
      interface SeatGroup {
          label: string;
          rows: SeatRow[];
      }
      ```
    - `SeatRow`:
      ```typescript
      interface SeatRow {
          name: string;
          seats: Seat[];
      }
      ```
    - `Seat`:
      ```typescript
      interface Seat {
          id: string;
          price: number;
          type: SeatType;
          color: string;
      }
      ```

---


- **Dynamic Layouting**:
  - Use a flexible data structure for rendering.
  - Example Layout:
    ```typescript
    const seatData: SeatGroup[] = [
        {
            label: 'Club',
            rows: [
                {
                    name: 'A',
                    seats: [
                        { id: 'A1', price: 250, type: 'available', color: 'green' },
                        { id: 'A2', price: 250, type: 'booked', color: 'red' }
                    ]
                }
            ]
        }
    ];
    ```

---


- **Optimization Tips**:
  - Use proper data structures.
  - Avoid excessive `onClick` binding.
  - Use React memoization (`React.memo`, `useCallback`) for re-renders.
  - Implement lazy loading and code splitting.

---


- **Conclusion**:
  - Covered dynamic layouting, concurrent booking, releasing strategies, and optimizations.

