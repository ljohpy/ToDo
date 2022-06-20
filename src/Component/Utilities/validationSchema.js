import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    catName: Yup.string().max(25, 'Max 25 characters').required('Required'),
    catDesc: Yup.string().max(100, 'Max 100 characters')
})

const todoSchema = Yup.object().shape({
    name: Yup.string().max(100, 'Max 100 characters').required(),
    done: Yup.boolean().required(),
    categoryId: Yup.number().required()
   

})

export {todoSchema};
export default catSchema;


