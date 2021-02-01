import React from 'react';

export const Footer = ({
  everyRemove, changeAll, filter, actives, setFilter,
}) => {
  const setNewFilter = (event) => {
    setFilter(event.target.name);
  };

  return (
    <div className="footer">
      <span className="selectAll" onClick={changeAll}>
        {actives}
        tasks left
      </span>
      <button type="button" className={filter === 'all' ? 'activeBtn' : 'sleepBtn'} name="all" onClick={setNewFilter}>
        all
      </button>
      <button type="button" className={filter === 'active' ? 'activeBtn' : 'sleepBtn'} name="active" onClick={setNewFilter}>
        active
      </button>
      <button type="button" className={filter === 'done' ? 'activeBtn' : 'sleepBtn'} name="done" onClick={setNewFilter}>
        done
      </button>
      <button type="button" className="removeAll" onClick={everyRemove}>remove completed</button>
    </div>
  );
};
