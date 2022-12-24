import { useEffect, useState, useRef } from "react";

export const useTodo = (name) => {
  const [todos, settodos] = useState([]);
  const firstRender = useRef(true);
  const storageName = useRef(name);

  const addTodo = () => {
    console.debug("CREATING TODO");
    //! FIX THIS: settodos is called 2 times
    settodos((prev) => {
      let newValue = [...prev];
      const now = new Date();
      newValue.push({
        header: "Todo",
        content: "Content",
        checked: false,
        createTime: now.getTime(),
        id: now.getTime(),
      });

      console.debug("PUSHING TODO");
      return newValue;
    });
  };
  const updateTodo = (id, newValues) => {
    settodos((prev) => {
      const index = prev.findIndex((todos) => todos.id === id);
      prev[index] = Object.assign(prev[index], newValues);
      return [...prev];
    });
  };

  const deleteTodo = (id) => {
    settodos((prev) => prev.filter((todos) => todos.id !== id));
  };

  const getTodo = (id) => {
    const todo = todos.filter((todos) => todos.id === id);
    console.debug("opening todo", todo[0]);
    if (todo.length === 0) {
      return {};
    }
    return todo[0];
  };

  useEffect(() => {
    settodos(JSON.parse(localStorage.getItem(storageName.current)));
    return () => {};
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      return () => {
        firstRender.current = false;
      };
    }
    console.debug("Save render", todos);
    localStorage.setItem(storageName.current, JSON.stringify(todos));
    return () => {};
  }, [todos]);
  return { todos, addTodo, updateTodo, deleteTodo, getTodo };
};
