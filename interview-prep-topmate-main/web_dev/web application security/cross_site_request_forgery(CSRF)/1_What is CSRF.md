## CSRF

- An attack that **tricks a browser into <ins>executing an unwanted action**</ins> in an application after a user logs in.

- This <ins>**happens without the knowledge of the user**</ins>.

- In CSRF attacks, 
  - while <ins>attackers can't see the response data</ins>, 
  - they can <ins>still perform harmful actions like transferring funds</ins> 
  - or sharing sensitive information by manipulating the user's actions without their knowledge.


- For CSRF attack to succeed, two main conditions are necessary
  - i) The target website must use cookies for session management, with the victim already logged in
  - ii) Malicious request should not require parameters that attacker cannot guess.

---

#### Unpredictable parameters:

- Parameters that are unique to each user or session, such as **sessionID**, **CSRF-token** or **password**.

- If the request requires such parameters, the attacker cannot forge a valid request without knowing these values.
<br/>

----

### CSRF attack using a GET request

- Alex, is a customer of ABC bank. 
  - He is **logged** into the bank website. 
  - This means the **session** is currently **active**, 
  - and login information is **maintained** in the <ins>**cookies**</ins>.

```js
// Now, suppose a request to transfer funds looks like this:
GET http://abcbank.com/transfer.do?acct=Bob&amount=$500 HTTP/1.1
```

```js
// The attacker will create a request in which the account details of the attacker will be provided.
GET http://abcbank.com/transfer.do?acct=attacker&amount=$500 HTTP/1.1
```

- The attacker can create a promotional email which it will send to the user. This email will contain a hyperlink as shown below:
```js
<a href="http://abcbank.com/transfer.do?acct=attackerA&amount=$500">Get the offer!</a>
```

- **If the user clicks on the hyperlink** <ins>**then the transaction will go through and money will be transferred to the attacker’s account**</ins>.

- As you can see, the <ins>**user must already be logged in for this attack to be successful**</ins>. Otherwise, the user will get a login prompt and become skeptical of the link.
---

### CSRF attack using POST request

- Tricking the user to operate a **POST** request is a bit **difficult**. 
- With a **GET** request, the attacker only needs the victim to send a URL with all the necessary information. 
- In the case of POST, a request body must be appended to the request.

#### Example:
- The attacker sets up a malicious website containing JavaScript designed to automatically submit a form with the attacker’s desired action (e.g., transferring funds from the victim’s bank account to the attacker’s account). 
- The attacker then sends a link to this malicious website via a phishing email to the victim. 
- If the victim clicks on the link and visits the malicious website, the JavaScript executes, and the form is submitted (will send a POST request to the bank application) without the  user’s knowledge, carrying out the attacker’s intended action.

```js
<body onload="document.csrf.submit()">
 
<form action="http://abcbank.com/transfer" method="POST" name="csrf">
    <input type="hidden" name="amount" value="500">
    <input type="hidden" name="account" value="attacker">
</form>
```