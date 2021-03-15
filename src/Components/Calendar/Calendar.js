import React from 'react';
import DataLayer from '../../DataLayer/DataLayer';
import Controls from '../Header/Controls';
import Login from '../Login/Login';
import { LoginProvider } from '../Login/LoginContext';
import Table from '../Table/Table';

const datalayer = new DataLayer;
datalayer.getData(datalayer.eventsEntity, true);

export default function Calendar() {

  return (
    <LoginProvider>
      <Login/>
      <Controls/>
      <Table/>
    </LoginProvider>
  )
}
