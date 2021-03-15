import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLogin } from '../Login/LoginContext';
import { eventHours, workWeek } from '../../auxiliary';
import './Table.scss';
import DataLayer from '../../DataLayer/DataLayer';

const dataLayer = new DataLayer();

const Cell = (props) => {
  const {dayId, time, isSelected} = props;
  const cellCls = ['cell', 'meeting-cell', 'js-modal-open'];
  
  const history = useHistory();
  const redirect = () => history.push('/newEvent');
  const onKeyPressHandler = () => {};
  if (isSelected) { cellCls.push('meeting-cell--bisy'); }
  
  return (
  <div
      className={cellCls.join(' ')}
      onClick={redirect}
      onKeyPress={onKeyPressHandler}
      role="button"
      tabIndex={0}
      data-day={dayId}
      data-time={time}
      data-modal="modal-event">
      <span className="name" data-type="event-name" />
      <FontAwesomeIcon className="cancel-event" icon={faTimes}/>
  </div>
)};

Cell.propTypes = {
  dayId: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  isSelected: PropTypes.bool
};

Cell.defaultProps = {
  isSelected: false
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
    let isCell = false;
    dataLayer.events.forEach(event => {
      if (day.id === event.day && time === +event.time) {
      isCell = true;
    }
    });
    return (
      <Cell key={day.id} dayId={day.id} time={time} isSelected={isCell}/>
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
  const ctxLogin = useLogin();
console.log(ctxLogin);
  return (
    <div className="calendar-grid">
      <TableHeader/>
      <Rows/>      
    </div>
  )
}
