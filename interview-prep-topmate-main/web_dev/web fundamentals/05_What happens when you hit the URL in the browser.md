### What happens when you hit the URL in the browser and press enter ?

<img src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*i8mDB12GxyGeEykm2qTVHQ.png">

<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*Z4BvX2t3LkN736T1b45hRg.png">

#### 1. Type www.google.com into the address bar of your browser.

#### 2. The <u>**_browser checks the cache for a DNS record_**</u> to find the corresponding IP address of www.google.com

- DNS(Domain Name System) is a <u>**_database that maintains the name of the website(URL) and the particular IP address_**</u> it links to.
- Every single URL on the internet has a unique IP address assigned to it, So if you'd like you can reach www.google.com by typing http://IP_Address on your browser.
- The primary purpose of DNS is human friendly navigation. you can easily access a website by typing the correct IP address. Instead of we remembering the correct IP address DNS helps out us by mapping the website name to the correct IP.

### <u>To find the DNS record, the browser checks four caches:</u>

- #### First it checks the browser cache:

  - The **_browser maintains a repository of DNS records_** for a fixed duration for websites you have previously visited.
  - So it is the first place to run a DNS query.

- #### Second, the browser checks the OS cache:

  - If it is **_not_** in the browser cache, <u>**_the browser will make a system call (i.e., gethostname on Windows)_**</u> to your underlying computer OS <u>**_to fetch the record since the OS also maintains a cache_**</u> of DNS records.

- #### Third, it checks the router cache:

  - If it's not on your computer, <u>**_the browser will communicate with the router_**</u> that maintains it's own cache of DNS records

- #### Fourth, it checks the ISP cache:

  - If all steps are fail, the browser will move on to the ISP.
  - Your ISP maintains it's own server, which includes a cache of DNS records, which the browser would check with the last hope of finding your requested URL.

#### 3. If the requested URL is <u>not in the cache</u>, <i><u>ISP's DNS server initiates a DNS query to find the IP address of the server</u></i> that hosts www.google.com

- The purpose of a <u>**_DNS query is to search multiple DNS servers on the internet_**</u> until it finds the correct IP address for the website.

#### 4. The browser initiates a TCP connection with the server.

- Once the browser receives the correct IP address, **_it will build a connection with the server_** that matches the IP address to transfer information.
- <i><u>Browsers use internet protocols to build such connections</u></i>
- There are several different internet protocols that can be used, but **_TCP is the most common protocol used for many types of HTTP requests._**
- <u>**_To transfer data packets_**</u> between your computer (Client) and the server, it is important to **_have a TCP connection established_**.
- <u>_This connection is established using a process called the ***TCP/IP three way handshake***._</u>
- **_<u>This is a three step process where the client and the server exchange SYN(synchronize) and ACK(acknowledge) messages to establish a connection.</u>_**

  1. The **_client_** machine **_sends a SYN packet_** to the server over the internet, asking if it is open for new connections
  2. **If the server has open ports** that can accept and initiate new connections, <u>**_it'll respond with an acknowledgement of the SYN packet_**</u> using a SYNC/ACK packet.
  3. The client will receive the SYN/ACK packet from the server and will acknowledge it by sending an ACK packet.

  ##### <u>Then a TCP connection is established for data transmission</u>

#### 5. The browser sends an HTTP request to the web server.

- Once the TCP connection is established, it is time to start transferring data!
- The browser will send a GET Request asking for maps.google.come web page.
- If you're entering credentials or submitting a form, this could be a POST request.
- This **request also contains additional info** such as <u>**_browser identification (User-Agent header), types of requests that it will accept (Accept header) and connection headers asking it to keep the TCP connection alive for additional requests_**.</u>
- It will also pass information taken from Cookies (browser has in store for this domain).

#### 6. The server handles the request and sends back a response.

- The **_server contains a web server_** (i.e., Apache, IIS) that receives the request from the browser and **_passes it to a request handler to read and generate a response_**.
- The **_request handler is a program_** that reads the request, it's headers and cookies to check what is being requested and also update the info on the sever if needed.
- Then **_it will assemble a response in a particular format_** (JSON, XML, HTML)

#### 7. The server sends out an HTTP response.

- <u>**_The server response contains the web page you requested as well as the status code, compression type (Content Encoding), how to cache the page (Cache-Control) any cookies to set, privacy information etc._**</u>

<img src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*iPLwac2pCnVSGxlG.png">

#### 8. The browser displays the HTML content (for HTML responses which is the most common )

- The browser displays the HTML content in phases
- **First** it \*will **\*render the bare bone HTML skeleton\*\***
- Then **_it will check the HTML tags and send out GET requests for additional elements on the web page_**, such as images, CSS stylesheets, JS files.
- <u>**_These static files are cached by the browser so it doesn't have to fetch them again the next time you visit the page_**</u>. In the end, you'll see www.google.com appearing on your browser.
