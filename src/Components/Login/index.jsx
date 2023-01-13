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

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
  };

  const handleLogout = () => {
    setUsername('');
    setPassword('');
    logout();
  };

  return (
    <form className={classes.root} onSubmit>
      <If condition={loggedIn}>
        <Then>
          <Text>Logged In</Text>
          <Button onClick={handleLogout}>Logout</Button>
        </Then>
        <Else>
          <Text>Login</Text>
          <TextInput
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.input}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.input}
          />
          <Button type="submit" className={classes.button} onClick={handleLogin}>
            Login
          </Button>
        </Else>
      </If>
    </form>
  );
};

export default Login;

