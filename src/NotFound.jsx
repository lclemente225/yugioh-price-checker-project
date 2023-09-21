// NotFound.js

import React, { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    // Redirect to the previous page after a delay
    const previousPage = document.referrer || '/';
    setTimeout(() => {
      window.location.href = previousPage;
    }, 5000); // Redirect after 5 seconds
  }, []);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>We couldn't find the page you were looking for.</p>
      <p>Redirecting you back to the previous page...</p>
    </div>
  );
};

export default NotFound;
