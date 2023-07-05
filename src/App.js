import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [list, setList] = useState([]);
  const [inputValue, setinputValue] = useState("");
  const [newlist, setNewlist] = useState([]);
  const [uservalue, setUservalue] = useState("");

  const postfetch = () => {
    fetch(`http://assets.breatheco.de/apis/fake/todos/user/${uservalue}`, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };

  const getFetch = () => {
    fetch(`http://assets.breatheco.de/apis/fake/todos/user/${uservalue}`)
      .then((res) => res.json())
      .then((result) => setList(result));
  };

  const putFetch = (object) => {
    fetch(`http://assets.breatheco.de/apis/fake/todos/user/${uservalue}`, {
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
    fetch(`http://assets.breatheco.de/apis/fake/todos/user/${uservalue}`, {
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
    setNewlist(list);
    newlist.push(object);
    putFetch(newlist);
    setinputValue("");
  };

  const handleuserclick = () => {
    console.log(uservalue);
    postfetch();
    getFetch();
    console.log(list);
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
              className="btn btn-primary mb-3"
              onClick={() => {
                handleuserclick();
              }}
            >
              Create User
            </button>
          </div>
        </form>
      </div>

      <div className="container w-50 mt-5">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">My list </h5>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control m-1"
              onChange={(e) => setinputValue(e.target.value)}
              value={inputValue}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                handleonclick();
              }}
            >
              Submit
            </button>
          </div>
          <ul className="list-group list-group-flush">
            {list.map((item, index) => (
              <li className="list-group-item" key={index}>
                {item.label}
              </li>
            ))}
          </ul>
          <div className="col-md-12 text-center">
            <i
              className="fa-solid fa-trash align-items-center"
              onClick={() => {
                delFetch();
              }}
            >
              delete list and username
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
