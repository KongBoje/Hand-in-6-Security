# Hand-in-6-Security
### The exercise for this period is here: [Security Exercise](https://docs.google.com/document/d/1ZY-pZDQfwEoQlVk0Qn-lKnpa40MOl-hQdGW9Fx2A5XE/edit)

### Instructions
- The first thing you have to do is run a local mongoDB, when that is done run the file createDummyUser.js inside the rout-ex-react-back. This creates two users: `username: Michael, password: mich123` and `username: Christian, password: chris321`.
- bcrypt is used for the passwords to hash them and then salted like descriped [here](https://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts)
- JWT is used for this application. The serversecret is inside the index.js file and isn't hidden, will be later on.
- Helmet is used a little in the backend express server.
- To test the security, try adding a book without being logged in, then try it again while logged in. Update and delete is added aswell but for some reason it won't show the details window, will try and fix it later some day.
- The backend and the frontend has been checked with [nsp](https://nodesecurity.io/), here is the proof:

backend/frontend:
![Nsp check!](nspPicture.jpg)


## Learning goals:
>## Explain basic security terms like authentication, authorization, confidentiality, integrity, SSL/TLS and provide examples of how you have used them.

---

>## Explain, at a fundamental level, the technologies involved, and the steps required, to setup a SSL connection between a browser and a server, and how to use SSL in a secure way.

---

>## How can we "prevent" third party code used, by either our Java or NodeJS applications, from injecting dangerous code into our code base?

---

>## Explain about Node tools like Helmet and nsp (and the Node Security Project). What do they do, and how have you used them.

---

>## Explain basic security threads like: Cross Site Scripting (XSS), SQL Injection and whether something similar to SQL injection is possible with NoSQL databases like MongoDB, and DOS-attacks. Explain/demonstrate ways to cope with these problems, preferably via your suggestion for a seed.

---

>## Explain and demonstrate ways to protect user passwords on our backend, and why this is necessary.

---

>## Explain about password hashing, salts and the difference between Bcrypt and older (not suited) algorithms like sha1, md5 etc.

---

>## Explain about JSON Web Tokens (jwt) and why they are extremely suited for a REST-based API

---

>## Explain and demonstrate a basic NodeJS/React application and how it handles authentication, authorization, prevents against Cross Site Scripting and other basic web-threats.
