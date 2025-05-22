## How would you debug a blank page loading up on a website ?

- **Check browser console for errors**: Errors here can indicate issues with scripts that may be preventing the page from rendering
- **View Source/Network Tab**: Check the **page source** to see if the HTML is present but not rendering
- In the network tab, check if all the resources(CSS, JS, images) are loading correctly, (Look for 404 (Not Found) or 500(Server Error) status codes)
- **Disable Javascript**: Temporarily disable Javascript in your browser settings, if the page loads without javascript, the issue might be with the script or dependency.
- **Check for re-directs or meta tags**: Inspect if there are any meta-refresh tags or Javascript based redirects that might be causing issues
- **Test in different Browsers**: To check if the issue is cross browser specific.
- **Server-side cache**: Look at the server logs to identify any server-side errors
- **Check for CORS**: CORS issues can prevent resources from being loaded. So, look on the console.
- **Validate HTML/CSS**: Use validators like W3C Validator to check if there are significant HTML or CSS issues.
- **Check for SSL/TLS issues:** If your site is HTTPs, ensure the SSL certificate is valid and properly installed. Mixed content issues (HTTP content on an HTTPS page) can also cause problems
- **Check for Hoisting services**: If you're using a web hoisting service, check their status page for any ongoing issues and ensure if your domain is pointing to your host's servers.