## Visitor Pattern

- The Visitor Pattern is a **`behavioral`** design pattern
  - that allows adding further operations to objects without modifying them.
  - It’s particularly useful when you need to perform various operations on objects of different classes or types **`without` changing their structure**.
  - By defining a new operation (visitor) and applying it to a set of objects, the Visitor Pattern helps separate algorithms from the objects they operate on.

### Visitor Pattern Overview

- **Purpose**: To define a new operation on objects without altering their classes.
- **Encapsulation**: Separates operations (visitor classes) from the objects they operate on, promoting the Single Responsibility Principle.
- **Real-World Example**: Tax calculations for different products in a store. Each product has unique properties, but the tax calculation operation can be applied across all.

**Code Explanation**:

- StoreItem (Element): The context class representing items in a store. It has an accept method that takes a visitor and calls its visit method.
- TaxCalculator and DiscountApplier (Concrete Visitors): These visitor classes implement specific operations (calculate tax and apply discount) on the store item without modifying its structure.

```js
// Traditional Way using Constructor Functions and Prototypes

// Context class: StoreItem
function StoreItem(name, price) {
  this.name = name;
  this.price = price;
}

// Accept method to allow visitor operations
StoreItem.prototype.accept = function (visitor) {
  visitor.visit(this);
};

// Concrete Visitor: TaxCalculator
function TaxCalculator() {}

TaxCalculator.prototype.visit = function (item) {
  // Calculate tax based on item price
  const tax = item.price * 0.1;
  console.log(`Tax for ${item.name}: $${tax.toFixed(2)}`);
};

// Concrete Visitor: DiscountApplier
function DiscountApplier(discount) {
  this.discount = discount;
}

DiscountApplier.prototype.visit = function (item) {
  // Apply discount to item price
  const discountedPrice = item.price - this.discount;
  console.log(
    `Discounted price for ${item.name}: $${discountedPrice.toFixed(2)}`
  );
};

// Usage example
const milk = new StoreItem('Milk', 5);
const bread = new StoreItem('Bread', 3);

const taxCalculator = new TaxCalculator();
const discountApplier = new DiscountApplier(1); // $1 discount

// Applying visitors to items
milk.accept(taxCalculator); // Output: Tax for Milk: $0.50
bread.accept(taxCalculator); // Output: Tax for Bread: $0.30
milk.accept(discountApplier); // Output: Discounted price for Milk: $4.00
bread.accept(discountApplier); // Output: Discounted price for Bread: $2.00
```

---

**Explanation**:

- StoreItem (Element): The class representing items in a store. It accepts different visitor operations.
- TaxCalculator and DiscountApplier (Concrete Visitors): Each visitor encapsulates its specific operation, allowing it to act independently on any store item.

```js
// ES6

// StoreItem class as the Element
class StoreItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // Accept method to allow visitor operations
  accept(visitor) {
    visitor.visit(this);
  }
}

// Concrete Visitor: TaxCalculator
class TaxCalculator {
  visit(item) {
    const tax = item.price * 0.1;
    console.log(`Tax for ${item.name}: $${tax.toFixed(2)}`);
  }
}

// Concrete Visitor: DiscountApplier
class DiscountApplier {
  constructor(discount) {
    this.discount = discount;
  }

  visit(item) {
    const discountedPrice = item.price - this.discount;
    console.log(
      `Discounted price for ${item.name}: $${discountedPrice.toFixed(2)}`
    );
  }
}

// Usage example
const milk = new StoreItem('Milk', 5);
const bread = new StoreItem('Bread', 3);

const taxCalculator = new TaxCalculator();
const discountApplier = new DiscountApplier(1); // $1 discount

// Applying visitors to items
milk.accept(taxCalculator); // Output: Tax for Milk: $0.50
bread.accept(taxCalculator); // Output: Tax for Bread: $0.30
milk.accept(discountApplier); // Output: Discounted price for Milk: $4.00
bread.accept(discountApplier); // Output: Discounted price for Bread: $2.00
```

----

### Real-World Scenarios for the Visitor Pattern

#### 1.	Product Pricing in E-commerce:
-	In an e-commerce application, products might require different price adjustments based on promotions, taxes, or seasonal discounts.
-	Using the Visitor pattern, each adjustment (tax, discount) can be encapsulated in its own visitor class, allowing these operations to be applied across all products without modifying product classes.
#### 2.	AST (Abstract Syntax Tree) in Compilers:
-	Compilers often use Abstract Syntax Trees (ASTs) to represent code. Different operations like semantic analysis, optimization, or code generation can be applied to each node in the AST.
-	The Visitor pattern allows each operation to be encapsulated in its own class, which can then be applied to the AST nodes as visitors.
#### 3.	Customer Notification System:
-	A customer notification system might have different types of notifications (email, SMS, push notifications) based on customer preferences.
-	Each notification type can be a visitor that acts on the customer object, sending the appropriate notification without changing the customer’s data structure.

### Edge Cases in the Visitor Pattern

#### 1.	Inconsistent Visitor Implementation:
-	If a visitor is implemented without support for all element types (e.g., tax calculation doesn’t apply to certain items), it could lead to unexpected behavior.
-	To handle this, ensure all elements have a defined response to each visitor type. Alternatively, validate visitors before applying them.
#### 2.	Circular Dependencies:
-	Visitors should only depend on element data, not behavior. If a visitor tries to invoke methods that modify the element’s structure, it can create circular dependencies.
-	Ensure visitors only perform operations on data or transient properties to avoid complex dependencies and maintain separation of concerns.
#### 3.	Excessive Visitor Complexity:
-	If the system has too many visitors, it may become challenging to manage all the operations. Additionally, if element classes have complex or deeply nested structures, managing all visitors for each element can become error-prone.
-	Consider grouping visitors with similar functionality or introducing a composite structure to simplify the element hierarchy when implementing the Visitor pattern on larger systems.
