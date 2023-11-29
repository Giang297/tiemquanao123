import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';


class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="border-bottom info-container"> {/* Thêm class 'info-container' */}
        <div className="float-left">
          {this.context.token === '' ? (
            <div>
              <Link to='/login' className="btn-login">Login</Link> {/* Thêm class 'btn-login' */}
              {' | '}
              <Link to='/signup' className="btn-signup">Sign-up</Link> {/* Thêm class 'btn-signup' */}
            </div>
          ) : (
            <div>
              Hello <b>{this.context.customer.name}</b> |
              {' '}
              <Link to='/home' onClick={() => this.lnkLogoutClick()} className="btn-logout">Logout</Link> {/* Thêm class 'btn-logout' */}
              {' | '}
              <Link to='/myprofile' className="btn-profile">My profile</Link> {/* Thêm class 'btn-profile' */}
              {' | '}
              <Link to='/myorders' className="btn-myorders">My orders</Link> {/* Thêm class 'btn-myorders' */}
            </div>
          )}
        </div>
        <div className="float-right">
          <Link to='/mycart' className="btn-mycart">My cart</Link> have <b>{this.context.mycart.length}</b> items
        </div>
        <div className="float-clear" />
      </div>
    );
  }

  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;
