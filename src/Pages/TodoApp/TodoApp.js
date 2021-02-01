import React, { useState, useCallback, useEffect } from 'react';
import { Task } from './components/Task';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import './styles/style.css';
import { useHttp } from '../../hooks/http.hook';

export const TodoApp = () => {
  const { request } = useHttp();
  const [taskArray, setTaskArray] = useState([]);
  const [form, setForm] = useState('');
  const [filtration, setFiltration] = useState('all');

  const fetchTasks = useCallback(async () => {
    const fetched = await request('/app/todoApp/getList', 'GET');
    setTaskArray(fetched);
  }, [request]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const formHandler = (event) => {
    setForm(event.target.value);
  };

  const changeFilter = (filter) => {
    setFiltration(filter);
  };

  const setEveryOneStatus = async () => {
    console.log('@@@@@@@@@@', 123123123);
    const oldTasks = taskArray;
    let newStatus = Boolean;
    oldTasks.filter((x) => !x.checks).length > 0
      ? newStatus = true
      : newStatus = false;

    oldTasks.forEach((item) => item.checks = newStatus);
    return setTaskArray(oldTasks);
  };

  const localItemRemover = (item) => {
    const tasks = taskArray.filter((x) => x._id !== item);
    setTaskArray(tasks);
  };

  const addingNewTask = async () => {
    if (!/[0-9a-zA-Zа-яёА-ЯЁ]/i.test(form)) {
      return null;
    }
    const data = await request('app/todoApp/newTask', 'POST', { value: form });
    const tasks = taskArray;
    tasks.push(data);
    setTaskArray(tasks);
    return setForm('');
  };

  const everyOneRemover = async () => {
    await request('app/todoApp/removeAllOfDone', 'DELETE');
    const tasks = taskArray.filter((x) => !x.checks);
    return setTaskArray(tasks);
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
      <Task
        item={item}
        key={item._id}
        localItemRemover={localItemRemover}
      />
    ));
  };

  return (
    <div>
      <Header />
      <div className="App">
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
          actives={taskArray.filter((x) => !x.checks).length}
          everyRemove={everyOneRemover}
        />
      </div>
    </div>
  );
};
