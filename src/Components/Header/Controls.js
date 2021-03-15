import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import "./Controls.scss";

export default function Controls() {
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
          <button type="button" className="btn active js-modal-open" data-type="add-event" data-modal="modal-event">
              <span>New event</span>
              <FontAwesomeIcon icon={faPlus} />
          </button>
    </div>          
  )
}
