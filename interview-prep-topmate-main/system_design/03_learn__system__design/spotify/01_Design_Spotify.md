# Frontend System Design: Music Streaming Service (Spotify)

**Source:** [Watch on Youtube](https://youtu.be/qFFgmp8gyec?si=PvfugFFYFp6O2YlE)

### Introduction

- Will discuss how to design a web application for streaming music.
- We will cover not only the front-end part but also touch on specific aspects such as streaming protocols and different audio formats.
- We start with a brief introduction, during which we discuss references, address clarifying questions from our hypothetical interviewer, and gather requirements.
- Next, we turn our attention to the architecture encompassing the primary layers of the application like UI, data models, API, and other elements.

### Streaming Music and Technologies

- Following that, we take a closer look at the process of streaming music.
- We discuss how we plan to implement this in the browser, including the formats, technologies, and approaches we intend to use.
- Subsequently, we explore general topics common to most major web applications such as offline mode, performance, and accessibility.
- Additionally, we delve into specific details of our application and conclude by consolidating all requirements to ensure nothing has been overlooked.

### Clarifying Questions

- First and foremost, we need to find references for our application.
- Designing an app without a clear vision of what we are working on can be challenging.
- While we can and must ask clarifying questions to the interviewer, it’s essential to be familiar with the context.
- In our case, possible references include **Spotify**, **Apple Music**, **YouTube Music**, and **SoundCloud**.
- These applications encompass a wide range of features such as audio playback, playlist management, and the ability to download music for offline usage.

> Since it's impossible to cover all features during the interview, we must ask the interviewer about the specific areas on which we should focus.

### Key Features to Support

#### Questions:

1. **Which features should we support?**

   - Show recommendations on the main page.
   - Allow users to search by track, artist, or album.
   - Provide additional artist information when users click on an artist name.

2. **Should we support an offline mode?**

   - Yes, we should allow users to download music for offline listening.

3. **Should we have a native application like Apple Music and YouTube Music?**

   - Having a native application would be useful, but designing a native app isn’t the responsibility of a front-end developer.

4. **Any additional features the app should have?**
   - Seamless playback ensuring that playback continues uninterrupted regardless of user actions on the page or when switching between devices.

---

### Functional and Non-Functional Requirements

We are ready to collect the requirements since the interviewer has provided a clear picture of their expectations. The functional and non-functional requirements are as follows:

#### **Functional Requirements**:

- Users can listen to music.
- Playback should not be interrupted by any actions on the page.
- Users can search by track name, artist, or album.
- Clicking on the artist name or album should display more information.
- Display personal recommendations for users.
- Synchronize the state between different devices (e.g., desktop to mobile).

#### **Non-Functional Requirements**:

- Accessible to people with different disabilities.
- Efficient performance.
- Internationalized.
- Support offline mode.
- Works well on various types of devices.

---

### High-Level Architecture

We are using the classic modern MVC (Model-View-Controller) pattern, which is well suited for describing a typical web application. This pattern separates components into layers, allowing changes in one layer without affecting others. The architecture consists of three main components:

- **View** (UI): Responsible for displaying UI elements.
- **Controller**: Connects the view and model.
- **Model**: Handles data, including client stores and response caches.

### Backend Servers

There are two servers:

1. **App server**: Handles data-related tasks.
2. **Web server**: Delivers assets like JavaScript, CSS, and HTML files.

### User Interface Design

The main screen shows recommendations, the search screen displays search results (songs, artists, albums), and the artist page provides additional information. Each screen includes a **player** for seamless playback.

### Rendering Approaches

There are two primary rendering options:

- **Client-Side Rendering (CSR)**: Provides smooth transitions but has poor search engine optimization.
- **Server-Side Rendering (SSR)**: Provides better SEO and fast loading, but slower page transitions.

For this app, we prioritize fast page switching and continuous playback, making CSR the better choice with optimizations like preloading and code splitting.

### Data Model

The data model consists of three primary entities:

1. **Song**
2. **Album**
3. **Artist**

Each song can belong to one or more artists and optionally to an album. **Genres** are predefined string values such as rock, pop, etc.

### Data Transmission Methods

There are three main approaches for transmitting data between the web application and the server:

1. **REST API**: Flexible but lacks standardization.
2. **RPC (Remote Procedure Call)**: High performance, but more complex and not natively supported by browsers.
3. **GraphQL**: Allows fetching only the required fields, making it ideal for tightly coupled entities like our songs, albums, and artists.

### Protocols for Data and Streaming

For our app, we need support for both data fetching (GraphQL) and streaming (REST API). Using these two protocols together offers scalability and flexibility.

### Backend for Frontend (BFF)

The **BFF** layer is added between the front-end and back-end, allowing for more control over the user experience on different devices (e.g., desktop vs mobile). The BFF can handle resource-intensive operations, ensuring that the back-end remains robust and flexible.

### Search Functionality

We need to implement search across multiple entities—artists, songs, and albums. The backend will determine the best matches and return the top results to the client.

---

### Streaming Protocols

The core feature of our application is **streaming**. We distinguish between **streaming** and **progressive downloading**:

- **Progressive downloading** allows for immediate playback but does not support fast seeking.
- **Streaming** allows for fast seeking but requires more complex development.

In terms of protocols:

- **HTTP**: Supports progressive downloading but not streaming.
- **RTMP**: Requires additional extensions and lacks native browser support.
- **HLS** and **DASH**: Modern adaptive streaming protocols with broad support.

We will opt for **HLS** or **DASH** in combination with **MSE** (Media Source Extensions) for better control over content delivery and security.

### Implementing Streaming

We will use **MSE** for greater control over content delivery, enabling features like adaptive streaming and live streaming. This allows us to protect content with **DRM** and ensure secure playback.

## Streaming Audio Formats, Encrypted Media, and Native Applications

## **1. Introduction to Dash and Streaming Protocols**

Apple Music supports only **HLS**, while **Spotify** employs its own proprietary protocol, **OV**.  
For our app, we will use **Dash** because:

- It's modern
- It supports streaming
- It is codec agnostic

## **2. Audio Formats**

Since we've chosen **Dash**, we have the freedom to select the most suitable audio format for our needs.

- **MP3**: The oldest format, widely supported, and has relatively small file sizes.
- **AAC (Advanced Audio Codec)**:
  - An audio codec designed to succeed the MP3 format.
  - Offers higher sound quality at the same bit rate.
  - More modern alternatives to MP3.

### **Other Streaming Audio Formats**:

- **Opus**:
  - Provides good quality with a wide range of bit rates.
- **Vorbis**:
  - Offers better quality than MP3 at similar bit rates.
  - It is widely used by streaming services and is **open source**, which could be advantageous depending on our company's goals.

## **3. Real-World Usage of Audio Formats**

- **Apple Music**: Supports **AAC** and **Apple Lossless Audio Codec (ALAC)**.
- **Spotify**: Uses **AAC** and **Vorbis**.
- **For Our Service**:  
  We prefer to use **AAC** and **Vorbis**. Vorbis is designed for streaming purposes and is open-source, which is favorable for broader compatibility with browsers and devices.

### **Bitrate Adjustments**:

- **Dynamic bitrate adjustments** are possible via **MSE**, **Dash**, or **HLS** depending on network conditions.
- **Browser Compatibility Issues**:  
  Some browsers do not support **MSE** with certain audio formats, necessitating support for at least two formats.

**Key Point**:  
To ensure broader device compatibility, we will primarily use **AAC**, which is supported by major devices and browsers.

## **4. Encrypted Media Extensions (EME)**

**Encrypted Media Extensions (EME)** provide an API that allows browsers to interact with a **Content Protection System (CPS)**, ensuring content is encrypted so users cannot access it outside the application.  
This is crucial for preventing illegal distribution and requires special servers known as **DRM servers**.

### **Process Overview:**

1. The API requests the audio file metadata, including the audio URL.
2. The controller passes it to the player's component.
3. The player requests the **CDM** (Content Decryption Module) built into the browser.
4. The **CDM** requests a license key from the DRM server.
5. The DRM server generates the license key and sends it to the client.
6. The client passes the key to the **CDM**, which decrypts the media content.
7. The user gains access to the content.

### **Further Enhancements**:

We can go beyond **MSE** by using the **Web Audio API**, although browser support for it is limited. To manage browser variations, we will implement one or more solutions:

- **HTML5 native audio element**
- **MSE**
- **Web Audio API**

### **Comparing Audio Solutions**:

- **HTML5 Audio Element**:
  - Basic, good browser support, easy to implement, but limited in features.
- **MSE**:
  - More feature-rich but requires more resources and has less extensive browser support.
- **Web Audio API**:
  - Provides advanced features like mixing, processing, filtering, but has worse browser support and demands a higher level of expertise.

We will **start with the HTML5 Audio Element** and progressively upgrade to **MSE** or **Web Audio API** based on browser capabilities.

## **5. Offline Mode**

Offline mode is crucial for streaming music applications, allowing users to access their music catalog when they don't have an internet connection.

### **Offline Mode Features**:

- Display the current network status and inform the user they are offline.
- Provide an option to browse and play downloaded music.

### **Service Workers**:

Service workers act as a proxy between the web application and backend, enabling us to:

- Cache assets for offline use.
- Reduce network utilization even when offline.

**How Service Workers Work**:

1. When the user is online, the service worker intercepts requests for assets (e.g., HTML, CSS, JS).
2. If assets are cached, they are served from cache; otherwise, they are fetched from the server.
3. On subsequent visits, cached assets are used without needing to fetch them again.

## **6. Storing Media Files Offline**

To allow users to listen to music offline, we must store media files efficiently.

### **Options for Storing Media**:

- **Local Storage**:
  - Easy to use but has very limited capacity (~5-10 MB).
  - Does not support binary files.
  - Synchronous API, which is slow for media files.
- **IndexedDB**:
  - Larger capacity (up to ~80% of available space in Chrome).
  - Supports binary files and asynchronous API for faster operations.

**Why Not Use Cache Storage for Media Files**:  
Cache storage does not provide sufficient control for media download management, such as:

- Pausing and resuming downloads.
- Handling HTTP **range requests** for partial file downloads.

Thus, we will use **IndexedDB** for media file storage.

## **7. DRM and Persistent Licenses**

When offline, **persistent licenses** allow users to access encrypted content without an internet connection.

- Persistent licenses can be stored locally on the device and reused until they expire or are revoked.
- They are needed when access to the license server is unavailable due to a lack of internet connectivity.

## **8. Music Download Flow**

Assuming the user has already downloaded the music and stored it in **IndexedDB**, the flow when the user goes offline is as follows:

1. The application checks if there is internet connectivity.
2. If offline, the user is prompted to access the downloaded directory.
3. The **persistence license** is used to decrypt the preloaded, encrypted audio files.

## **9. Native Application**

A native application would provide users with the ability to use the service independently from the browser, giving us more control over the user experience.  
Given that we do not have a dedicated team for desktop development, we plan to use **web technologies** for the native application.

### **Native App Options**:

- **Electron**:
  - A framework to build cross-platform desktop apps using web technologies (HTML, CSS, JavaScript).
  - Pros: Cross-platform, large community, access to native APIs.
  - Cons: Large app size, higher system resource consumption due to bundling Chromium.
- **Progressive Web Apps (PWA)**:
  - Built using standard web technologies, works across platforms (mobile and desktop).
  - Pros: Smaller size, better SEO, easier development.
  - Cons: Limited access to native APIs, browser-dependent.

### **Choosing the Right Approach**:

- **PWA** is suitable for simple development and initial deployment.
- **Electron** is better for feature-rich apps requiring access to native APIs.

We will use a **PWA** initially due to its simpler development and smaller size. Later, we may transition to an **Electron**-based solution if needed.

---

## Application Optimization and Features Overview

- We can't allocate time and resources to build a complex native application.
- A **PWA** (Progressive Web App) provides us with a possibility to launch both a mobile app and desktop app relatively easily with minimal resources.

## **Streaming Optimizations**

- What if a user wants to play their favorite songs many times? How can we optimize this scenario?
- Just as we store saved music, we can also store frequently played music. - The only difference is that this data needs occasional cleaning.
- This means we can turn to our old friend **NXB** once again.
- If we discover that a user is replaying a song rather than streaming it, we can **download** it and **save** it into **NXB**.

#### **Process**:

1. When a user begins to replay a song, we first check if it’s already saved locally or in **NXB**.
2. If the song is not in **NXB**, the **web location** requests the file from the **CDN**.
3. Audio files are then transferred to the client.
4. Once all chunks are downloaded, we group them together and store them in **NXB**.
5. The **audio file name** should **not** be used as a key. Instead, the **ID** should be used.
6. When the user wishes to replay the song, it will be retrieved from **NXB** without a network request.

---

## **Synchronization Across Devices**

We anticipate that our application can be used on a variety of devices. A user might start listening to an album or song at home and then continue listening from a mobile phone while outside. We need to store the following **playback information**:

- **Current song**
- **The point from which playback should continue**
- **Playback context**: This includes the list to which the current audio file belongs, such as an album, a list of favorites, or recommended songs.

#### **Context Details**:

- **Playback context** may also contain other useful information.
- Memorizing the point from which playback should continue may not be very convenient for short tracks but is useful for long DJ sets and podcasts. We may implement this for audio longer than **10 minutes**.

---

## **Process for Synchronization**

When a user starts playing an audio file:

- Either manually or automatically, we send all the necessary data to the application server.
- Later, when the user switches devices or browsers, we retrieve this information to continue playback.
- We know the current audio files belong to a specific album or list, and from the **album ID**, we can determine which track should be played next or previous.

---

## **Storing Playback Position for Long Tracks**

Imagine a user listening to a long track like a podcast. They wouldn't want to start from the beginning every time.  
We can’t use **local storage** for saving this position, as users may switch devices. Therefore, the only option here is to **store it on the server side**.

#### **Considerations**:

- How often should we update this state?
- We can't do it too frequently as it would create a heavy load on our servers, yet we can’t do it too infrequently either.
- Possibly, we can send one request when a track is stopped for any reason.

---

## **Adapting the Application for Mobile Devices**

Mobile devices differ from desktops:

- Smaller screens
- Less powerful processors and memory

We must consider these specifics:

- **Don't download high-resolution images** on devices with small screens. Use the `srcset` and `picture` HTML elements to control which image to load.

#### **Touchscreen Considerations**:

- Mobile devices have **touchscreens**, which present both possibilities and limitations.
- Hover and focus events are not possible on touch screens, so we must find alternative ways to interact with the app.
- All interactive elements should be **large enough** to ensure the touch area is bigger than the visual size of the element.
- **Text content** should be large enough to be readable on small screens.

#### **Additional Mobile UI Considerations**:

- Avoid displaying wide banners, large decorative elements, etc., on small screens.
- The user experience should be centered on the **main content**.
- Use **CSS media queries** to create different versions of the user interface.
- Avoid aggressive preloading, as mobile devices typically have slower internet connections and limited data traffic.

---

## **Performance Optimizations**

Performance is a broad topic, and we can’t cover it all in detail. Here, we categorize it into **five areas**:

1. **Network**
2. **Images**
3. **Audio**
4. **UI**
5. **JavaScript and CSS**

We combine **JavaScript** and **CSS** together, as they are related to the code.

#### **Network**:

- Use **data compression** (e.g., `gzip`, `Brotli`, etc.).
- **Brotli** is a relatively new compression algorithm developed by Google. It is optimized for the web and generally achieves better compression ratios than **gzip**.
- **Gzip** is an older, well-established algorithm supported by virtually all modern browsers.

---

## **Image and Audio Optimization**

- **Lazy loading** for images: Download images only when they are needed.
- Use **modern media formats**:
  - **WebP** for images.
  - **WebM** for videos (although we haven't discussed video in detail, we prefer **WebM** for video).
- For audio, use modern codecs like **AAC** and **AV1**.

#### **Streaming Protocol**:

- We’re using the modern **DASH** streaming protocol, which allows us to stream audio files instead of downloading them, saving user storage space.

---

## **UI Improvements**

For elements that need to be fast:

- Use **skeletons** with a shimmer effect instead of a standard spinner.
- Smooth transitions like **fading**, **sliding**, or animations between screens and other interactive elements.

#### **Icons and Fonts**:

- Utilize **lightweight icon fonts** or **SVGs** for icons and buttons.
- Avoid loading **redundant fonts**.
- Limit font variations and symbols, downloading only what’s necessary.

#### **JavaScript Optimization**:

- Avoid **JavaScript animations** when possible.
- Avoid heavy computations on the client-side, opting for **web workers** or server-side processing.
- Reuse **DOM elements** instead of creating and removing them frequently.
- **Split the bundle** into chunks when using a single-page application.

---

## **CSS Best Practices**

- Prefer **CSS animations** for better performance.
- The safest animations in terms of performance are **opacity** and **transform**.
- Follow **naming conventions** like **BEM** or use approaches such as **CSS modules** or **styled components**.

---

## **Accessibility Considerations**

Some general recommendations for accessibility:

- Use **meaningful alt attributes** for all non-decorative images.
- Use appropriate **ARIA attributes** like `role` for interactive elements.
- Ensure all interactive elements are navigable via keyboard.
- Provide transcripts for **audio content** whenever possible.
- Clearly communicate **errors** both visually and through screen readers.

---

## **Internationalization**

To prepare for translating content:

- Predict the user’s locale using a combination of **Accept-Language HTTP header** and **IP address**, though users should be able to change it if needed.
- Ensure that the app can handle multiple languages, and carefully review the UI, especially interactive elements.

#### **Localization Tips**:

- **Pseudolocalization** helps test localization by using a fake language to identify translation issues.

#### **Formatting Considerations**:

- Avoid **string concatenation** as word order can change across languages.
- **Don't use text in images**, as it’s not scalable.
- Use **logical properties** instead of fixed directions.

---

## **Translation Methods**

When translating text, decide on:

- **Format**: JSON, Gettext, ICU
- **Translation Method**: TMS, internal translation team, external translation team, etc.

---

## **Translation Approach for Different Project Sizes**

| **Small Projects**                               | **Large Projects**                    |
| ------------------------------------------------ | ------------------------------------- |
| Translation Agencies & Freelancers (Medium Cost) | TMS (High Budget)                     |
| Translation Software/API (Medium Budget)         | Internal Translation Team (High Cost) |

---

## **Storing Translations**

Consider the following formats:

- **JSON**: Flexible, human-readable, but lacks advanced translation management features.
- **Gettext**: Well-established, supports features like pluralization and context, but has a steeper learning curve.
- **ICU**: The most powerful, but complex and best for projects with **complex translation requirements**.

---

## **Final Thoughts**

To conclude, we've covered:

- Functional and non-functional requirements.
- **Tools** for building the app, optimizations for the network, images, audio, and UI.
- **Internationalization**, **localization**, and **translation** strategies.
- Considerations for **mobile devices** and **accessibility**.

Remember, always aim to deliver a smooth and responsive experience while keeping the user's needs at the forefront.

---
