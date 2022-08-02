import React from 'react';
import ResponseButton from '../response-button';
import ResponseType from './response-type';

import './styles.scss';

const ResponseContainer = ({
  action
}) => {
  var i = 15;
  return (
    <div className='response-container'>
      {ResponseType.map(type => {
        i = i - 5
        let e = i
        return (
          <ResponseButton
            key={type}
            name={type}
            action={() => action(e)}
            variant={'green'}
          />
        )
      })}
    </div>
  );
}

export default ResponseContainer;
