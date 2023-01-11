import React, { useState } from "react";
import { useSettings } from "../../Context/Settings";
import { Card, Text, Button, Pagination, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  pagination: {
    marginBottom: theme.spacing.md,
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: 300,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginTop: theme.spacing.md,
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

const List = (props) => {
  const { list, toggleComplete, deleteItem } = props;
  const { state } = useSettings();
  const { classes } = useStyles();

  const [page, setPage] = useState(1);

  const filteredList = state.showCompleted
    ? list
    : list.filter((item) => !item.complete);
  const itemsPerPage = state.displayNum;
  const pages = Math.ceil(filteredList.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedList = filteredList.slice(start, end);

  return (
    <>
      {paginatedList.map((item) => (
        <Card key={item.id} className={classes.card} withBorder>
          <Card.Section>
            <Text>Item: {item.text}</Text>
            <Text>Assigned to: {item.assignee}</Text>
            <Text>Difficulty: {item.difficulty}</Text>
            <Text>Complete: {item.complete.toString()}</Text>
          </Card.Section>
          <Card.Section className={classes.button}>
            <Button onClick={() => toggleComplete(item.id)}>
              Toggle Complete
            </Button>
            <Button onClick={() => deleteItem(item.id)}>Delete</Button>
          </Card.Section>
        </Card>
      ))}
      <Pagination
        className={classes.pagination}
        pages={pages}
        page={page}
        onChange={setPage}
      />
    </>
  );
};

export default List;
