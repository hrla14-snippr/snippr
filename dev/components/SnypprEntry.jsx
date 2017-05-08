import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ChangeSnyppr } from '../actions/ChangeSnyppr';

const SnypprEntry = props => (
  <Link to="/snypprProfile">
    <div onClick={() => props.ChangeSnyppr(props.snyppr)} className="snypprentry">
      <div className="entryimg">
        <img alt="placeholder" src="https://timeforgeography.co.uk/static/img/avatar-placeholder.png" height="50px" width="50px" />
      </div>
      <div>
        <h1 className="entryheader">{props.snyppr.fname} {props.snyppr.lname}</h1>
      </div>
      <div>Average ratings</div>
    </div>
  </Link>
  );

SnypprEntry.propTypes = {
  snyppr: PropTypes.shape.isRequired,
  ChangeSnyppr: PropTypes.func.isRequired,
};


export default connect(null, { ChangeSnyppr })(SnypprEntry);
