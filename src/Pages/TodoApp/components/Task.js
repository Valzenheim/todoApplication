import React from 'react';
import trash from '../../../images/trash-alt-solid.svg';
import check from '../../../images/check-solid.svg';

export default function Task({ item }) {
  return (
    <div className={item.checks ? 'completed' : 'active'} id={item._id}>
      <label className="checkContainer">
        <img className="markIcon" src={check} alt={check} />
        <input className="checkbox" type="checkbox" checked={item.checks} />
      </label>
      <span className="textArea">{item.taskValue}</span>
      <span className="remSpan">
        <img className="trashIcon" src={trash} alt={trash} />
      </span>
    </div>
  );
}
