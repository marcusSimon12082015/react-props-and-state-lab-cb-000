import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChange = (event) => {
      this.setState({filters:{...this.state.filters,type:event.target.selected}});
  }

  handlePets = () => {
    const API = '/api/pets';
    const selectedVal = this.state.filters.type;
    var fetchAPI = '';
    if (selectedVal === 'all') {
      fetchAPI = API;
    } else {
      fetchAPI = API + '?type=' + selectedVal;
    }
    fetch(fetchAPI).then(response => response.json).then(data => this.setState({pets:data}));
  }

  handleAdopt = () => {

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChange} filters={this.state.filters.type} onFindPetsClick={this.handlePets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdopt}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
