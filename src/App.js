import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.renderDog = this.renderDog.bind(this);
    this.fetchDog = this.fetchDog.bind(this);
    this.saveDog = this.saveDog.bind(this);
    this.state = {
      isLoading: true,
      lastDog: '',
      listOfDogs: [],
    }
  }

  async fetchDog() {
    this.setState({ isLoading: true }, async () => {
      const endpoint = 'https://dog.ceo/api/breed/shihtzu/images/random';
      const requestReturn = await fetch(endpoint);
      const requestResponse = await requestReturn.json();
      this.setState({
        isLoading: false,
        lastDog: requestResponse
      })
    })
  }

  componentDidMount() {
    this.fetchDog();
  }

  renderDog() {
    const { lastDog } = this.state;
    return (
      <div>
        <img src={lastDog.message} alt="" />
        <button onClick={this.saveDog}>Nova foto</button>
      </div>
    );
  }

  saveDog() {
    this.setState(({ listOfDogs, lastDog }) => ({
      listOfDogs: [...listOfDogs, lastDog]
    }))
    this.fetchDog();
  }

  render() {
    const { isLoading, listOfDogs } = this.state;
    const loadingElement = <p>Loading...</p>
    return (
      <div className="App">
        <span>
          {listOfDogs.map(({ message }) => <img src={message} alt=""></img>)}
        </span>
        {isLoading ? loadingElement : this.renderDog()}
      </div>
    );
  }
  
}

export default App;
