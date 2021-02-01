import React from 'react';
import trash from '../../../images/trash-alt-solid.svg';
import check from '../../../images/check-solid.svg';
import { useHttp } from '../../../hooks/http.hook';

export const Task = ({ localItemRemover, item }) => {
  const { request } = useHttp();

  const statusChanger = async () => {
    console.log('@@@@@@@@@', item);
    try {
      item.checks = !item.checks;
      await request('app/todoApp/setTaskStatus', 'PUT', { id: item._id, value: item.checks });
    } catch (e) {
      console.log(e.message);
    }
  };

  const itemRemover = async () => {
    try {
      await request('app/todoApp/removeOne', 'DELETE', { id: item._id });
      localItemRemover(item._id);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={item.checks ? 'completed' : 'active'} id={item._id}>
      <div className="checkContainer">
        <img className="markIcon" src={check} alt={check} />
        <input
          className="checkbox"
          type="checkbox"
          checked={item.checks}
          onChange={statusChanger}
        />
      </div>
      <span className="textArea">
        {item.taskValue}
      </span>
      <span className="remSpan" onClick={itemRemover}>
        <img className="trashIcon" src={trash} alt={trash} />
      </span>
    </div>
  );
};
