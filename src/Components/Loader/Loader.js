import React from 'react';
import { useHistory } from 'react-router-dom';
import DataLayer from '../../DataLayer/DataLayer';
import Emitter from '../../Emitter';
import './Loader.scss';

const dataLayer = new DataLayer();
dataLayer.getData(dataLayer.usersEntity, true);

export default function Loader() {
  const cls = ['lds-ring'];
  const history = useHistory();
  const emitter = new Emitter;
  emitter.subscribe(`${dataLayer.usersEntity}:load`, () => {
    history.push('/calendar');
  });
  
  return (
    <div className={cls.join(' ')}>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  )
}
