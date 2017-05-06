import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../components/PageElements/Header';
import Footer from '../components/PageElements/Footer';

class UserInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = { styles: [] };
  }

  componentDidMount() {
    const context = this;

    axios.get('/styles')
      .then(({ data }) => context.setState({ styles: data }))
      .catch(e => console.log('error fetching styles: ', e));
  }

  render() {
    return (
      <div>
        <Header />
        <div className="form-body">
          <form className="userinfo" onSubmit={this.props.submitUserInfo} >
            <div className="formheader"><h1>Tell Us More!</h1></div>
            <div className="inputbox">
              <div>
                <input type="text" name="fname" placeholder="First Name" required />
                <input type="text" name="lname" placeholder="Last Name" required />
              </div>
              <div>
                <input type="text" name="address" placeholder="Address" required />
              </div>
              {this.state.styles.map(({ style }, idx) => (
                <div className="hairstyles">
                  <label htmlFor={style}>
                    <input
                      type="checkbox"
                      id={idx + 1} name={style} value={style}
                    />
                    {style}
                  </label>
                </div>
              ))}
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

UserInfoForm.propTypes = {
  submitUserInfo: PropTypes.func.isRequired,
};

export default UserInfoForm;
