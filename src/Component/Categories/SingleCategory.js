import React, {useState} from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import CatEdit from './CatEdit';
import axios from 'axios';

library.add(fas);

export default function SingleCategory(props) {
  const {currentUser} = useAuth()
  const [showEdit, setShowEdit] = useState(false);

  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.category.categoryName}?`)){
      axios.delete(`https://localhost:7146/api/Categories/${id}`).then(() => {props.getCategories()})
    }
  }
   return (
    <tr>
    <td>{props.category.catName}</td>
    <td>{props.category.catDesc}</td>
    {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && 
    <td>
      <button className='m-1 rounded' id='editLink' onClick={() => setShowEdit(true)}>
      <FontAwesomeIcon icon={['fas', 'edit']} />
      </button>
      <button className='m-1 rounded' id='deleteLink' onClick={() => deleteCat(props.category.categoryId)}>
      <FontAwesomeIcon icon={['fas', 'edit']} />
      </button>

      {showEdit &&
      <CatEdit
      setShowEdit={setShowEdit}
      showEdit={showEdit}
      getCategories={props.getCategories}
      category={props.category} />
    }
    </td>
}
  </tr>
  );
}
