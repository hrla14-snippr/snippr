import React from 'react';
import PropTypes from 'prop-types';

const SnypprEntry = (props) => {
  console.log(props, 'this is snypprentry');
  return (
    <div role="button" onClick={() => props.changeSnyppr(props.snyppr)} className="snypprentry">
      <div>
        <image src="http://fuuse.net/wp-content/uploads/2016/02/avatar-placeholder.png" />
      </div>
      <div className="entryname">
        <h1>{props.snyppr.fname} {props.snyppr.lname}</h1>
      </div>
      <div>Average ratings</div>
    </div>
  );
};


SnypprEntry.propTypes = {
  snyppr: PropTypes.shape.isRequired,
  changeSnyppr: PropTypes.func.isRequired,
};

export default SnypprEntry;
