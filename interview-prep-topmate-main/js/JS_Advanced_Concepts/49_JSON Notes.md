#### JSON (Javascript Object Notation)

- Data representation format (very similar to XML and YAML)
- Widely used for APIs and Config files
- Lightweight(small file size) and easy to write/read (much cleaner)
- Integrates easily with most languages (create/Consume API)

#### JSON Types

- Strings
- Numbers
- Boolean
- null
- Arrays
- Objects

<img width="904" alt="image" src="https://user-images.githubusercontent.com/42731246/212495015-52c2dce8-211d-4c6a-b788-1aa1a873d53c.png">

---

#### Example of how a .json file looks like

<img width="747" alt="image" src="https://user-images.githubusercontent.com/42731246/212495417-2b2f53fc-c46e-40b0-b8e0-f3d4c5efe210.png">

#### Array of objects in .json

 <img width="419" alt="image" src="https://user-images.githubusercontent.com/42731246/212495482-c05260bf-231c-4bc1-8046-edd4946cdcd0.png">

---

#### To convert JSON string into JS object

- JSON.parse(string)

#### To convert JSON object into string

- JSON.stringify(object)

#### Combining both of them will perform a Deep Copy

- JSON.parse(JSON.stringify(object))

<strong>Note:</strong> Above approach is good for Deep Copy but still there are few areas for which Deep Copy doesn't work

---

## Reference Article:

https://www.freecodecamp.org/news/json-stringify-method-explained/#:~:text=The%20JSON.,can%20be%20considered%20JSON%2Dsafe.

---
