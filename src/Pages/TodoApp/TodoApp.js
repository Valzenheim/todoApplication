import React, {
  useState, useContext, useCallback, useEffect,
} from 'react';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../Context/AuthContext';
import Task from './components/Task';
import Footer from './components/Footer';
import Header from './components/Header';
import './styles/style.css';

export default function TodoApp() {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [taskArray, setTaskArray] = useState([]);
  const [form, setForm] = useState('');
  const [filtration, setFiltration] = useState('all');

  const fetchTasks = useCallback(async () => {
    const fetched = await request('/app/todoApp/getList', 'GET', null, {
      Authorization: `Bearer ${token}`,
    });
    return setTaskArray(fetched);
  }, [token, request]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const formHandler = (event) => {
    setForm(event.target.value);
  };

  const changeFilter = (filter) => {
    setFiltration(filter);
  };

  const setEveryOneStatus = (complete) => {
    const oldTasks = taskArray;

    oldTasks.map((item) => item.checks = complete);

    return setTaskArray(oldTasks);
  };

  const addingNewTask = async () => {
    const data = await request('/app/todoApp/newTask', 'POST', { value: form }, {
      Authorization: `Bearer ${token}`,
    });

    const tasks = taskArray;

    tasks.push(data);

    setTaskArray(tasks);

    setForm('');
  };

  const taskRender = () => {
    let tasks = [];

    if (filtration === 'all') {
      tasks = taskArray;
    } else if (filtration === 'active') {
      tasks = taskArray.filter((x) => !x.checks);
    } else if (filtration === 'done') {
      tasks = taskArray.filter((x) => x.checks);
    }

    return tasks.map((item) => (
      <Task item={item} key={item._id} />
    ));
  };

  return (
    <div className="App">
      <Header />
      <div className="formContainer">
        <div
          className="appForm"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              addingNewTask();
            }
          }}
        >
          <input
            type="text"
            className="formInput"
            placeholder="Enter your task name here"
            value={form}
            onChange={formHandler}
          />
        </div>
      </div>
      <div className="section">
        {taskRender()}
      </div>
      <Footer
        filter={filtration}
        setFilter={changeFilter}
        changeAll={setEveryOneStatus}
      />
    </div>
  );
}
