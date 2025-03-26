import { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";

function Todo() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newPriority, setPriority] = useState("Medium");
  const [apiResponse, setApiResponse] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddTodo = async () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      apiData: null,
    };

    const detectedApi = detectKeywords(newTitle, newDescription);
    if (detectedApi) {
      const apiResponse = await fetchAPI(detectedApi);
      newTodoItem.apiData = apiResponse;
      setApiResponse(apiResponse);
      setShowPopup(true);
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const sortTodosByPriority = (tasks) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return tasks.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };
  const handleDeleteCompletedTodo = (index) => {
    let reducedCompletedTodo = [...completedTodos];
    reducedCompletedTodo.splice(index, 1);

    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedTodo)
    );
    setCompletedTodos(reducedCompletedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodos = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    if (savedTodos) {
      setTodos(savedTodos);
    }
    if (savedCompletedTodos) {
      setCompletedTodos(savedCompletedTodos);
    }
  }, []);

  const detectKeywords = (taskTitle, taskDescription) => {
    const combinedText = `${taskTitle}+${taskDescription}`.toLowerCase();
    if (
      combinedText.includes("weather") ||
      combinedText.includes("outdoor") ||
      combinedText.includes("evening")
    ) {
      return "weather";
    }
    if (combinedText.includes("news")) {
      return "news";
    }
    return null;
  };

  const fetchAPI = async (apiType) => {
    try {
      let location = { latitude: 51.5074, longitude: -0.1278 };

      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        location.latitude = position.coords.latitude;
        location.longitude = position.coords.longitude;
      }

      if (apiType === "weather") {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/current?lat=${location.latitude}&lon=${location.longitude}&key=dc2cbd4511d04b2aa4ea82c39ce99653	&include=minutely`
        );
        const data = await response.json();

        const weatherData = data.data[0];

        return `Weather: ${weatherData.weather.description}, 
                Temperature: ${weatherData.temp}°C, 
                Feels Like: ${weatherData.app_temp}°C, 
                Humidity: ${weatherData.rh}%, 
                Wind: ${weatherData.wind_spd} m/s ${weatherData.wind_cdir_full}, 
                Visibility: ${weatherData.vis} km`;
      } else if (apiType === "news") {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=uk&apiKey=21041cd5761745f2a1bb29bbfee4eccf"
        );
        const data = await response.json();
        return data.articles.length > 0
          ? `News: ${data.articles[0].title}`
          : "No news available.";
        console.log("News Data:", data);
      } else {
        console.log("No API available for this task.");
      }
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <label>Priority</label>
            <select
              value={newPriority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false &&
            sortTodosByPriority(allTodos).map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Priority: {item.priority}</small>
                    </p>
                    {item.apiData && (
                      <p className="api-result">{item.apiData}</p>
                    )}
                  </div>
                  <div>
                    <MdOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteTodo(index)}
                      title="Delete?"
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={() => handleComplete(index)}
                      title="Complete?"
                    />
                  </div>
                </div>
              );
            })}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>Completed on: ${item.completedOn}</p>
                  </div>
                  <div>
                    <MdOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                  {showPopup && (
                    <div className="popup">
                      <h3>API Response</h3>
                      <p>{apiResponse}</p>
                      <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Todo;
