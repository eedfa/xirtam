import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { compose, graphql } from 'react-apollo'
import { voteBoard } from '../../requests/graphqlRequests.js'
class Rating extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentRating: 0,
      newRating: 0,
      star1: 'rating-star full-star',
      star2: 'rating-star full-star',
      star3: 'rating-star full-star',
      star4: 'rating-star full-star',
      star5: 'rating-star full-star',
      halfRating: 50
    }
  }
  componentDidMount () {
    this.calculateRating()
  }
  calculateRating () {
    let rating = this.props.stars
    const ratingFloor = Math.floor(rating)
    for (let i = ratingFloor; i < 6; i++) {
      const idIndex = 'star' + i
      let newVal = {}
      newVal[idIndex] = 'rating-star empty-star'
      this.setState(newVal)
    }

    for (let i = ratingFloor; i > 0; i--) {
      const idIndex = 'star' + i
      let newVal = {}
      newVal[idIndex] = 'rating-star full-star'
      this.setState(newVal)
    }
    let newVal = {}
    const idIndex = 'star' + (ratingFloor + 1)
    newVal[idIndex] = 'rating-star half-star'
    this.setState(newVal)

    rating = (30 + 70 * (rating / 5.0))
    this.setState({ halfRating: rating })
  }
  onHoverRate (id) {
    for (let i = parseInt(id); i < 6; i++) {
      const idIndex = 'star' + i
      let newVal = {}
      newVal[idIndex] = 'rating-star empty-star'
      this.setState(newVal)
    }

    for (let i = parseInt(id); i > 0; i--) {
      const idIndex = 'star' + i
      let newVal = {}
      newVal[idIndex] = 'rating-star full-star'
      this.setState(newVal)
    }
  }
  rateBoard (rating) {
    this.props.voteBoard({ variables: {
      boardId: this.props.boardId,
      boardName: this.props.boardName,
      rating: rating
    } })
  }
  render () {
    return (
      <div className='Rating'>
        <Helmet>
          <style>
            {`
              :root{
                --half-rating: ${this.state.halfRating};
              }
            `}
          </style>
        </Helmet>
        <div class='rating-box' onMouseLeave={this.calculateRating.bind(this)}>
          <span id='star5' class={this.state.star5} onMouseOver={this.onHoverRate.bind(this, '5')} onClick={this.rateBoard.bind(this, 5)} /><br />
          <span id='star4' class={this.state.star4} onMouseOver={this.onHoverRate.bind(this, '4')} onClick={this.rateBoard.bind(this, 4)} /><br />
          <span id='star3' class={this.state.star3} onMouseOver={this.onHoverRate.bind(this, '3')} onClick={this.rateBoard.bind(this, 3)} /><br />
          <span id='star2' class={this.state.star2} onMouseOver={this.onHoverRate.bind(this, '2')} onClick={this.rateBoard.bind(this, 2)} /><br />
          <span id='star1' class={this.state.star1} onMouseOver={this.onHoverRate.bind(this, '1')} onClick={this.rateBoard.bind(this, 1)} /><br />
        </div>
      </div>
    )
  }
}

export default compose(graphql(voteBoard, { name: 'voteBoard' }))(Rating)
