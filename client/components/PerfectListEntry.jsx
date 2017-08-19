import React from 'react';
import { Link } from 'react-router-dom';
import { ChangeSnyppr } from '../actions/ChangeSnyppr.js';

const PerfectListEntry = (props) => {
  return (
    <Link to="/snypprProfile">
      <div onClick={() => props.ChangeSnyppr(props.snyppr)} className="snypprentry">
        <div className="entryimg">
          <img className="miniprofilepic" alt="placeholder" src={props.snyppr.profilepic ? props.snyppr.profilepic.url : 'https://timeforgeography.co.uk/static/img/avatar-placeholder.png'} height="50px" width="50px" />
        </div>
        <div>
          <h1 className="entryheader">{props.snyppr.fname} {props.snyppr.lname}</h1>
        </div>
      </div>
    </Link>
  );
};

export default PerfectListEntry;
