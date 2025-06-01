import { createContext, useState, useEffect } from "react";
const myContext = createContext();

const ContextProvider = ({ children }) => {
  function getInitialVal() {
    return JSON.parse(localStorage.getItem("allTodos")) || [];
  }
  const [allTodo, setAllTodo] = useState(getInitialVal);
  useEffect(() => {
    localStorage.setItem("allTodos", JSON.stringify(allTodo));
  }, [allTodo]);
  return (
    <myContext.Provider value={{ allTodo, setAllTodo }}>
      {children}
    </myContext.Provider>
  );
};
export { myContext, ContextProvider };
