import React from 'react';
import PropTypes from 'prop-types';

const UserInfoForm = props =>
  (
    <form onSubmit={props.submitUserInfo} >
      <input type="text" name="fname" placeholder="First Name" required />
      <input type="text" name="lname" placeholder="Last Name" required />
      <input type="text" name="address" placeholder="Address" required />
      <label htmlFor="style1">
        <input type="checkbox" id="style1" name="style1" value="caesar" />
        Caesar
      </label>
      <label htmlFor="style2">
        <input type="checkbox" id="style2" name="style2" value="lineup" />
        Lineup
      </label>
      <label htmlFor="style3">
        <input type="checkbox" id="style3" name="style3" value="undercut" />
        Undercut
      </label>
      <input type="submit" value="Submit" />
      {/* hardcode the styles here mapped to checkboxes */}
    </form>
  );

UserInfoForm.propTypes = {
  submitUserInfo: PropTypes.func.isRequired,
};

export default UserInfoForm;
