import React from 'react';
import './styles.scss';

const ResponseButton = ({
  name,
  action,
  variant
}) => {
  return (
    <div className={`response-button ${variant}`} onClick={action}>
      {name}
    </div>
  );
}

export default ResponseButton;
