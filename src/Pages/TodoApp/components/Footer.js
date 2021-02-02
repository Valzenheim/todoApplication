import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';

export default function Footer(props) {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const { filter } = props;

  const setFilter = (event) => {
    props.setFilter(event.target.name);
  };

  const changeAll = async (event) => {
    await request('/app/todoApp/changeEveryOneStatus', 'put', { boo: event.target.checked }, {
      Authorization: `Bearer ${token}`,
    });

    props.changeAll(event.target.checked);
  };

  return (
    <div className="footer">
      <span className="selectAll" onClick={changeAll}>tasks left</span>
      <button type="button" className={filter === 'all' ? 'activeBtn' : 'sleepBtn'} name="all" onClick={setFilter}>
        all
      </button>
      <button type="button" className={filter === 'active' ? 'activeBtn' : 'sleepBtn'} name="active" onClick={setFilter}>
        active
      </button>
      <button type="button" className={filter === 'done' ? 'activeBtn' : 'sleepBtn'} name="done" onClick={setFilter}>
        done
      </button>
      <button type="button" className="removeAll">remove completed</button>
    </div>
  );
}
