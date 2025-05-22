## 1. Using CSRF tokens

- This is also known as anti-CSRF token or synchronizer token.

```js
1. anti-CSRF token is a type of server-side CSRF protection.
2. It is a random string that is only known to the user's browser and web app.
```

- When a request is sent to a web server, <ins>**it generates a token and stores it**.</ins>
- The token is statically <ins>**set as a hidden field of the form**</ins> refers to the practice of embedding a CSRF token within a web form as hidden input field.
- When the form is submitted the <ins>**token is sent along with the other form data to the server**</ins> (in the POST request data).
- The application compares the token generated and stored by the application with the token sent in the request (token from the user's browser is sent back to the server along with the form data. The server then compares the received token with the one it has stored.)
- If these **tokens match, the request is valid**. Otherwise, the request is considered invalid and is rejected.
- Now even if an attacker creates a malicious POST request, **it is not possible to add the token <ins>as the attacker would not be aware of it**</ins>.

```js
i) In the context of preventing CSRF attacks, this ensures that each form submission is accompanied 
by a unique token that server can validate.
ii) So, this makes difficult for the attackers to forge a valid request.
```

---

## 2. Same site cookies

- The **SameSite** **`flag`** in cookies is a relatively new method of preventing CSRF attacks and improving web application security.
<br/>

- If the session cookie is marked as a SameSite cookie, <ins>**it is only sent along with requests that originate from the same domain**</ins>.

```js
Therefore, even if the user clicks on the hyperlink provided by the attacker, the cookies will not be sent.
```
----

### Best practices to avoid a CSRF attack

- Always **log out of the website** once work is complete. This will close the session and remove cookies.
- Try **not to use multiple websites** at the same time. If you are logged in into a website in one browser tab and using a malicious website in another tab, then the chances of CSRF attack increase.
- **Do not allow browsers to remember passwords**.