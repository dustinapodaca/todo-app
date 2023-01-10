import React, { useEffect, useState } from "react";
import useForm from "../../Hooks/Form.jsx";
import { useSettings } from "../../Context/Settings";

//matine imports 
import { createStyles, Pagination } from '@mantine/core';

import { v4 as uuid } from "uuid";


const ToDo = () => {
  // const [defaultValues] = useState({
  //   difficulty: 4,
  // });
  const { state, dispatch } = useSettings();

  // const [list, setList] = useState([]);
  // const [incomplete, setIncomplete] = useState([]);
    const { handleChange, handleSubmit } = useForm(addItem, state);
  // const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    // setList([...list, item]);
    dispatch({ type: "ADD_ITEM", payload: item });
  }

  function deleteItem(id) {
    dispatch({ type: "DELETE_ITEM", payload: id });
  }

  function toggleComplete(id) {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  }

  useEffect(() => {
    let incompleteCount = state.list.filter((item) => !item.complete).length;
    // setIncomplete(incompleteCount);
    dispatch({ type: "SET_INCOMPLETE", payload: incompleteCount });
    document.title = `To Do List: ${state.incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.list]);

  const filteredList = state.showCompleted ? state.list : state.list.filter((item) => !item.complete);

  return (
    <>
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {state.incomplete} items pending</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input
            onChange={handleChange}
            name="text"
            type="text"
            placeholder="Item Details"
          />
        </label>

        <label>
          <span>Assigned To</span>
          <input
            onChange={handleChange}
            name="assignee"
            type="text"
            placeholder="Assignee Name"
          />
        </label>

        <label>
          <span>Difficulty</span>
          <input
            onChange={handleChange}
            defaultValue={state.difficulty}
            type="range"
            min={1}
            max={5}
            name="difficulty"
          />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>

      <button onClick={() => dispatch({type: 'TOGGLE_COMPLETED'})}>
        Toggle Completed Items
      </button>

      {filteredList.map((item) => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p>Assigned to: {item.assignee}</p>
          <p>Difficulty: {item.difficulty}</p>
          <p>Complete: {item.complete.toString()}</p>
          <button onClick={() => toggleComplete(item.id)}>Toggle Complete</button>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default ToDo;
