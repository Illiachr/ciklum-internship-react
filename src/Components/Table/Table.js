import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { classes, eventHours, workWeek } from '../../auxiliary';
import './Table.scss';
import DataLayer from '../../DataLayer/DataLayer';

const dataLayer = new DataLayer();

const Cell = (props) => {
  const {dayId, time, isBooked, eventName, eventId} = props;
  const cellCls = ['cell', 'meeting-cell'];
  
  if (isBooked) { 
    cellCls.push('meeting-cell--bisy');
  } else { cellCls.push('js-modal-open'); }
  
  return (
  <div
      className={cellCls.join(' ')}
      data-day={dayId}
      data-time={time}
      data-event-id={eventId}
      data-modal="modal-event">
      <span className="name" data-type="event-name">{eventName}</span>
      <FontAwesomeIcon className="cancel-event" icon={faTimes}/>
  </div>
)};

Cell.propTypes = {
  dayId: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  isBooked: PropTypes.bool,
  eventName: PropTypes.string,
  eventId: PropTypes.string
};

Cell.defaultProps = {
  isBooked: false,
  eventName: '',
  eventId: ''
};

const TableHeader = () => { 
  const cells = workWeek.map(day => <div key={day.id} className="grid-header">{day.value}</div>)
  return (
    <div className="row-header">
      <div className="grid-header">Time</div>
      {cells}
    </div>)};

const Row = props => {
  const { time } = props;
  
  const cells = workWeek.map(day => {
    let setBooked = false;
    let name = '';
    let id = '';
    dataLayer.events.forEach(event => {
      if (day.id === event.day && time === +event.time) {
        setBooked = true;
        id = event.id;
        name = event.name;
      }
    });
    return (
      <Cell key={day.id} dayId={day.id} time={time} isBooked={setBooked} eventName={name} eventId={id}/>
    )
  });
  return (
    <div className="row-meeting" data-time={time}>
        <div className="cell time-cell">{time}:00</div>
        {cells}
    </div>
  )};

Row.propTypes = {
  time: PropTypes.number.isRequired
}

const Rows = () => {
  const arr = [];
  for (let hour = +eventHours.start; hour <= +eventHours.end; hour += +eventHours.step) {
    const row = <Row key={hour} time={hour}/>;
    arr.push(row);
  }
  return arr;
};

export default function Table() {
  const history = useHistory();
  const redirectNewEvent = () => history.push('/newEvent');

  const clickHandler = e => {
    const { target } = e;
    if (target.closest(`.${classes.triggerOpen}`)) {
      redirectNewEvent();
    }

    if (target.closest(`.${classes.confirm}`)) {
      const eventSlot = target.closest(`.${classes.slotBooked}`);
      if (eventSlot.dataset.eventId) {
        const id = eventSlot.dataset.eventId;
        dataLayer.removeData(dataLayer.eventsEntity, id);
      //   await confirm('event-remove')
      //     .then(() => this.dataLayer.removeData(this.dataLayer.eventsEntity, id));
      // } else { console.warn('event ID undefined'); 
      }
    }
  };

  return (
    <div 
      className="calendar-grid"
      onClick={clickHandler}
      onKeyPress={() => {}}
      role="button"
      tabIndex={0}
    >
      <TableHeader/>
      <Rows/>      
    </div>
  )
}
