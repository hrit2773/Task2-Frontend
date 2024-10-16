import { capitalizeFirstLetter } from "../utils";

interface taskInterface{
    id:string;
    task:string;
    status:string;
    setTasksFunc: (tasks:any)=>void;
    updateTasksFunc: (id:string,task:string)=>void;
}

function DisplayTasks(props:taskInterface) {

    const changeStatus=()=>{
        const newStatus=props.status==='completed'? 'not completed':'completed'
        fetch(`http://localhost:8080/tasks/status/${props.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({newStatus:newStatus})
          })
          .then(res => {
            if (!res.ok) {
              throw new Error("Not updated Successfully");
            }
            return res.json()
          })
          .then((data)=>{
              props.setTasksFunc(data)
          })
    }
    const deleteTask=()=>{
        fetch(`http://localhost:8080/tasks/${props.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => {
              if (!res.ok) {
                throw new Error("Not deleted Successfully");
              }
              return res.json()
            })
            .then((data)=>{
                props.setTasksFunc(data)

            })
            .catch(error => console.error('Error:', error));
    }
    return (
        <div className="flex justify-between">
            <div className="flex justify-between w-full h-15 border-gray-400 rounded-lg border-2 p-2 shadow-md">
                <div>
                    {capitalizeFirstLetter(props.task)}
                </div>
                <div className="flex gap-3">
                    <div className=" w-6 h-6">
                        {props.status==='completed'?(
                            <img
                                src={`/icons/completed-checkmark-done-complete-svgrepo-com.svg`}
                                onClick={changeStatus}
                                className=" object-contain cursor-pointer"
                            />
                        ):(
                            <img
                                src={`/icons/bookmark-svgrepo-com.svg`}
                                onClick={changeStatus}
                                className=" object-contain cursor-pointer"
                            />
                        )}
                    </div>
                    <div className=" w-6 h-6">
                        <img
                            src="/icons/icons8-edit.svg"
                            className=" object-contain cursor-pointer"
                            onClick={()=>props.updateTasksFunc(props.id,props.task)}
                        />
                    </div>
                    <div className=" w-7 h-7">
                        <img
                            src="/icons/icons8-delete.svg"
                            className=" object-contain cursor-pointer"
                            onClick={deleteTask}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayTasks
