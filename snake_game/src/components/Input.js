import { useState } from "react";
import Home_stage from "./Home_stage";

const Input = () => {
  const [task, setTask] = useState(""); // To capture the current input
  const [tasks, setTasks] = useState([]); // To store the list of tasks
  const [editIndex, setEditIndex] = useState(-1); // To track which task is being edited
  const [editedTask, setEditedTask] = useState(""); // To store the task being edited

  // Update the input field value
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add the current task to the list
  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };



  // Enter edit mode for a task
  const editTask = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index]); // Set the current task text for editing
  };

  // Save the edited task
  const saveTask = () => {
    if (editedTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editedTask;
      setTasks(updatedTasks);
      setEditIndex(-1);  
    }
  };


  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };
  
  // updating the task
  const newSave=(update,index)=>{
    const ne=[...tasks]
    ne[index]=update;
    setTasks(ne);
    setEditIndex(-1);
       
  }

  return (
    <div className="Input Input_box">
      <div className="cin">
        <label htmlFor="cin">Enter Your Tasks</label>
        <input
          type="text"
          id="cin"
          name="server"
          value={task}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <Home_stage tasks={tasks} index={index} newSave={newSave}/>
                 <button onClick={saveTask}>Save</button>
                <button onClick={() => setEditIndex(-1)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{task}</span>
                <button onClick={() => deleteTask(index)}>Delete</button>
                <button onClick={() => editTask(index)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Input;