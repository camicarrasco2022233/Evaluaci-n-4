import React, { Fragment, useState, useRef } from "react";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const [todos, setTodos] = useState([]);

  const taskRef = useRef();
  const descRef = useRef();
  const impRef = useRef();
  
  const hancleCheck = () => {
    if (impRef.current.checked) {
      return true
    } else {
      return false
    };

  };

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))

    if(savedNotes){
      setTodos(savedNotes);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(todos))
  },[todos]);

  const agregarTarea = () => {
    const task = taskRef.current.value;
    const desc = descRef.current.value;


    console.log(task);
    
    if (desc === "") return;

    console.log("La tarea se está agregando...");

    setTodos((prevTodos) => {
      const newTask = {
        id: uuid(),
        task: task,
        desc: desc,
        imp: hancleCheck()
      };

      return [...prevTodos, newTask];
    });
    taskRef.current.value = "";
    descRef.current.value = "";

  };

  const BorrarNota = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <Fragment>
      <h1>Post It Simulator!</h1>
      <div className="row g-3">
        <div className="col-3">
          <input
            ref={taskRef}
            type="text"
            placeholder="Título"
            className="form-control"
          />
        </div>
        <div className="col-3">
          <input 
            ref={descRef}
            type="text" 
            placeholder="Descripción"
            className="form-control"
          />
        </div>
        <div class="col-auto">
          <input 
            class="form-check-input" 
            type="checkbox" 
            id="importante" 
            ref={impRef}/>
          <label class="form-check-label etiqueta" for="importante">
            Importante!
          </label>
        </div>
        <div className="col-auto">
          <button 
            type="button" 
            onClick={agregarTarea} 
            className="btn btn-agregar ms-1">
              Agregar
          </button>
        </div>

      </div>

      <div className="row">
        <div className="col-12">
          <ul className="" >
            {todos.map((todo) => (
              <TodoItem todo={todo} 
              Borrar={BorrarNota}
              ></TodoItem>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
