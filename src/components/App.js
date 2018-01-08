import React, {Component} from 'react';
// import {BrowserRouter as Router, Link} from 'react-router-dom';
import AppList from './AppList';

class App extends Component {
  componentDidMount() {
    console.log(`componentDidMount`)
  }
  
  render() {
    return (
      <div>
        <AppList/>
      </div>
    );
  }
}

export default App;
