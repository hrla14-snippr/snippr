import React from 'react';
import PerfectListEntry from './PerfectListEntry';
import _ from 'underscore';

const PerfectList = (props) => {
  const perfectSnypprs = [];
  _.each(props.snypprs, (snyppr) => {
    if (snyppr.personality && props.certified) {
      (Math.abs(props.profile.personality - snyppr.personality) < 30) ? perfectSnypprs.push(snyppr) : null;
    };
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
