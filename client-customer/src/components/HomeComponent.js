import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
      bannerIndex: 0, // Thêm trạng thái này để theo dõi hình ảnh banner hiện tại
      banners: ['7.jpg','5.jpg','6.jpg','8.jpg'] // Thêm mảng này với tên của các hình ảnh banner
    };
  }

  handlePrevClick = () => { // Thêm hàm này để xử lý khi nút mũi tên trái được nhấn
    this.setState(prevState => ({
      bannerIndex: (prevState.bannerIndex + prevState.banners.length - 1) % prevState.banners.length
    }));
  }

  handleNextClick = () => { // Thêm hàm này để xử lý khi nút mũi tên phải được nhấn
    this.setState(prevState => ({
      bannerIndex: (prevState.bannerIndex + prevState.banners.length + 1) % prevState.banners.length
    }));
  }

  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
            <figcaption className="text-center">{item.name}<br />Price: {item.price}</figcaption>
          </figure>
        </div>
      );
    });
  
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
            <figcaption className="text-center">{item.name}<br />Price: {item.price}</figcaption>
          </figure>
        </div>
      );
    });
  
    return (
      <div>
        <div className="banner-container">
          <button onClick={this.handlePrevClick} className="arrow-button left-arrow">&#9664;</button>
          <img src={process.env.PUBLIC_URL + '/' + this.state.banners[this.state.bannerIndex]} alt="Banner" />
          <button onClick={this.handleNextClick} className="arrow-button right-arrow">&#9654;</button>
        </div>
        <div className="align-center">
          <h2 className="text-center">NEW PRODUCTS</h2>
          {newprods}
        </div>
        {this.state.hotprods.length > 0 ?
          <div className="align-center">
            <h2 className="text-center">HOT PRODUCTS</h2>
            {hotprods}
          </div>
          : <div />}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }
  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}
export default Home;
