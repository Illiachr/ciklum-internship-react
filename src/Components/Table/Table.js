import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { eventHours, workWeek } from '../../auxiliary';
import './Table.scss';

const TableHeader = () => { 
  const cells = workWeek.map(day => <div key={day.id} className="grid-header">{day.value}</div>)
  return (<div className="row-header">
        <div className="grid-header">Time</div>
        {cells}
      </div>)};

const Row = props => {
  // eslint-disable-next-line react/prop-types
  const { time } = props;
  const cellCls = ['cell', 'meeting-cell', 'js-modal-open'];
  const cells = workWeek.map(day => (
    <div key={day.id} className={cellCls.join(' ')} data-day={day.id} data-time={time} data-modal="modal-event">
            <span className="name" data-type="event-name" />
            <FontAwesomeIcon className="cancel-event" icon={faTimes}/>
        </div>
  ));
  return (
    <div className="row-meeting" data-time={time}>
        <div className="cell time-cell">{time}:00</div>
        {cells}
    </div>
  )};

const Rows = () => {
  const arr = [];
  for (let hour = +eventHours.start; hour <= +eventHours.end; hour += +eventHours.step) {
    const row = <Row key={hour} time={hour}/>;
    arr.push(row);
  }
  return arr;
};

export default function Table() {
  return (
    <div className="calendar-grid">
      <TableHeader/>
      <Rows/>      
    </div>
  )
}
