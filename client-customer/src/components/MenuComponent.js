import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
          <img className="logo" src={process.env.PUBLIC_URL + '/logo.jpg'} alt="Logo" /> {/* Thêm class "logo" vào đây */}
          <li className="menu">           
            <Link to='/'>
              Home
            </Link>
          </li>
            {cates}
          <li className="menu"><Link to='/gmap'>Gmap</Link></li>
          </ul>
        </div>
        <div className="float-right">
        <form className="search">
          <input type="search" placeholder="Enter keyword" className="keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
          <button type="submit" className="search-btn" onClick={(e) => this.btnSearchClick(e)}>SEARCH</button>
        </form>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);