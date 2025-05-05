import React from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [task, setTask] = useState({
		label: "",
		isDone: false
	})

	const [toDos, setToDos] = useState([])

	const onChangeTask = (event) =>{
		setTask({
			...task,
			[event.target.name] : event.target.value,
		})

	}

	const saveTask = (event) =>{

		if(event.key=="Enter" ){
			setToDos(
				[...toDos,
					task,
				]
			)
			setTask({
				label: "",
				isDone: false
			})
		}
	}

	const deleteTask = (value) =>{
		const result = toDos.filter((__,index) => index!=value)
		setToDos(result)
	}

	return (
		<div className="container py-5">
			<div className="row justify-content-center">
				<h1 className="text-center text-body-secondary">ToDos</h1>
				<div className="col-12 col-md-7 shadow bg-body-tertiary p-0 m-0">
				<form action=""
				onSubmit={(event) => {event.preventDefault()}}
				className="bg-body-tertiary">
					<input type="text" 
					className="form-control form-control-lg  bg-body-tertiary text-body-secondary"
					placeholder="what do we have to do?"
					name="label"
					value={task.label}
					onChange={onChangeTask }
					onKeyDown={saveTask}

					
					/>
				</form>
				<ul>
					{toDos.map((item,index)=>{
						return(<li key={index} className="border rounded text-body-secondary">{item.label}
						<span>
							<i className="fa-solid fa-xmark" onClick={() => deleteTask(index)}></i>
						</span>
					</li>)
						
					})}
				</ul>
				<div className="d-flex justify-content-start align-items-center border rounded p-1">
				<h6 className="text-center text-body-secondary" >tengo en total {toDos.length}</h6>

				</div>
				</div>
				
				
			</div>
		</div>
	);
};

export default Home;