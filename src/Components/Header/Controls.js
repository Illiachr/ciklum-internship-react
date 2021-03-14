import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import "./Controls.scss";

export default function Controls() {
  const history = useHistory();

  const redirect = () => {
    history.push('/newEvent');
  }

  return (
    <div className="Controls">
          <div className="Controls__title-wrapper">
            <h2 className="title">Calendar</h2>
            <div className="Controls__title-warning" data-type="controls-warning">
              <FontAwesomeIcon icon={faSyncAlt} />
              <span className="Controls__title-warning-text" />
            </div>
          </div>
          <div id="filter" />
          <button onClick={redirect} type="button" className="btn active">
              <span>New event</span>
              <FontAwesomeIcon icon={faPlus} />
          </button>
    </div>          
  )
}
