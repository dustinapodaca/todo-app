import React, { useState } from 'react';
import { useSettings } from '../../Context/Settings';
import { TextInput, Checkbox, Button, Text, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    marginTop: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
}));

const SettingsForm = () => {
  const { state, dispatch, saveSettings } = useSettings();
  // const { handleChange, handleSubmit } = props;
  const [show, setShow] = useState(false);

  const { classes } = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitting');
    setShow(true);
    saveSettings();
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Text>Settings</Text>
      <Checkbox
        label="Show Completed"
        checked={state.showCompleted}
        onChange={() => dispatch({ type: 'TOGGLE_COMPLETED' })}
        className={classes.input}
      />
      <TextInput
        label="Number of Items to Display"
        type="number"
        value={state.displayNum}
        onChange={(e) => dispatch({ type: 'DISPLAY_ITEMS', payload: e.target.value })}
        className={classes.input}
      />
      <Checkbox
        label="Sort by Difficulty"
        checked={state.sort}
        onChange={() => dispatch({ type: 'TOGGLE_SORT' })}
        className={classes.input}
      />
      <Button type="submit" className={classes.button}>
        Save
      </Button>
      {show && <Text>Settings Saved</Text>}
    </form>
  );
};

export default SettingsForm;

