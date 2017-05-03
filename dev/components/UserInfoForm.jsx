import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class UserInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = { styles: [] };
  }

  componentDidMount() {
    const context = this;

    axios.get('/styles')
      .then(({ data }) => context.setState({ styles: data.map(style => style.style) }))
      .catch(e => console.log('error fetching styles: ', e));
  }

  render() {
    return (
      <form onSubmit={this.props.submitUserInfo} >
        <input type="text" name="fname" placeholder="First Name" required />
        <input type="text" name="lname" placeholder="Last Name" required />
        <input type="text" name="address" placeholder="Address" required />
        {this.state.styles.map(style => (
          <label htmlFor={style}>
            <input type="checkbox" id={style} name={style} value={style} />
            {style}
          </label>
        ))}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

UserInfoForm.propTypes = {
  submitUserInfo: PropTypes.func.isRequired,
};

export default UserInfoForm;
