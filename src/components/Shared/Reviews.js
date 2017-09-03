import React, { Component } from 'react';
import ReviewItem from './Reviews/ReviewItem';
import helpers from '../utils/helpers';

class Reviews extends Component {
  mapReviews() {
    return this.props.reviews.map((reviewItem, i) => {
      return <ReviewItem key={ i } rating={ reviewItem.rating } review={ reviewItem.review } />
    });
  }

  render() {
    return (
      <ul className='list-unstyled mt-3'>
        <strong>Current Reviews: </strong>
        { this.props.reviews ? this.mapReviews() : <li className='container-store border'><h6><strong>No Reviews Found </strong></h6></li> }
      </ul>
    )
  }
}

export default Reviews;