import React from 'react';
import { Link } from 'react-router-dom';
import { Group, Text, createStyles } from '@mantine/core';
// import { AuthContext } from '../../Context/Auth';

const useStyles = createStyles((theme) => ({
  header: {
    width: "100%",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  // navBar: {
  //   padding: theme.spacing.md,
  //   display: "flex",
  //   flexDirection: 'row',
  //   justifyContent: "space-evenly",
  //   alignItems: "center",
  // },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Header = ({children}) => {
  // const { loggedIn, logout } = useContext(AuthContext);
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <Group className={classes.header}>
        <Link to="/" className={classes.link} default>
          <Text size="xl" weight="bold">
            Home
          </Text>
        </Link>
        <Link to="/settings" className={classes.link} default>
          <Text size="xl" weight="bold">
            Settings
          </Text>
        </Link>
        <Link to="/login" className={classes.link} default>
          <Text size="xl" weight="bold">
            Login
          </Text>
        </Link>
      </Group>
      {children}
    </header>
  );
}

export default Header;
