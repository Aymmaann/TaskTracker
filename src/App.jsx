import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css'
import { useState } from 'react'
import emptyIcon from "./assets/empty.png"

const App = () => {
  const [tasks, setTasks] = useState([])
  const [addingTask, setAddingTask] = useState(true)
  const [editingIndex, setEditingIndex] = useState(null)

  const createTask = (input) => {
    if (input.trim()) {
      setTasks([...tasks, input])
    }
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index))
  }

  const editTask = (index) => {
    setAddingTask(false)
    setEditingIndex(index)
    const inputElement = document.querySelector("#task-input")
    if (inputElement) {
      inputElement.value = tasks[index]
    }
  }

  const saveEditedTask = (input) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === editingIndex ? input : task
    )
    setTasks(updatedTasks)
    setAddingTask(true)
    setEditingIndex(null)
  }

  return (
    <>
      {console.log(tasks.length)}
      <div className="container">
        <h1>Get Things Done!</h1>

        <div className='input-section'>
          {addingTask ? (
            <>
              <input type="text" placeholder='What is the task today?' id="task-input" />
              <button onClick={() => {
                const inputElement = document.querySelector("#task-input");
                if (inputElement) {
                  createTask(inputElement.value);
                  inputElement.value = "";
                }
              }}>Add Task</button>
            </>
          ) : (
            <>
              <input type="text" placeholder='Edit task here' id="task-input" />
              <button className='edit-btn' onClick={() => {
                const inputElement = document.querySelector("#task-input");
                if (inputElement) {
                  saveEditedTask(inputElement.value);
                  inputElement.value = "";
                }
              }}>Save Task</button>
            </>
          )}
        </div>

        <section className="task-section">
          {tasks.length !== 0? (
            <>
              {tasks.map((task, index) => (
                <div className="task" key={index}>
                  <p>{task}</p>
                  <div className='task-icons'>
                    <i className='fas fa-trash' onClick={() => deleteTask(index)}></i>
                    <i className='fas fa-pen-to-square' onClick={() => editTask(index)}></i>
                  </div>
                </div>
              ))}
            </> ) : (
              <div className='nothing-here-yet'>
                <img src={emptyIcon} alt="" className='empty-icon'/>
                <p>No tasks added yet :(</p>
              </div>
            )
          }
        </section>
      </div>
    </>
  )
}

export default App
