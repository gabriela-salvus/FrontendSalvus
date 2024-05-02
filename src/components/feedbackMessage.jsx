/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';

function FeedbackMessage() {
  const message = useSelector(state => state.feedback.message);

  return (
    <div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FeedbackMessage;