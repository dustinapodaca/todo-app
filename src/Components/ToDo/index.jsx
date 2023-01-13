import React, { useEffect } from 'react';
import useForm from '../../Hooks/Form.jsx';
import List from '../List';
// import SettingsForm from '../SettingsForm';
import { useSettings } from '../../Context/Settings';
import axios from 'axios';
// import Auth from '../../Context/Auth';
//router imports

//matine imports 
import {
  Grid,
  Card,
  Slider,
  TextInput,
  Text,
  Button,
  createStyles,
} from '@mantine/core';

import { v4 as uuid } from 'uuid';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: 400,
    padding: theme.spacing.md,
  },
  slider: {
    // marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  input: {
    marginTop: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.md,
  },
}));

const ToDo = () => {
  const { state, dispatch } = useSettings();
  // const [list, setList] = useState([]);
  // const [incomplete, setIncomplete] = useState([]);
  // const { handleChange, handleSubmit } = useForm(addItem, defaultValues);
  
  const { handleChange, handleSubmit } = useForm(addItem, state);
  const { classes } = useStyles();


//   Alter the Add, Toggle Complete, and Delete functions within your to do application to use your API instead of in memory state.
// Fetch the current list of items from the database on application start.
// Whenever you add/update/delete an item, refresh the state so the user can instantly see the change.
// Consider: Do you re-fetch from the server every time you make a change?
// If so, how?
// If not, how will you stay in sync?

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get('https://api-js401.herokuapp.com/api/v1/todo');
      const data = response.data.results;
      console.log(data);
      dispatch({ type: 'GET_ITEMS', payload: data });
    }
    fetchData();
  }, [dispatch]);

  
  async function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    try {
      const response = await axios.post('https://api-js401.herokuapp.com/api/v1/todo', item);
      if (response.status === 200 && response.data) {
        dispatch({ type: 'ADD_ITEM', payload: response.data });
      } else {
        console.error('Error adding item');
      }
    } catch (e) {
      console.error(e);
    }  
  }
  
  let list = state.list;
  let incomplete = state.incomplete;
  
  async function deleteItem(id) {
    try {
      const response = await axios.delete(`https://api-js401.herokuapp.com/api/v1/todo/${id}`);
      if (response.status === 200) {
        const newList = list.filter((item) => item.id !== id);
        dispatch({ type: 'DELETE_ITEM', payload: newList });
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  async function toggleComplete(id) {
    try {
      const response = await axios.put(`https://api-js401.herokuapp.com/api/v1/todo/${id}`, {
        complete: !list.complete,
      });
      if (response.status === 200) {
        const newList = list.map((item) => {
          if (item.id === id) {
            item.complete = !item.complete;
          }
          return item;
        });
        dispatch({ type: 'TOGGLE_COMPLETE', payload: newList });
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  function changeDifficulty(value) {
    dispatch({ type: 'CHANGE_DIFFICULTY', payload: value });
  }
  
  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    dispatch({ type: 'SET_INCOMPLETE', payload: incompleteCount });
    document.title = `To Do List: ${state.incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);
  
  return (
    <>
      <Grid className={classes.root}>
        {/* <SettingsForm
          className={classes.input}
        /> */}
        <Card className={classes.card}>
          <Text className={classes.input}>Add To Do Item</Text>
          <form onSubmit={handleSubmit}>
            <TextInput
              className={classes.input}
              label="To Do Item"
              name="text"
              onChange={handleChange}
            />
            <TextInput
              className={classes.input}
              label="Assigned To"
              name="assignee"
              onChange={handleChange}
            />
            <Text className={classes.input}>Difficulty</Text>
            <Slider
              className={classes.slider}
              label={state.difficulty}
              name="difficulty"
              onChange={(value) => changeDifficulty(value)}
              min={1}
              max={5}
              defaultValue={state.difficulty}
            />
            <Button className="button" type="submit">
              Add Item
            </Button>
          </form>
        </Card>
      </Grid>
      <Grid className={classes.root}>
        <Text className={classes.input}>
          There are {incomplete} Items To Complete
        </Text>
        <List
          list={list}
          toggleComplete={toggleComplete}
          deleteItem={deleteItem}
        />
      </Grid>
    </>
  );
};

export default ToDo;
