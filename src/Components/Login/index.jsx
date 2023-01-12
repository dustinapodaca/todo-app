import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/Auth';
import { Button, Text, TextInput, createStyles } from '@mantine/core';
import { If, Then, Else } from 'react-if';

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

const Login = () => {
  const { login, loggedIn, logout } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { classes } = useStyles();

  const handleLogout = () => {
    setUsername('');
    setPassword('');
    logout();
  };

  return (
    <div className={classes.root}>
      <If condition={loggedIn}>
        <Then>
          <Text>Welcome {username}</Text>
          <Button onClick={handleLogout}>Logout</Button>
        </Then>
        <Else>
          <Text>Login</Text>
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.input}
          />
          <Button
            onClick={() => login(username, password)}
            className={classes.button}
          >
            Login
          </Button>
        </Else>
      </If>
    </div>
  );
};

export default Login;
