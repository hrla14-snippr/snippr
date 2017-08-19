import React from 'react';
import PerfectListEntry from './PerfectListEntry';
import _ from 'underscore';

const PerfectList = (props) => {
  // Checks to see if the snyppr is certified and if they are within a certain range of extraversion
  const perfectSnypprs = [];
  _.each(props.snypprs, (snyppr) => {
    if (snyppr.personality && snyppr.certified) {
      (Math.abs(props.profile.personality - snyppr.personality) < 0.30) ? perfectSnypprs.push(snyppr) : null;
    }
  });

  return (
    <div className="entryholder">
      {perfectSnypprs.map(snyppr =>
        <PerfectListEntry key={snyppr.id} snyppr={snyppr} />,
      )}
    </div>
  );
};

export default PerfectList;
