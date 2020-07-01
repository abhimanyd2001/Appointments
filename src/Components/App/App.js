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
      showDisplay: false,
      orderBy: 'aptDate',
      orderDirection: 'desc'
    }

    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
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

  addAppointment(item) {
    let currentAppointments = this.state.myAppointments;
    item.aptId = this.state.lastId;

    currentAppointments.unshift(item);

    this.setState({
      myAppointments: currentAppointments, lastId: this.state.lastId + 1
    });

    this.toggleShow();
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

    let order;
    let filteredAppointments = this.state.myAppointments;

    if (this.state.orderDirection === 'asc') {
      order = 1;
    }
    else {
      order = -1;
    }

    filteredAppointments.sort((a,b) => {
      if (a[this.state.orderBy] < b[this.state.orderBy]) {
        return -1  * order;
      }
      else {
        return 1 * order;
      }
    });

    return (

    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">

              <AddAppointments toggleShow={this.toggleShow} show={this.state.showDisplay} addAppointment={this.addAppointment} />
              <SearchAppointments orderBy={this.state.orderBy} orderDirection={this.state.orderDirection} handleOrderChange={this.handleOrderChange}/>
              <ListAppointments appointments={filteredAppointments} deleteAppointment={this.deleteAppointment} />

            </div>
          </div>
        </div>
      </div>
    </main>     
      
    )
  }
}

export default App;
