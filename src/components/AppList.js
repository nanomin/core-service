import React, {Component} from 'react';

class AppList extends Component {

  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    console.log('component did mount');
    fetch('/app/list2')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({data: data});
      })
      .catch(err => console.log(err));
  }

  render() {
    const {data} = this.state;
    return (
      data ? (
        <ul>
          {data.map(ele => {
            return <li className={ele}>{ele}</li>;
          })}
        </ul>) : (
        <div>Loading...</div>)
    );
  }
}

export default AppList;