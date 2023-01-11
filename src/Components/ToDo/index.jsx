import React, { useEffect } from 'react';
import useForm from '../../Hooks/Form.jsx';
import List from '../List';
import SettingsForm from '../SettingsForm';
import { useSettings } from '../../Context/Settings';

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
  
  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    dispatch({ type: 'ADD_ITEM', payload: item });
  }
  
  let list = state.list;
  let incomplete = state.incomplete;
  
  function deleteItem(id) {
    dispatch({ type: 'DELETE_ITEM', payload: id });
  }
  
  function toggleComplete(id) {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
    dispatch({ type: "TOGGLE_COMPLETED", payload: id });
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

  function updateSettings(settings) {
    dispatch({ type: 'TOGGLE_COMPLETED', payload: settings.showCompleted });
    dispatch({ type: 'DISPLAY_ITEMS', payload: settings.displayNum });
  }
  
  return (
    <>
      <Grid className={classes.root}>
        <SettingsForm
          currentSettings={{state}}
          handleChange={handleChange}
          handleSubmit={(e) => handleSubmit(e, updateSettings)}
          className={classes.input}
        />
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
