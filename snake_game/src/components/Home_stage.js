import React, { useState } from 'react'

const Home_stage = ({tasks,index,newSave}) => {
    console.log(tasks,'ke');
    const [Val,setVal]=useState(tasks[index]);
     
    
  return (
    <div className='main text'>
            <div>
              <label>Enter your task</label>
              <input type="text" value={Val} onChange={(e)=>setVal(e.target.value) }></input>
            </div>
            <button onClick={()=>newSave(Val,index)}>Save</button>
            <button>cancel</button>
    </div>
  )
}

export default Home_stage
