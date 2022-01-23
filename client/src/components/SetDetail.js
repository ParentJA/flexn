import React from 'react';
import { reduce } from 'lodash';

export default function SetDetail({ sets }) {
  const content = reduce(
    sets,
    (result, value, index) => {
      let text = `${value.min_reps}-${value.max_reps} reps`;
      if (result.length > 0) {
        text = result + ', ' + text;
      }
      if (index === sets.length - 1) {
        text = text + ` (${value.training_type})`;
      }
      return text;
    },
    ''
  );

  return (
    <span>
      {sets.length} sets &ndash; {content}
    </span>
  );
}
