import React from 'react'
import { Modal} from 'react-bootstrap'
import TodoForm from './Todo'

export default function TodoEdit(props) {
  return (
   <Modal
   show={props.showEdit}
   onHide={() => props.setShowEdit(false)}>
    <Modal.Header className='bg-info' closeButton>
        <h3>Editing {props.todo.name}</h3>
    </Modal.Header>
    <Modal.Body>
        <TodoForm
        todo={props.todo}
        setShowEdit={props.setShowEdit}
        getTodos={props.getTodos} />
        </Modal.Body>
   </Modal>
  )
}
