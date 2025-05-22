## Why should we use microfrontend ?

- One large benefit that we get is that each of **these `applications` can now be thought of as <ins>separate independent apps**</ins>
- There's **no `direct` `communication` between them**. 
- There's **no `direct` `dependency`** between them. 
- And that means that **we could `assign` the development of `ProductListing` to say, `Engineering-TeamNumber-One`**. 
  - And **we could just assign the development of this `ShoppingCart` app to a <ins>totally separate engineering team**</ins>.

<img src="./imagesUsed/diffTeams.png">


- So for example, 
  - **Engineering Team Number One** could decide to **`build` this project using `React`** 
  - and maybe **Engineering Team Number Two** could decide to **`implement`** this using **`Angular`** or something else.
<br/>

- The point here is that each engineering team can build their application with their preferred development style, whatever works best for them.

---

## SUMMARY:

- We make use of Microfrontends because it **allows multiple different engineering teams to <ins>work on the same overall application, but in total isolation**</ins>. 
- So if Engineering Team A or Number One **make some kind of `breaking` change to their `app`**, <ins>**it's not gonna necessarily break some other part of our application**</ins>.
- In addition, when we start to divide our application out into Microfrontends, it **makes each of these smaller parts a <ins>lot easier to understand</ins> and make changes to <ins>without accidentally breaking some other part of our app</ins> as well**.