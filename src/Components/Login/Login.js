import React from 'react';
import PropTypes from 'prop-types';
import DataLayer from '../../DataLayer/DataLayer';
import { useLogin } from './LoginContext';
import './Login.scss';

const dataLayer = new DataLayer();

const SelectOption = props => {
  const  { optValue , optText, optRole } = props;
  return <option value={optValue}>{optText} {optRole}</option>
};

SelectOption.propTypes = {
  optValue: PropTypes.string.isRequired,
  optText: PropTypes.string.isRequired,
  optRole: PropTypes.string.isRequired,
};

export default function Login() {

  const ctx = useLogin();
  if (!ctx.visible) { return null; }

  const users = dataLayer.users.map(user => <SelectOption key={user.id} optValue={user.id} optText={user.value} optRole={user.role}/>);

  const clickHandler = () => {
    ctx.hide();
  }

  const selectHandler = e => {
    const userId = e.target.value;
    const userCurr = dataLayer.users.find(user => user.id === userId);
    ctx.userLogin(userCurr)
  }

  return (
    <div className="modal modal--s" id="login">
        <div className="modal__dialog">
            <div className="modal__dialog-header">
                <div className="modal__dialog-header-content">
                    <h4>Please autorize</h4>
                </div>
            </div>
            <div className="modal__dialog-body">
                <select onBlur={selectHandler} id="user-select">
                  <option value="no">Choose user...</option>
                  { users }
                </select>
            </div>
            <div className="modal__dialog-footer">
                <button onClick={clickHandler} name="login" type="button" className="js-modal-submit btn">Login</button>
            </div>
        </div>
    </div>
  )
}
