import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import SingleTodo from './SingleTodo';
import FilterCat from './FilterCat';
import './Todo.css'
import TodoCreate from './TodoCreate';
import { useAuth } from '../Contexts/AuthContext';

export default function Todo() {
    const [todo, setTodo] = useState([]);
    const {currentUser } = useAuth();
    const [showCreate, setShowCreate] = useState(false);
    const [filter, setFilter] = useState(0);
    const getTodo = () => {
        axios.get(`https://localhost:7146/api/ToDos`).then(response => {
          setTodo(response.data)
        })
      }
      
      useEffect(() => {
      getTodo();
      }, []);
      
      return (
        <section className="todo">
        <article className="bg-info p-5">
            <h1 className="text-center">Todo</h1>
        </article>
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <div className='bg-dark p-2 mb-3 text-center'>
    <button className="btn btn-info" onClick={() => setShowCreate(!showCreate)}>
      {!showCreate ? 'Create New Todo' : 'Close Form'}
    </button>
    <div className='createContainer'>
      {showCreate &&
      
    <TodoCreate gettodo={getTodo} setShowCreate={setShowCreate} />
    }
      </div>
        </div>
        }
        <FilterCat  SetFilter={setFilter} />
        <Container>
          <article className="todoGallery row justify-content-center">
            {filter === 0 ? todo.map(x => 
              <SingleTodo
              key={x.toDoId}
              todo={x} 
              getTodo={getTodo}/>
              ) :
              todo.filter(x => x.categoryId === filter).map(x =>
              <SingleTodo
              key={x.toDoId}
              todo={x} 
              getTodo={getTodo}
                />
              )
            }
            {filter !== 0 && todo.filter(x => x.categoryId === filter).length === 0 &&
            <h2 className="alert alert-warning text-dark">
              There are no results this category.
            </h2>
            }
          </article>
        </Container>
       </section>
      );
    }
    
      
      