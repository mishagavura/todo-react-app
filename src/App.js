import React from 'react';
import './App.css';
import {
  Link,
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import TodoList from './components/TodoList'
import ListPage from './components/ListPage';

function App() {
  return (
    <div className='todo-app'>
      <Router>
       
      <Routes>
         <Route path="/" element={<TodoList/>}/>  
         <Route path="card/:id" element={<ListPage/>}/>  

      </Routes>
    </Router>
    </div>
  );
}

export default App;
