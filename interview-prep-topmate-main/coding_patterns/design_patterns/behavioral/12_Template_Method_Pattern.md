# Template_Method Design Pattern

The Template Method Pattern is a **behavioral** design pattern 
- that defines the skeleton of an algorithm in a base class 
- and allows subclasses to provide specific implementations for certain steps of the algorithm. 
- The base class dictates the structure and flow of the algorithm, while subclasses override specific parts to modify or extend behavior as needed.

> This pattern is useful when you have an algorithm with steps that can vary in behavior but follow a fixed overall structure.

Template Method Pattern Overview

-	**Purpose**: To define the structure of an algorithm in a base class and allow subclasses to implement specific steps of that algorithm.
-	**Structure**: The template method in the base class provides a sequence of steps, with some steps implemented in the base class and others left for subclasses to override.
-	**Real-World Example**: A report generator class that defines a sequence of steps for generating a report, such as data retrieval, data processing, and formatting. Subclasses can provide different implementations for data retrieval or formatting, while the base class manages the overall flow.

### Code Example (Template Method Pattern in JavaScript)

#### Example: Report Generator Template

```js
// Abstract class ReportGenerator that defines the template method
class ReportGenerator {
  // Template method: defines the sequence of steps to generate a report
  generateReport() {
    this.fetchData();    // Step 1: Fetch the data (implemented by subclass)
    this.processData();  // Step 2: Process the data (fixed step)
    this.formatData();   // Step 3: Format the data (implemented by subclass)
    this.saveReport();   // Step 4: Save the report (fixed step)
  }

  // Abstract method to fetch data (to be implemented by subclasses)
  fetchData() {
    throw new Error("fetchData() must be implemented by a subclass");
  }

  // Abstract method to format data (to be implemented by subclasses)
  formatData() {
    throw new Error("formatData() must be implemented by a subclass");
  }

  // Fixed method to process data (common to all subclasses)
  processData() {
    console.log("Processing data...");
  }

  // Fixed method to save the report (common to all subclasses)
  saveReport() {
    console.log("Saving report to disk...");
  }
}

// Concrete subclass: XMLReportGenerator
// These Concrete subclasses implement specific steps for fetchData and formatData, following the sequence defined by the template method in the base class.
class XMLReportGenerator extends ReportGenerator {
  fetchData() {
    console.log("Fetching data for XML report...");
  }

  formatData() {
    console.log("Formatting data as XML...");
  }
}

// Concrete subclass: JSONReportGenerator
class JSONReportGenerator extends ReportGenerator {
  fetchData() {
    console.log("Fetching data for JSON report...");
  }

  formatData() {
    console.log("Formatting data as JSON...");
  }
}

// Usage example
const xmlReport = new XMLReportGenerator();
xmlReport.generateReport();
// Output:
// Fetching data for XML report...
// Processing data...
// Formatting data as XML...
// Saving report to disk...

const jsonReport = new JSONReportGenerator();
jsonReport.generateReport();
// Output:
// Fetching data for JSON report...
// Processing data...
// Formatting data as JSON...
// Saving report to disk...
```

----

### Real-World Scenarios for the Template Method Pattern

#### 1.	Document Generation:
-	Many document generators need a similar set of steps: gathering data, processing it, formatting it in a specific way, and then saving or exporting the document. A base class can define the skeleton of these actions, while subclasses provide the specifics for different formats, such as PDF, Word, or HTML reports.
#### 2.	Data Processing Pipelines:
-	Data processing workflows often follow a similar structure: data retrieval, transformation, and output. The Template Method Pattern allows defining this structure while enabling subclasses to customize each step, such as applying different data transformation methods or formatting outputs for different target systems.
#### 3.	User Onboarding Flows:
-	In applications with complex onboarding, the onboarding process can have a shared structure (e.g., collecting user info, providing a tutorial, verifying identity) with specific implementations for different user roles. The Template Method Pattern allows creating an onboarding template with some steps left to be customized by each specific user role.

----

### Edge Cases and Considerations

#### 1.	Forcing Subclass Implementation:
-	The base class should ensure that critical methods (e.g., fetchData, formatData) are overridden by subclasses. In JavaScript, you can throw an error in the base class to ensure subclasses implement these methods. Alternatively, TypeScript or other languages with interfaces can enforce this more strongly.
#### 2.	Optional Steps:
-	If some steps may not be needed in certain subclasses, consider implementing hooks or optional methods in the base class that can be overridden if needed. This can make the template more flexible without requiring every subclass to implement all steps.
#### 3.	Fixed vs. Variable Steps:
-	The Template Method Pattern works best when most of the algorithm steps are fixed, with only a few variable steps. If most steps need customization, this may lead to overly complex subclasses that require significant maintenance.
#### 4.	Order of Steps:
-	Since the base class dictates the order of steps, any change in the order will affect all subclasses. If you need flexibility in step order, the Template Method Pattern may not be ideal; consider using a more dynamic approach like the Strategy Pattern.