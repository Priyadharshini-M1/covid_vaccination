import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Adminselection.css'

const Adminselection = () => {
    const navigate=useNavigate();
    const handlebtn1 = () =>{
        navigate('/Admin');
    }
    const handlebtn2 = () =>{
        navigate('/Table');
    }
  return (
    <div className='box'>
        <div className='btn1'>
            <button className='addcenter' onClick={handlebtn1}>Add Center</button>
        </div>
        <div className='btn2'>
            <button className='existingcenter'onClick={handlebtn2}>Existing Centers</button>
        </div>
    </div>
  )
}

export default Adminselection