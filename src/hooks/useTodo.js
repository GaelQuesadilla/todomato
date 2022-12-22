import { useEffect, useState, useRef } from "react";

export const useTodo = (name) => {
  const [todo, settodo] = useState([]);
  const firstRender = useRef(true);
  const storageName = useRef(name);

  const addTodo = () => {
    console.debug("CREATING TODO");
    //! FIX THIS: settodo is called 2 times
    settodo((prev) => {
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
    settodo((prev) => {
      const index = prev.findIndex((todo) => todo.id === id);
      prev[index] = Object.assign(prev[index], newValues);
      return [...prev];
    });
  };

  const deleteTodo = (id) => {
    settodo((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    settodo(JSON.parse(localStorage.getItem(storageName.current)));
    return () => {};
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      return () => {
        firstRender.current = false;
      };
    }
    console.debug("Save render", todo);
    localStorage.setItem(storageName.current, JSON.stringify(todo));
    return () => {};
  }, [todo]);
  return { todo, addTodo, updateTodo, deleteTodo };
};
