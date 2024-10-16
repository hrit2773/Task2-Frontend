import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import DisplayTasks from "./components/DisplayTasks"

type Inputs = {
  task:string
}

function App() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  const [tasks,setTasks]=useState<any>([])
  const [taskId,setTaskId]=useState<string>('')
  const [selectedTask,setSelectedTask]=useState('')
  useEffect(()=>{
    fetch('http://localhost:8080/tasks/')
    .then((res)=>{
      if (!res.ok){
        throw new Error("Error in fetching tasks")
      }
      return res.json()
    })
    .then((data)=>{
      setTasks(data)
      console.log(data)
    })
  },[])
  const onSubmit: SubmitHandler<Inputs>=(data)=>{
    if (!taskId){
      const newTask={task:data.task.toLowerCase(),status:"not completed"}
      fetch('http://localhost:8080/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(newTask)
      })
        .then((res) => res.json()) 
        .then((resData) => {
          setTasks(resData)
          console.log(resData)
        })
        .catch((error) => {
          throw new Error(error)
        });
    }
    else{
      const updatedTask={updatedTask:data.task.toLowerCase()}
      fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(updatedTask)
      })
        .then((res) => res.json()) 
        .then((resData) => {
          setTasks(resData)
        })
        .catch((error) => {
          throw new Error(error)
        });
    }
    setValue('task','')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex justify-center h-screen items-center bg-[url('https://cdn1.vectorstock.com/i/1000x1000/13/40/todo-list-seamless-pattern-universal-background-vector-7561340.jpg')]">
      <div className=" min-h-[400px] min-w-[400px] p-3 backdrop-blur-sm rounded-md bg-white/20 border-black border-2">
        <div className=" flex flex-col gap-8">
          <div className="text-center text-2xl font-bold font-serif">To Do List</div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-center gap-1">
              <TextField
                className="w-80 shadow-lg" 
                {...register('task',{ required: true })} 
                id="outlined-basic" 
                placeholder="Task"
                variant="outlined" 
              />
              <Button type='submit' variant="contained">{taskId? "Edit":"Add"}</Button>
            </div>
            
            {errors.task && (
              <div>
                <span className='text-left text-red-500'>This field is required</span>
              </div>
            )}
            
          </div>
          <div className=" flex flex-col gap-3">

            {tasks && (tasks.map((item:any)=>(
              <div>
                <DisplayTasks
                  id={item._id}
                  task={item.task}
                  status={item.status}
                  setTasksFunc={(data:any)=>setTasks(data)}
                  updateTasksFunc={(id:string,task:string)=>{
                    setTaskId(id)
                    setValue('task',task)
                  }}
                />
              </div>
            )))}
          </div>
        </div>
      </div>
    </div>

    </form>
  )
}

export default App
