/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { eventHours, workWeek } from '../../auxiliary';
import { getTimeTable } from '../../utils';
import DataLayer from '../../DataLayer/DataLayer';
import './EventCreate.scss'
import Alert from '../Alert/Alert';

const dataLayer = new DataLayer();

const SelectOption = props => {
  const  { optValue , optText } = props;
  return <option value={optValue}>{optText}</option>
};

SelectOption.propTypes = {
  optValue: PropTypes.string.isRequired,
  optText: PropTypes.string.isRequired
};

export default function EventCreate() {
  const timeTable = getTimeTable(eventHours);
  const dayOptions = workWeek.map(day => <SelectOption key={day.id} optValue={day.id} optText={day.value} />);
  const timeOptions = timeTable.map(time => <SelectOption key={time.id} optValue={time.id} optText={time.value} />);
  const usersOptions = dataLayer.users.map(user => <SelectOption key={user.id} optValue={user.id} optText={user.value} />);

  const history = useHistory();
  const redirect = () => history.push('/calendar');
  const onSubmitHandler = async e => {
    e.preventDefault();
    const body = {}
    const formData = new FormData(e.target);
    formData.forEach((val, key) => {
      body[key] = val
      if (key === 'participants') {
        if (val === 'all') {
          body[key] = dataLayer.users;
        } else { body[key] = [dataLayer.users.find(user => user.id === val)]; }
      }
    });
    await dataLayer.storeData(dataLayer.eventsEntity, body);
    redirect();
  };

  return (
    <form className="form__controls" onSubmit={onSubmitHandler}>
      <h1>New Event</h1>
      <Alert/>
      <div className="form__controls-wrapper">
        <label htmlFor="name">Event name:</label>
        <input type="text" id="name" name="name"/>
      </div>
      <div className="form__controls-wrapper">
        <label htmlFor="participants">Participants:</label>
        <select type="text" id="participants" name="participants">
            <option value="all">All members</option>
            {usersOptions}
        </select>
      </div>
      <div className="form__controls-wrapper">
        <label htmlFor="day">Day:</label>
        <select type="text" id="day" name="day">
            <option value="no">Choose day</option>
            {dayOptions}
        </select>
      </div>
      <div className="form__controls-wrapper">
      <label htmlFor="time">Time:</label>
      <select type="text" id="time" name="time">
          <option value="no">Choose time</option>
          {timeOptions}
      </select>
      </div>  
      <div className="form__controls-wrapper">
        <button type="submit" className="btn">Create</button>
        <button type="button" onClick={redirect} className="btn">Cancel</button>
      </div>
    </form>
  )
}
