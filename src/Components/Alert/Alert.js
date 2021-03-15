import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './Alert.scss';

export default function Alert() {
  return (
    <div className="Alert" id="alert">
          <FontAwesomeIcon icon={faExclamationCircle} />
          <span className="Alert__text"/>
          <FontAwesomeIcon className="Alert__close" icon={faTimesCircle} />
      </div>
  )
}
