import { Container, Button } from "react-bootstrap";
import { useTodo } from "../../hooks/useTodo";
import { TodoElement } from "./TodoElement";
import { FaPlus } from "react-icons/fa";
export const TodoCompiler = () => {
  const { todo, addTodo, updateTodo, deleteTodo } = useTodo("todomato-testing");
  return (
    <>
      <Container>
        {todo.map((todo, index) => (
          <TodoElement
            updateTodo={updateTodo}
            key={`todo-${index}`}
            todo={todo}
          />
        ))}
      </Container>
      <Button as="button" variant="primary" onClick={addTodo}>
        <FaPlus /> Add Todo
      </Button>
    </>
  );
};
