import React from 'react';

// If the user tries to edit/delete a route that they don't own:
export default () => (
  <div className="bounds">
    <h1>Forbidden</h1>
    <p>Oh oh! You can't access this page.</p>
    <a className="button" href={`/`}>Back</a>
  </div>
);
