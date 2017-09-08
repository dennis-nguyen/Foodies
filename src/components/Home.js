import React, { Component } from 'react';
import Search from './Homepage/Search';
import Image from './Homepage/Image';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      secretData: '',
      value: ''
    };
  }

  componentDidMount() {
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert(`A location was submitted: ${this.state.value}`);
    event.preventDefualt();
  }

  render () {
    return (
      <div className="img-fluid rounded"
        style={{backgroundImage:"url('https://s-media-cache-ak0.pinimg.com/originals/36/62/29/366229e72efbb7aadf3c8361864d6c5a.jpg')",
                width: "100%",
                height: "600px",
                backgroundPosition: "center", 
                backgroundSize: "cover"}} alt="Home Image"> 

        <h1 className="text-center" 
            style={{color:"white",
            fontFamily: "Lobster Two, cursive",
            fontSize: 200}}>Foodies</h1>
        {/* Name of the App- still being decided "Foodies" */}
      <Search 
        value={this.state.value}
        onChangeValue={this.handleChange}
        onSubmit={this.handleSubmit}
      />
      <Image />
      </div>
    );
  }
}

export default Home;