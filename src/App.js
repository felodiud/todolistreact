import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [list, setList] = useState([]);
  const [inputValue, setinputValue] = useState("");
  const [uservalue, setUservalue] = useState("");

  const postfetch = () => {
    return fetch(
      `https://playground.4geeks.com/apis/fake/todos/user/${uservalue}`,
      {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  };

  const getFetch = () => {
    return fetch(
      `https://playground.4geeks.com/apis/fake/todos/user/${uservalue}`
    )
      .then((res) => res.json())
      .then((result) => {
        setList(result);
        return result;
      });
  };

  const putFetch = (object) => {
    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${uservalue}`, {
      method: "PUT",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const delFetch = () => {
    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${uservalue}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const handleonclick = () => {
    const object = { label: inputValue, done: false };
    const newTodoList = [...list, object];
    setList(newTodoList);
    putFetch(newTodoList);
    setinputValue("");
  };

  const handleuserclick = async () => {
    const response = await postfetch();
    if (response && response.msg === "The user exist") {
      const userData = await getFetch();
    }
  };

  const handleDelete = (index) => {
    const deleteTodo = [...list];
    deleteTodo.splice(index, 1);
    setList(deleteTodo);
    putFetch(deleteTodo);
  };

  const handleSupr = () => {
    delFetch();
    setinputValue("");
    setList([]);
    setUservalue("");
  };

  return (
    <div>
      <div className="container w-50 mt-5 d-flex justify-content-center">
        <form className="row g-3">
          <div className="col-auto">
            <input
              type="text"
              className="form-control m-1"
              onChange={(e) => setUservalue(e.target.value)}
              value={uservalue}
            />
          </div>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={() => {
                handleuserclick();
              }}
            >
              Get list
            </button>
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={() => handleSupr()}
            >
              delete all
            </button>
          </div>
        </form>
      </div>

      <div className="container w-50 mt-5">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">My list </h5>
          </div>
          <div className="input-group mb-3 pe-5  ps-5">
            <input
              type="text"
              className="form-control mb-1 mt-1 ms-1"
              onChange={(e) => setinputValue(e.target.value)}
              value={inputValue}
            />
            <button
              type="button"
              className="btn btn-secondary mb-1 mt-1"
              onClick={() => {
                handleonclick();
              }}
            >
              Submit
            </button>
          </div>
          <ul className="list-group list-group-flush">
            {list != [] &&
              list.map((item, index) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={index}
                >
                  {item.label}
                  <i
                    onClick={() => handleDelete(index)}
                    className="fa-solid fa-trash d-flex justify-content-end"
                  ></i>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
