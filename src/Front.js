import React from 'react'
import {useNavigate} from 'react-router-dom';
import './App.css';
const Front=()=> {
  const navigate=useNavigate();
  const handleuserbutton= () =>{
      navigate('/Main');
    }
  const handleadminbutton=()=>{
    navigate('/Regform');
  }
  


 return (
   <div className="App">
     <div className='Full'>
     <h1>Covid vaccination</h1>
     <div>
       <h3>Select here!</h3>
     </div>
     <div>
       <button className="user" onClick={handleuserbutton}>Admin</button>
     </div>
     <div>
       <button className="admin" onClick={handleadminbutton}>User</button>
     </div>
     </div>
   </div>
   
 );
}

export default Front;
