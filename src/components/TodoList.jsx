import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import ListPage from './ListPage.jsx'
import {
  Link,
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      let response = await fetch('http://localhost:5000/lists')
      let data = await response.json()
      setTodos(data)

    } 
    fetchTodos()
  }, [])



  const addTodo = async todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    let reponse = await fetch('http://localhost:5000/lists', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "text": todo.text,
          "isComplete": 0,
        }
      )
    })
    let data = await reponse.json()
    console.log(data.id)
    todo = {
      "id": data.id,
      "text": todo.text,
      "isComplete": data.isComplete
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    let response = await fetch(`http://localhost:5000/lists/${todoId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "text": newValue.text,
        }
      )
    })
    let data = await response.json()

    newValue = {
      "id": data.id,
      "text": data.text,
      "isComplete": data.isComplete,
    }
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));

  };

  const removeTodo = async id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    let reponse = await fetch(`http://localhost:5000/lists/${id}`, {
      method: 'DELETE',
    })

    setTodos(removedArr);
  };

  const completeTodo = async id => {
    let response = await fetch(`http://localhost:5000/lists/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "isComplete": 1,
        }
      )
    })
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });


    setTodos(updatedTodos);
  };

  return (
    <div className='todo-lists'>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <div className="all-todos">
        <Todo
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </div>
      
    </div>
  );
}

export default TodoList;
