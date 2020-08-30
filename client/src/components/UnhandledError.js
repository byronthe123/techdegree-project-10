import React from 'react';

export default ({ context, history }) => (
  <div className="bounds">
    <h1>Unhandled Error!</h1>
    <p>Sorry, there was an error!</p>
    <button class="button" onClick={() => history.goBack()}>Go back</button>
  </div>
);
