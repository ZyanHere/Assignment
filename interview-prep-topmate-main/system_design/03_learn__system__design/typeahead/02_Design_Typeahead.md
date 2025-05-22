# **[Front-End System Design] - Typeahead Component**

**[Watch on Youtube](https://www.youtube.com/watch?v=9mjsRrJYOWE)**

---

## **Overview of the Problem**

- **Typeahead Components** are widely used:
  - Google Search
  - Amazon Store
  - Any other search functionality.

#### **Steps in System Design Plan**:

1. **Clarify General Requirements**
2. **Understand Advanced Functionality**
3. **Create a Mockup**
4. **Propose API Design**
5. **Design Internal State Model**
6. **Identify Common Problems** (e.g., Race Conditions)
7. **Optimize Performance**
8. **Address Security Concerns**
9. **Ensure Accessibility**

---

## **Step 1: General Requirements**

1. **Provide Auto-complete Results** based on user input.
2. **Support Multiple Data Types** (generic models).
3. **Efficient Data Requests** with optional **caching**.
4. **Work with Asynchronous and Static Data**.

---

## **Step 2: Advanced Functionality**

### **Different Typeahead Architectures**:

- **Stateless**
- **Stateful**
- **Hybrid**

#### **Stateless**

- **Pros**:
  - Pure UI component.
  - No internal state.
  - Simple to configure.
- **Cons**:
  - Depends on external controllers for data.

#### **Stateful (Static)**

- **Pros**:
  - Holds static data internally.
  - Best for **limited** and **unchanging** datasets.
  - Faster searching speed.
- **Cons**:
  - Works only with small data.
  - Limited scalability.

#### **Hybrid**

- Combines **Stateless** and **Stateful** approaches.
- Useful for **legacy systems** or specific use cases.
- **Complex and expensive** to develop/maintain.

---

## **Pros and Cons Summary**

| **Architecture** | **Pros**                                  | **Cons**                               |
| ---------------- | ----------------------------------------- | -------------------------------------- |
| Stateless        | Simple, easy to integrate.                | Requires external control for data.    |
| Stateful         | Fast, handles static small datasets well. | Limited scalability, blocks large UIs. |
| Hybrid           | Legacy support, combines both models.     | Complex, expensive to maintain.        |

---

## **Step 3: API Design**

### **Properties by Architecture**

#### **General API Properties**:

- `maxResults`: Maximum search items to display.
- `minQuerySize`: Minimum characters required to trigger search.
- `template`: Custom representation for search results.
- `onItemUpdate`: Lazily update search items.
- `onQuery`: Defines logic for search.
- `onItemSelect`: Event triggered when an item is selected.

#### **Hybrid-Specific API**:

- `cacheTTL`: Cache time-to-live.
- `cacheSize`: Max entries in the cache.

---

## **State Design**

### **State Management for Different Architectures**:

1. **Stateless**:
   - No internal state.
2. **Stateful**:
   - Use **Trie** data structure for efficient searching.
3. **Hybrid**:
   - Use **LRU Cache** combined with a Trie.

### **What is a Trie?**

- **Trie**: Tree-based data structure (Prefix Tree).
- **Efficiently searches words by prefix**.

---

## **Handling Race Conditions**

### **Problem**:

- Multiple search requests can return results **out of order**.

### **Solution**:

- Use **AbortController** (Web API):
  - Cancels older requests when new requests are made.

---

## **Performance Optimization**

### **1. Network Optimization**

- Use **Caching**:
  - **Client Cache**
  - **Browser Cache** (set proper headers)
  - **Server Cache**
- Implement **Debouncing** to reduce requests.
- Minimize **package size** and **CSS bloat**.
- Use **compressed assets**: Gzip or Brotli.

### **2. Rendering Optimization**

- **Use Placeholders** for better UX.
- Reduce DOM updates (lazy updates).
- Use **Virtualization** for large lists.
- Optimize **CSS** and animations.

### **3. JavaScript Optimization**

- Avoid blocking the UI thread.
- Use **Web Workers** for large data processing.

---

## **Security Considerations**

1. **Encapsulate DOM**:
   - Use **Shadow DOM** to protect against external manipulation.
2. **Content Filtering**:
   - Allow filtering of data from untrusted servers.
3. **Restrict Customization**:
   - Prevent malicious changes.

---

## **Accessibility**

1. **Focus Control**:
   - Manage focus within the component.
2. **Tab Accessibility**:
   - Ensure all items are **tabbable**.
3. **Scalable Units**:
   - Use `rem` units for responsiveness.
4. **Correct HTML**:
   - Use `<input>` instead of generic `<div>`.

---

## **Conclusion**

- **Typeahead components** are versatile and widely used.
- Choose the right architecture (**Stateless**, **Stateful**, or **Hybrid**) based on your needs.
- **Focus on optimization**, **security**, and **accessibility**.

---
