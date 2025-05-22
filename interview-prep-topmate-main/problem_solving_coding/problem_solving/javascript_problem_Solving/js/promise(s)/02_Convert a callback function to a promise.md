## Convert a callback function to a promise

```js
// Callback code
var students = [
  {
    id: 101,
    name: 'Geek A',
  },
  {
    id: 102,
    name: 'Geek B',
  },
  {
    id: 103,
    name: 'Geek C',
  },
  {
    id: 104,
    name: 'Geek D',
  },
];

const callback = (err, student) => {
  if (err) {
    console.log(`Student with given id ${err} not found`);
  } else {
    console.log('Here is the student: ' + student.name);
  }
};

// Passing studentid and callback function as parameter
const findName = (studentId, callbackFunction) => {
  let student = students.find(function (studentValue) {
    return studentValue.id == studentId;
  });

  // Student not found
  if (typeof student === 'undefined') {
    return callbackFunction(studentId, false);
  } else {
    // Student found
    return callbackFunction(null, student);
  }
};

findName(101, callback);
```

```js
// Promise Conversion
var students = [
  {
    id: 101,
    name: 'Geek A',
  },
  {
    id: 102,
    name: 'Geek B',
  },
  {
    id: 103,
    name: 'Geek C',
  },
  {
    id: 104,
    name: 'Geek D',
  },
];

const findName = (studentId) => {
  return new Promise(function (resolve, reject) {
    let student = students.find(function (studentValue) {
      return studentValue.id == studentId;
    });
    if (student) {
      resolve(student);
    } else {
      reject(id);
    }
  });
};

// Usage:
findName(101)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```
