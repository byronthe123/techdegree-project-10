import React from 'react';

// Switch will redirect the user here if the route/course is not found:
export default () => (
  <div className="bounds">
    <h1>Not Found</h1>
    <p>Sorry! We couldn't find the page you're looking for.</p>
    <a className="button" href={`/`}>Back</a>
  </div>
);
