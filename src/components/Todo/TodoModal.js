import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { Col, Form, FormCheck, Row } from "react-bootstrap";
import { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export const TodoModal = (props) => {
  const todo = props.getTodo();
  const headerRef = useRef();
  const contentRef = useRef();
  const checkRef = useRef();
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const { updateTodo, deleteTodo } = props;
  console.log("todo in modal", todo);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="todo">
          <Row className="mb-3">
            <Col className="col-2">
              <FormCheck
                aria-label="Checkbox for following text input"
                ref={checkRef}
                checked={todo.checked}
                onChange={() =>
                  updateTodo(todo.id, { checked: checkRef.current.checked })
                }
                className="todo__prop--check "
              />
            </Col>
            <Col>
              <h3>{todo.checked ? "Completado" : "Por completar"}</h3>
            </Col>
          </Row>
          <Form.Control
            ref={headerRef}
            type="text"
            value={todo.header}
            size="lg"
            onChange={() =>
              updateTodo(todo.id, { header: headerRef.current.value })
            }
            placeholder="Header"
          />

          <Form.Control
            ref={contentRef}
            as={TextareaAutosize}
            value={todo.content}
            className="my-3"
            size="md"
            onChange={() =>
              updateTodo(todo.id, { content: contentRef.current.value })
            }
            placeholder="Content"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.onHide();
              setDeleteModalShow(true);
            }}
            variant="danger"
          >
            Delete
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

      <DeleteModal
        show={deleteModalShow}
        onHide={() => {
          setDeleteModalShow(false);
        }}
        onDelete={() => {
          props.onHide();
          deleteTodo(todo.id);
        }}
        onDisplayMain={props.onDisplay}
      />
    </>
  );
};
// Delete Modal: Ask if you're sure to delete a todo, if yes, run onDelete prop */
const DeleteModal = (props) => {
  const { onDelete } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Todo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="todo">
        <p>Are you sure?</p>
      </Modal.Body>
      <Modal.Footer>
        {/* Delete button: Do task to delete and close the modal */}
        <Button
          onClick={() => {
            onDelete();
            props.onHide();
          }}
          variant="danger"
        >
          Delete
        </Button>
        {/* Close button: Close this modal and open the main modal */}
        <Button
          onClick={() => {
            props.onHide();
            props.onDisplayMain();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
