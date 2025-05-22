##### First we will understand how HTML is parsed

- When a HTML file is downloaded by the browser it starts at the top of the html file (ex: html tag) and parses all the way down to the html file until it reaches the very bottom.
- If it comes across the resources to download <strong>such as images, it will send a request to download that and it continue parsing</strong> even if the resource is not finished downloading.

<img width="473" alt="image" src="https://user-images.githubusercontent.com/42731246/212496595-bc3b151a-f034-4d53-a9a4-3690ef3ad362.png">

- But when it <strong>comes to javascript</strong> a normal script tag will send a request to download <strong>and the parser stops as soon it hits the script tag</strong>, and waits until the script tag gets downloaded and executed before it will continue parsing the rest of the HTML file.

<img width="824" alt="image" src="https://user-images.githubusercontent.com/42731246/212562288-fe652bd2-8053-4822-ac6e-86c5182cc620.png">

<img width="836" alt="image" src="https://user-images.githubusercontent.com/42731246/212562238-bff0005e-63a9-4eb1-b681-37ab40dd0363.png">

- This is the first way to load Javascript and which is the <strong>way that most Javascript is loaded</strong> because it's just a single script tag with a source attribute and no other attributes.

- This is why many times when you see the script tags, you would <strong>see them in the very bottom of the HTML</strong> so that way, parser can find all the images and other content before gets the javascript (which actually delay the parser until after the .js is downloaded and executed)

---

##### Following Picture shows the example

<i><u>This is something we want to try to avoid</u></i>

- HTML is being downloaded and as soon as it hits the javascript tag <strong>it will stop parsing the HTML</strong>, it will download the javascript and then it will run the javascript and now <strong>after the javascript is running</strong>, the HTML will continue to parse the rest of the document.

<img width="872" alt="image" src="https://user-images.githubusercontent.com/42731246/212562497-17024237-4528-447c-b6c3-94c46afe47e3.png">

<img width="922" alt="image" src="https://user-images.githubusercontent.com/42731246/212564724-021c153a-e26e-4c54-896f-2cbf76634834.png">

---

##### Following Picture shows Async tag way

- The Asynchronous(Async) tag tells our parser that it can download this <strong>javascript in the background</strong> and it will <strong>continue to parse</strong> while javascript is being downloaded and <strong>as soon as the javascript being done downloaded</strong>, whether it is before the parser is done or after the parser is done, <strong>it will completely stop parsing and it executes the javascript</strong> and then <strong>resumes the parsing after the javascript is done executed</strong>.

<img width="754" alt="image" src="https://user-images.githubusercontent.com/42731246/212562932-95212fa6-4635-48a2-b02d-4bd0c5e75d63.png">

- This means <strong>if you have bunch of asynchronous javascript tags</strong> in your project, they will be <strong>loaded in the random order</strong> depending on how fast the actual files download, <strong>so every time you load the page they could potentially be run in a different order</strong> (<i><u>This is something you may not always want</u></i>)

<i>Below code execution happens in random order (you won't see the same order everytime)</i>
<img width="914" alt="image" src="https://user-images.githubusercontent.com/42731246/212564763-2fe394a7-5649-4049-ac27-9f9234b99b9f.png">

---

##### Following Picture shows Defer tag way

- The Defer attribute for a script tag is very similar to the async attribute except for <strong>instead of executing the javascript as it is done being downloaded, it waits until the parser is completely finished </strong>parsing all of the HTML and <strong>then it runs all of the script tags (<i>executing</i>) </strong>in order that they're listed inside of the HTML document

<img width="743" alt="image" src="https://user-images.githubusercontent.com/42731246/212563516-8875040f-74a6-40c5-87ed-fcbf73abf112.png">

<i>Defer always executes as soon as the HTML parsing is done and before the document is ready</i>
<img width="910" alt="image" src="https://user-images.githubusercontent.com/42731246/212564776-ae9f9c4c-ac6e-4dd7-a441-84ed1fd6195c.png">

---

- ##### Defer is the most useful of the three ways to load the javascript because it allows you to run javascript in order which is sometimes very important (if you're including certain libraries that depend on the other libraries) so you need to load them in a very specific order

- ##### Defer is used in order to make javascript run before the onDOMContentLoaded event is fired from the document (also executes the code in order) which is useful

- ##### There is also one scenario where most of the people put the script tag at the very end of the body tag (in order to eliminate the actual pausing of the parsing)

<i>Below Stuff gets executed right before the document done parsed which means the document is already loaded up all the image tag and stuff that it needs to </i>
<img width="901" alt="image" src="https://user-images.githubusercontent.com/42731246/212565312-bc3546b6-10a2-4176-a004-6c0bc3cd7aaf.png">

- ##### If you are going to follow the above approach (might consider the approach of using defer and put in the head tag) so that it is easier to find your Javascript files as they are all in one place opposed to being stuck at the bottom of the body tag.
