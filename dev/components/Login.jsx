import React from 'react';
import PropTypes from 'prop-types';

const Login = props =>
  (
    <div>
      <button onClick={props.login}>Login</button>
    </div>
  );

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
