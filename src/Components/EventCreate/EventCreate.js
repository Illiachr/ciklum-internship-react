import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { eventHours, workWeek } from '../../auxiliary';
import { getTimeTable } from '../../utils';

const DayOption = props => {
  const  { optValue , optText } = props;
  return <option value={optValue}>{optText}</option>
};

DayOption.propTypes = {
  optValue: PropTypes.string.isRequired,
  optText: PropTypes.string.isRequired
};

export default function EventCreate() {
  const timeTable = getTimeTable(eventHours);
  const dayOptions = workWeek.map(day => <DayOption key={day.id} optValue={day.id} optText={day.value} />);
  const timeOptions = timeTable.map(time => <DayOption key={time.id} optValue={time.id} optText={time.value} />);

  const history = useHistory();
  const redirect = () => history.push('/');
  const onSubmitHandler = e => {
    e.preventDefault();
    const body = {}
    const formData = new FormData(e.target);
    formData.forEach((val, key) => {
      body[key] = val
    });
    console.log(body);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <h1>New Event</h1>
      <label htmlFor="eventName">
        Event name:
        <input type="text" id="eventName" name="eventName"/>
      </label>
      <label htmlFor="participants">
        Participants:
        <input type="text" id="participants" name="participants"/>
      </label>
      <label htmlFor="day">
        Day:
        <select type="text" id="day" name="day">
          <option value="no">Choose day</option>
          {dayOptions}
        </select>
      </label>
      <label htmlFor="time">
        Time:
        <select type="text" id="time" name="time">
          <option value="no">Choose time</option>
          {timeOptions}
        </select>
      </label>
      <button type="submit" className="btn">Create</button>
      <button type="button" onClick={redirect} className="btn">Cancel</button>
    </form>
  )
}
