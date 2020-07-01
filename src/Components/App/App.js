import React, { Component } from 'react';
import './App.css';

import AddAppointments from '../AddAppointments/AddAppointments';
import SearchAppointments from '../SearchAppointments/SearchAppointments';
import ListAppointments from '../ListAppointments/ListAppointments';

import { without } from 'lodash';

class App extends Component {

  constructor() {
    super();
    this.state = {
      myAppointments: [],
      lastId: 0,
      showDisplay: false
    }

    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount() {
    fetch('./appointment_data.json')
      .then(response => response.json())
      .then(jsonResponse => {
        const appointments = jsonResponse.map(item => {
          item.aptId = this.state.lastId;
          this.setState({lastId: this.state.lastId + 1})
          return item;
        })
        this.setState({myAppointments: appointments});
      });

  }

  deleteAppointment(item) {
    let appts = this.state.myAppointments;
    appts = without(appts, item);
    console.log(appts);
    this.setState({myAppointments: appts});
  }

  toggleShow() {
    const oppositeDisplay = !this.state.showDisplay;
    this.setState({showDisplay: oppositeDisplay});
  }

  render() {
    return (

    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">

              <AddAppointments toggleShow={this.toggleShow} show={this.state.showDisplay} />
              <SearchAppointments />
              <ListAppointments appointments={this.state.myAppointments} deleteAppointment={this.deleteAppointment} />

            </div>
          </div>
        </div>
      </div>
    </main>     
      
    )
  }
}

export default App;
