import { useRef, useState } from "react";
import { FormCheck, Col, Row, Button } from "react-bootstrap";

export const TodoElement = (props) => {
  const checkRef = useRef();

  const { todo, setModalShow, setOpenTodo } = props;

  return (
    <>
      <Row className="todo-item my-2 mx-1 rounded todo">
        <Col className="todo__prop--check text-left" xs={2}>
          <FormCheck
            aria-label="check todo"
            checked={todo.checked}
            ref={checkRef}
            variant="md"
            onChange={(e) =>
              props.updateTodo(todo.id, { checked: checkRef.current.checked })
            }
          />
        </Col>
        <Col
          className="todo__prop--content"
          status={todo.checked ? "completed" : "unclompleted"}
          onClick={() => {
            setOpenTodo(todo.id);
            setModalShow(true);
          }}
        >
          <h3>{todo.header}</h3>
          <p>{todo.content}</p>
        </Col>
      </Row>
    </>
  );
};
