import React, { Fragment } from "react";

export function TodoItem({ todo, Borrar}) {
  const { id, task, desc, imp} = todo;

  const importante = () =>{
    if (imp) {
      const im = "importante"
      return im
    }
  };

  return (
    <Fragment>
      <li >
        <a href="#" className={importante()}>
          <button type="button" class="botonX" onClick={() => Borrar(id)}>
            X
          </button>
          <h2>{todo.task}</h2>
          <p>{todo.desc}</p>
        </a>
      </li>
    </Fragment>
  );
}
