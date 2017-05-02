import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

const Login = props =>
  (
    <div>
      <Menu pointing secondary>
        <Menu.Item name="home" />
        <Menu.Menu position="right">
          <Menu.Item name="log in" onClick={props.login} />
        </Menu.Menu>
      </Menu>
    </div>
  );

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
