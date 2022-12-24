import { Container, Button } from "react-bootstrap";
import { useTodo } from "../../hooks/useTodo";
import { TodoElement } from "./TodoElement";
import { FaPlus } from "react-icons/fa";
import { TodoModal } from "./TodoModal";
import { useRef, useState } from "react";
export const TodoCompiler = () => {
  const { todos, addTodo, updateTodo, deleteTodo, getTodo } =
    useTodo("todomato-testing");
  const [openTodo, setOpenTodo] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  // Add filters or sorts here
  const displayTodos = todos;
  return (
    <>
      <Container>
        {/* If there isn't any todo to display */}
        {displayTodos.length === 0 ? (
          <>
            <h1>Ups</h1>
            <p>Nothing to see here!</p>
          </>
        ) : null}
        {/* Map all todos */}
        {displayTodos.map((todo) => (
          <TodoElement
            updateTodo={updateTodo}
            key={`todo-${todo.id}`}
            todo={todo}
            setModalShow={(state) => setModalShow(state)}
            setOpenTodo={(id) => setOpenTodo(id)}
          />
        ))}
      </Container>
      <Button as="button" variant="primary" onClick={addTodo}>
        <FaPlus /> Add Todo
      </Button>

      <TodoModal
        show={modalShow}
        onDisplay={() => setModalShow(true)}
        onHide={() => setModalShow(false)}
        updateTodo={updateTodo}
        getTodo={() => getTodo(openTodo)}
        deleteTodo={deleteTodo}
      />
    </>
  );
};
