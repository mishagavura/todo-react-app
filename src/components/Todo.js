import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {Link} from 'react-router-dom'
const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };


  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
      <div
        className={todo.isComplete == "1" ? 'todo-row complete' : 'todo-row'}
        key={index}
      >
        {/* <div key={todo.id} onClick={() => completeTodo(todo.id)}> complete</div> */}
    <Link to={`card/${todo.id}`} >{todo.text}</Link>
        <div className='icons'>
          <DeleteIcon
            onClick={() => removeTodo(todo.id)}
            className='delete-icon'
          />
          <EditIcon
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className='edit-icon'
          />
          <CheckCircleIcon
            onClick={() => completeTodo(todo.id)}
            className='edit-icon'
          />
        </div>
      </div>
     
  ));
};

export default Todo;
