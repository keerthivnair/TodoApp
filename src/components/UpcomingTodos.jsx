import React, { useContext, useEffect } from "react";
import { myContext } from "./Context";

function UpcomingTodos() {
  const { allTodo, setAllTodo } = useContext(myContext);
  // console.log('after setAllTodo')
  let highPriority = [];
  let lowPriority = [];

  let upcomingTodo =
    allTodo.length != 0
      ? allTodo.filter(
          (singleTodo, key) => {
            if (singleTodo.status == 0) {
              singleTodo.id = key;
              if (singleTodo.priority == "high") {
                highPriority.push(singleTodo);
                return false;
              }
              if (singleTodo.priority == "low") {
                lowPriority.push(singleTodo);
                return false;
              }
              return { singleTodo };
            }
          }
        )
      : [];

  upcomingTodo = highPriority.concat(upcomingTodo).concat(lowPriority);
  
  function handleComplete(e, id) {
    e.target.innerHTML = "completed";
    let updatedTodo = allTodo.map((singleTodo,key) => {
      if (key == id) {
        return { ...singleTodo, status: 1 };
      } else {
        return singleTodo;
      }
    });
    setAllTodo(updatedTodo);
  }
  function handleRemove(id) {
    let updatedTodo = allTodo.filter((singleTodo, key) => {
      if (key != id) {
        return singleTodo;
      }
    });
    setAllTodo(updatedTodo);
  }

  return upcomingTodo.length == 0 ? (
    <p></p>
  ) : (
    <div>
      {upcomingTodo.map((single, key) => (
        <div className="flex gap-4 border p-4">
          <p>{key + 1}.</p>
          <p className="border">{single.task}</p>
          <button className="border">{single.priority[0]}</button>
          <button
            className="border"
            onClick={(e) => {
              handleComplete(e, single.id);
            }}
          >
            done
          </button>
          <button
            className="border"
            onClick={(e) => {
              handleRemove(single.id);
            }}
          >
            remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default UpcomingTodos;
