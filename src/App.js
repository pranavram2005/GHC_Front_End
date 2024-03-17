import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';

const App = ()=> {
  const user_data = {title:''};
  const [TotalData,SetTotalData] = useState([]);
  const [Search,SetSearch] = useState([])
  const [FormData,SetFormData] = useState(user_data); 
  const [Edit,SetEdit] = useState(false);
  const [CurrentUser,SetCurrentUser] = useState({id:'',completed:false});
const handleInputChange = (event) =>{
  SetFormData({...FormData,[event.target.name]:event.target.value,
  });
};
const EditRow = (user) =>{
  SetEdit(true);
  SetCurrentUser({id:user.id,completed:user.completed})
};
const handleEditChange = (event) =>{
  if (event.target.value==="flase"){
    event.target.value = true;
  }
  SetCurrentUser({...CurrentUser,[event.target.name]:event.target.value})
};



  async function fetchData() {
    const response = await axios.get('https://ghc-applications-api.vercel.app/todos');
    SetTotalData(response.data);
  }

useEffect(()=>{
  fetchData();
},[]);
const ForSearch=(e)=>{
  if (e.length===0){
    SetSearch(TotalData);
  }
  else{  
  SetSearch(TotalData.filter(f=>Object.values(f.name).join('').toLowerCase().includes(e.target.value.toLowerCase())));
}}
const handleFormSubmit = async(event) =>{
  event.preventDefault();
  await axios.post('https://ghc-applications-api.vercel.app/todos/',FormData);
  fetchData();
  SetFormData(user_data)
  alert("Data submitted successfully")
}
const handleEditSubmit = async(event) =>{
  event.preventDefault();
  await axios.put('https://ghc-applications-api.vercel.app/updatetodos/',CurrentUser)
  fetchData();
  alert("Updated sucessfully");
  SetEdit(false)
}
const DeleteRow = async(id) =>{
  await axios.delete('https://ghc-applications-api.vercel.app/todos/'+id);
  fetchData();
  alert("Deleted sucessfully")
}
return(
  <div className='container'>
    <div className='row mt-3'>
    <div className='col-6'>{Edit?(
      <>
      <h1>Edit Task</h1>
      <form onSubmit={handleEditSubmit}>
      <div className='mt-3 mb-3'>
      <label className='form=label' htmlFor='id'>Id:</label>
      <input type='text' id='id' name='id' className='form-control' onChange={handleEditChange} value={CurrentUser.id}/>
      </div>
      <div className='mt-3 mb-3'>
      <label className='form=label' htmlFor='completed'>Staus:</label>
      <input type='text' id='completed' name='completed' className='form-control' onChange={handleEditChange} value={CurrentUser.completed}/>
        </div>
      <button className='btn btn-primary' type='submit'>Submit</button>
      
    </form></>
    ):(
    <>
    <h1>Add Task</h1>
    <form onSubmit={handleFormSubmit}>
      <div className='mt-3 mb-3'>
      <label className='form=label' htmlFor='name'>Task:</label>
      <input type='text' id='name' name='title' className='form-control' onChange={handleInputChange} value={FormData.title}/>
      </div>
      <button className='btn btn-primary' type='submit'>Submit</button>
      
    </form></>)}
      
    </div>

      <div className='col-6'>
      <input type='text' className='form-control input' onChange={ForSearch}/>
    <table className='table table-borbered'><tbody>
      <tr className='table-primary'>
      <th>ID</th>
      <th>Task</th>
      <th>Status</th>
      <th>Delete</th>
      <th>Update</th>
        </tr>

       {TotalData.map((user)=>(
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.title}</td>
          <td>{user.completed}</td>
          <td><button className='btn btn-danger btn-sm' onClick={()=>DeleteRow(user.id)}>Delete</button></td>
          <td><button className='btn btn-warning btn-sm' onClick={()=>EditRow(user)}>Update</button></td>
        </tr>
       ))}
       </tbody>
    </table></div>
    
  </div></div>
)}
       
export default App;
