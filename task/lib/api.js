// Simulated API calls with localStorage
const mockAPI = {
    login: (credentials) => new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('authToken', 'demo-token');
        resolve({ success: true });
      }, 1500);
    }),
  
    signup: (data) => new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('tempUser', JSON.stringify(data));
        resolve({ success: true });
      }, 1500);
    }),
  
    verifyOTP: (code) => new Promise((resolve, reject) => {
      setTimeout(() => {
        code === '1234' 
          ? resolve({ success: true }) 
          : reject({ error: 'Invalid code' });
      }, 1000);
    }),
  };
  
  export default mockAPI;