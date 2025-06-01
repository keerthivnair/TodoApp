import React, { useContext } from "react";
import { myContext } from "./Context";

function CompletedTodos() {
  const { allTodo, setAllTodo } = useContext(myContext);
  let completedTodo =
    allTodo.length != 0
      ? allTodo.filter((singleTodo) => {
          if (singleTodo.status == 1) {
            return { singleTodo };
          }
        })
      : [];
  return completedTodo.length == 0 ? (
    <p>Complete n be back!</p>
  ) : (
    <div>
      {completedTodo.map((single, key) => (
        <div className="flex gap-4 border p-4">
          <p>{key + 1}.</p>
          <p className="border">{single.task}</p>
          <button className="border">{single.priority[0]}</button>
          <button className="border">completed</button>
          <button className="border">remove</button>
        </div>
      ))}
    </div>
  );
}

export default CompletedTodos;
