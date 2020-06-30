import React, { Component } from 'react';
import './App.css';

import AddAppointments from '../AddAppointments/AddAppointments';
import SearchAppointments from '../SearchAppointments/SearchAppointments';
import ListAppointments from '../ListAppointments/ListAppointments';

class App extends Component {

  constructor() {
    super();
    this.state = {
      myName: 'Abhimanyu'
    }
  }
  render() {
    return (

    <main class="page bg-white" id="petratings">
      <div class="container">
        <div class="row">
          <div class="col-md-12 bg-white">
            <div class="container">

              <AddAppointments />
              <SearchAppointments />
              <ListAppointments />

            </div>
          </div>
        </div>
      </div>
    </main>     
      
    )
  }
}

export default App;
