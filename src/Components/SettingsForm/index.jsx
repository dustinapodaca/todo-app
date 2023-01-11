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

const SettingsForm = (props) => {
  const { handleChange, handleSubmit } = props;
  const { state, dispatch, saveSettings } = useSettings();
  // const [settings, setSettings] = useState(state);
  // setSettings handled by context

  const { classes } = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextInput
          className={classes.input}
          label="Display Number"
          name="displayNum"
          value={state.displayNum}
          onChange={handleChange}
        />
        <Checkbox
          className={classes.input}
          label="Show Completed"
          name="showCompleted"
          value={state.showCompleted}
          onChange={handleChange}
        />
        <Button className={classes.button} type="submit">Save Changes</Button>
    </form>
  );
};

export default SettingsForm;
