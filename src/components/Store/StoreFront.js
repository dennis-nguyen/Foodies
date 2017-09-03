import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import StoreMap from './StoreFront/StoreMap';
import AddPhoto from './StoreFront/AddPhoto';
import Bookmark from './StoreFront/Bookmark';
import Order from './StoreFront/Order';

import StoreTitle from '../Shared/StoreTitle';
import StoreHours from '../Shared/StoreHours';
import StoreDescription from '../Shared//StoreDescription';
import Reviews from '../Shared/Reviews';
import Rating from '../Shared/Rating';
import Menu from '../Shared/Menu';
import helpers from '../utils/helpers'

class StoreFront extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customerOrder: [],
      storeId: '',
      sellerId: '',
      name: '',
      location: '',
      menu: [],
      hours: [],
      description: '',
      storeImage: '',
      reviews: [],
      isOpen: false,

    }

    this.addToOrder = this.addToOrder.bind(this);
  }

  componentDidMount() {
    // randy@test.com  sellerId is 59ab34d106e8a23b58e70560// password123 -> storeId is 59ab34d106e8a23b58e70561
    let sellerId = this.props.location.pathname.split('/')[2]
    helpers.getPublicStore(sellerId)
      .then((response) => {
        let storeData = response.data[0];
        this.setState({
          storeId: storeData._id,
          sellerId: storeData.sellerId,
          name: storeData.name,
          location: storeData.location,
          menu: storeData.menuItems,
          hours: storeData.hours,
          description: storeData.description,
          storeImage: storeData.storeImage,
          reviews: storeData.reviews,
          isOpen: storeData.isOpen,
        });
      })
  }

  addToOrder(order) {
    this.setState({
      customerOrder: this.state.customerOrder.concat(order)
    })
  }

  render() {
    return (
      <div className='container-store'>
        <div className='row'>
          <div className='col-12'>
            <StoreTitle title={ this.state.name } storeTitleStyle='h1' />
            <StoreDescription description={ this.state.description } storeDescriptionStyle='h6' />
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-lg-6 col-sm-12'>
            <img className='img-fluid rounded mt-3 mb-3' src={ this.state.storeImage } alt='Store' />
          </div>
          <div className='col-lg-6 col-sm-12'>
            <div className='row mb-3'>
              <Rating ratingStyle='rating col-12 mb-3' rating='4' numReviews='751' />
              { /* Need a field for rating and number of reviews*/ }
              <div className='store-front-link border'>
                <Link className='btn col-md-4 col-sm-12' to='/review'>
                <div><span style={ { color: 'gold', textShadow: '1px 1px goldenrod, 2px 2px #B57340, .1em .1em .2em rgba(0,0,0,.5)' } }>★</span>
                  { '\u00A0' } Write Review </div>
                </Link>
                <AddPhoto AddPhotoStyle='btn red col-md-4 col-sm-12' />
                <Bookmark BookmarkStyle='btn red col-md-4 col-sm-12' />
              </div>
            </div>
            <div className='row'>
              <StoreHours hours={ this.state.hours } storeHoursStyle='border col-12 mb-3' />
            </div>
          </div>
        </div>
        <hr />
        <div className='row justify-content-between'>
          <div className='col-md-6 col-sm-12'>
            <Menu menu={ this.state.menu } addToOrder={ this.addToOrder } menuStyle='border justify-content-center store-front-menu mt-3 p-3' />
          </div>
          <div className='col-md-6 col-sm-12'>
            <Order customerOrder={ this.state.customerOrder } orderStyle='border mt-3 order' />
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-12'>
            <Reviews reviews={this.state.reviews} />
          </div>
          <div className='col-12'>
            <StoreMap storeMapStyle='border d-flex flex-column align-items-center justify-content-center store-map mt-3' location={ this.state.location } />
          </div>
        </div>
      </div>
    )
  }
}

export default StoreFront;