import React, {useState, useEffect} from 'react'
import {Formik, Field, Form} from 'formik'
import { todoSchema } from '../Component/Utilities/validationSchema'
import axios from 'axios'

export default function TodoForm(props) {
    
    const [categories, setcategories] = useState([]);

    const getCategories = () => {
        axios.get(`https://localhost:7146/api/Categories`).then(response => setcategories(response.data))
    }
    const handleSubmit = (values) => {
        console.log(values)
        if(!props.todo){
          
            const todoToCreate = values;
            axios.post(`https://localhost:7146/api/Categories`, todoToCreate).then(() => {
                props.getTodos()
                props.setShowCreate(false)
            })
        }
        else{
            
            const todoToEdit = {
                toDoId: props.todo.toDoId,
                name: values.name,
                done: values.done,
                categoryId: values.categoryId
            }
       
            axios.put(`https://localhost:7146/api/Todo/${props.todo.toDoId}`, todoToEdit).then(() => {
                props.getTodo()
                props.setShowEdit(false)
            })
        }
    }
    useEffect(() => {
        getCategories()
        
            }, []);
          return (
   <Formik
   initialValues={{
    name: props.todo ? props.todo.name : '',
    done:props.todo ? props.todo.done : '',
    categoryId: props.todo ? props.todo.categroyId : '',
   }}
   validationSchema={todoSchema}
   onSubmit={(values) => handleSubmit(values)}>

   
    {({errors, touched}) => (
    <Form id="todoForm">
 <div className="form-group m-3">
                    <Field name="Name" className="form-control" placeholder="Name" />
                    
                    {errors.Name && touched.name ? (
                        <div className="text-danger">{errors.name}</div>
                    ) : null}
                </div>
                
                <div className="form-group m-3">
                    <Field name="Done" className="form-control" placeholder="Done" />
                   
                    {errors.Done && touched.Done ? (
                        <div className="text-danger">{errors.Done}</div>
                    ) : null}
                </div>
                
                <div className='form-group m-3'>
                    <Field as="select" name="categoryId" className="form-control">
                        <option value="" disabled>[--Please choose--]</option>
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catName}
                            </option>
                            )}

                    </Field>
                </div>
                <div className="form-group m-3">
                    <button type="submit" className="btn btn-info m-3">Submit Todo to API</button>
                </div>
    </Form>
   )}
   
   </Formik>
  )
}
