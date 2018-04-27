import React, { Component } from 'react'
import LazyLoad from 'react-lazyload';
import axios from 'axios'

class App extends Component {
  constructor () {
    super()
    this.state = {
      photos: [],
      isLoading: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({
      photos: [],
      isLoading: true
    });

    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => this.setState({photos: response.data}))
  }

  swapPhoto (event, photoUrl) {
    event.currentTarget.src = photoUrl;
  }

  render () {
    var isEmpty = this.state.photos.length === 0;

    if (isEmpty && this.state.isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className='button__container'>
        <button className='button' onClick={this.handleClick}>Load Photos</button>
        {this.state.photos.map(photo =>
          <p>
            <LazyLoad height={150} offset={100}>
              <img id={"photo-" + photo.id} src={photo.thumbnailUrl}
                onClick={(e) => this.swapPhoto(e, photo.url)} />
            </LazyLoad>
          </p>
        )}
      </div>
    )
  }
}
export default App
