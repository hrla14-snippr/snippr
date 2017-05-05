import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ChangeSnyppr } from '../actions/ChangeSnyppr';

const SnypprEntry = (props) => {
  console.log(props, 'this is snypprentry');
  return (
    <Link to="/snypprProfile">
      <div onClick={() => props.ChangeSnyppr(props.snyppr)} className="snypprentry">
        <div>
          <image src="http://fuuse.net/wp-content/uploads/2016/02/avatar-placeholder.png" />
        </div>
        <div>
          <h1 className="entryheader">{props.snyppr.fname} {props.snyppr.lname}</h1>
        </div>
        <div>Average ratings</div>
      </div>
    </Link>
  );
};

SnypprEntry.propTypes = {
  snyppr: PropTypes.shape.isRequired,
  ChangeSnyppr: PropTypes.func.isRequired,
};


export default connect(null, { ChangeSnyppr })(SnypprEntry);
