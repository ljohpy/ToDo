import React, {useState} from 'react'

//Edit/Delete imports
import axios from 'axios'
import { useAuth } from '../Contexts/AuthContext'

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import TodoEdit from './TodoEdit';

library.add(fas);

export default function SingleTodo(props) {
  const {currentUser} = useAuth();
 
  const [showEdit, setShowEdit] = useState(false);

  const deleteTodo = (id) => {
     if(window.confirm(`Are you sure that you want to delete ${props.todo.name}?`)){
      axios.delete(`https://localhost:7146/api/Todos/${id}`).then(() => {props.getTodo()})
     }
  }

  return (
    <div className="singleTodo col-md-5 m-4">
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
          <div>
            <button id="editLink" onClick={() => setShowEdit(true)}>
              <FontAwesomeIcon icon={['fas', 'edit']} />
            </button>
           <button id="deleteLink" onClick={() => deleteTodo (props.todo.todoId)}>
              <FontAwesomeIcon icon={['fas', 'trash-alt',]}/>
              </button>
            {showEdit &&
              <TodoEdit
              todo={props.todo}
              showEdit={setShowEdit}
              getTodo={props.getTodo} />
            }
          </div>
        }
        <h3>{props.todo.name}</h3>
      
    </div>
  )
}