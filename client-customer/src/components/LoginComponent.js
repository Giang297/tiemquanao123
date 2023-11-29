  import axios from 'axios';
  import React, { Component } from 'react';
  import MyContext from '../contexts/MyContext';
  import withRouter from '../utils/withRouter';

  class Login extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
      super(props);
      this.state = {
        txtUsername: '',
        txtPassword: ''
      };
    }
    render() {
      return (
        <div className="align-center">
          <img
            src="https://phunugioi.com/wp-content/uploads/2020/11/hinh-dong-chu-soc-de-thuong.gif"
            width="80px"
            height="80px"
            alt=""
          />
          <h2 className="text-center">CUSTOMER LOGIN</h2>
          <form>
            <table className="align-center">
              <tbody>
              <tr>
                <td>Username</td>
                <td><input type="text" className="custom-input" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input type="password" className="custom-input" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><input type="submit" className="custom-button" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} /></td>
              </tr>
              </tbody>
            </table>
          </form>
        </div>
      );
    }
    // event-handlers
    btnLoginClick(e) {
      e.preventDefault();
      const username = this.state.txtUsername;
      const password = this.state.txtPassword;
      if (username && password) {
        const account = { username: username, password: password };
        this.apiLogin(account);
      } else {
        alert('Please input username and password');
      }
    }
    // apis
    apiLogin(account) {
      axios.post('/api/customer/login', account).then((res) => {
        const result = res.data;
        if (result.success === true) {
          this.context.setToken(result.token);
          this.context.setCustomer(result.customer);
          this.props.navigate('/home');
        } else {
          alert(result.message);
        }
      });
    }
  }
  export default withRouter(Login);