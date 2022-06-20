import React from 'react'
import TodoForm from './Todo'

export default function TodoCreate(props) {
  return (
    <article className='createTodo m-2 text-white justify-content-center'>
        <TodoForm
        setShowCreate={props.setShowCreate}
        getTodo={props.getTodo} />
    </article>
  )
}
