import React, { useContext, useState } from "react";
import { myContext } from "./Context";
import UpcomingTodos from "./UpcomingTodos";
import CompletedTodos from "./CompletedTodos";
import InPageNavigation from "./InPageNavigation";

export default function Home() {
  const [val, setVal] = useState("medium");
  const { allTodo, setAllTodo } = useContext(myContext);
  const [singleTodo, setSingleTodo] = useState({
    task: "",
    priority: "medium",
    status: 0,
  });

  function handleChange(e) {
    setVal(e.target.value);
    setSingleTodo({ ...singleTodo, priority: e.target.value });
  }
  function handleAdd() {
    setAllTodo([...allTodo, singleTodo]);
  }

  return (
    <>
      <div>
        <button onClick={handleAdd}>Add</button>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setSingleTodo({ ...singleTodo, task: e.target.value });
            }}
          />
          <select id="dropdown" value={val} onChange={handleChange}>
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>
      </div>
      {allTodo.length == 0 ? <p></p> : 
      <InPageNavigation>
        <UpcomingTodos/>
        <CompletedTodos/>
      </InPageNavigation>
       }
    </>
  );
}
