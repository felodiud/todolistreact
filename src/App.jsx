import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { useState } from 'react';

function App() {
  const [ inputValue, setinputValue ] = useState ("")
  const [todos, setTodos] = useState([])
  return (
    
    <div className='container w-50 mt-5'>
      <div className="card" >
        <div className="card-body">
          <h5 className="card-title text-center">My list </h5>
        </div>
        <div className="input-group mb-3">
          <input 
          type="text" 
          className="form-control m-1" 
          onChange={ (e) => setinputValue(e.target.value)}
          value={inputValue}
          onKeyDown={(e) =>{
            console.log(e.key)
            if (e.key === "Enter") {
              setTodos(todos.concat(inputValue))
              setinputValue("")
            }}}
          placeholder="Write a 'To do'" 
          aria-label="Username" 
          aria-describedby="basic-addon1"/>
        </div>
        <ul className="list-group list-group-flush">
          {todos.map ((item, index) => (
            <li className="list-group-item">
              {item}<i className="fa-solid fa-trash float-end" onClick={() => setTodos(todos.filter((t, currentIndex) => index != currentIndex))}></i>
            </li>

          ))}
          
          
        </ul>
        <div className="card-footer">
          {todos.length} Tasks
        </div>
      </div>
    </div>
    )
}

export default App;
