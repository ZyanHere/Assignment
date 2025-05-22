## Denial-of-Service attack
A denial of service or DoS, is a attack which <ins>**attacker tries to crash an application**</ins> so that users are not able to access the application. 

```js
- The attacker doesn't gain any benefit from this attack. 
- The main purpose of this attack is to harm an organization
```

### Types of Denial of Service Attacks


### 1. Flood Attack: 

- Attacker overwhelms the application with a flood of requests.
- Every application is having a limit to handle the no. of requests per second,
- and if the no. of requests gets increases exponentially then server will slow and eventually crash.

```js
There are "two" types of Flood attacks:
```
#### i) ICMP flood:
- Here, attacker <ins>**leverages misconfigured network devices**</ins> by sending spoofed packets that ping every computer on the targeted network (instead of just one specific machine).
- The network is then triggered to amplify the traffic.
- Also known as **smurf attack** or **ping of death**.
<br/>

#### ii) SYN flood:
- Here, the **targeted server receives a request to begin the `handshake`, <ins>but the handshake is never completed**</ins>.
- This leaves the connected port occupied and **`unavailable` to process further requests**.
- The attacker continues to send more and more requests, **overwhelming all open ports** and shutting down the server.
 
----

### 2. Crash Attack: 

- Attacker **transmits a bug to the server** which then takes advantage of the vulnerabilities of the server.

#### Distributed denial of service

- In a distributed Denial of Service (DDoS) attack, **a group of compromised computers, often referred to as a `botnet`, <ins>work together to flood a target**</ins>, such as a website or online service, with excessive requests. 
- This coordinated effort aims to overwhelm the target’s resources, making it unavailable to legitimate users. 
- The synchronization aspect means that <ins>**these multiple systems start their attack at the same time or in a coordinated manner**</ins> to maximize the impact on the target.
- With this method, <ins>**the target is attacked from many locations at once**</ins> instead of being attacked from a single location.

```js
The distributed DoS attack is hard to stop because of the following reasons:

i) The attack can be done by systems throughout the world, so it becomes difficult 
to find the location of the attack.

ii) It is difficult to counter-attack multiple machines.
```

### Steps to stop DoS attack:

#### 1. Black Hole Routing
- If an application owner sees that the application is experiencing unprecedented load of traffic, <ins>**then all of the traffic can be routed to Black Hole route**</ins>.
- In this mechanism, the legitimate and illegitimate requests are sent to a black hole, **so the <ins>application goes down</ins> regardless**.

```js
The benefit is that it gives some time to application owners to look into the origin of the attack 
and take appropriate action.
```

----

#### 2. Rate Limiting

- Is also a way of mitigating denial-of-service attacks
- Limiting the number of requests a server will accept during a certain window of time (By setting a maximum number of requests that can be accepted from a user or IP address in a given time frame, it helps ensure that the server remains available for legitimate users even during an attack)



```js
Although this may lead to some valid requests being denied, the benefit of this method 
is that the system will not be overwhelmed.
```

-----

