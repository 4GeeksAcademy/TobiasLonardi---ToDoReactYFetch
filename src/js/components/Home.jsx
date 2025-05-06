import React from "react";
import { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const defaultTaskValue ={
		label: "",
		isDone: false
	}
	const baseURL = "https://playground.4geeks.com/todo"

	const [task, setTask] = useState({
		label: "",
		isDone: false
	})

	const [toDos, setToDos] = useState([])

	//esto es lo mismo que utilizar async function getAllTask(){}

	const getAllTask = async() =>{
		try {
			const response = await fetch(`${baseURL}/users/tobias`)
			const data = await response.json()
			if(response.ok){
				setToDos(data.todos)
			}
			if(response.status == 404){
				console.log("crear un usuario")
				createUser()
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(()=>{
		getAllTask()
	}, [])



	const onChangeTask = (event) =>{
		setTask({
			...task,
			[event.target.name] : event.target.value,
		})

	}

	async function createUser() {
		try {
			const response = await fetch(`${baseURL}/users/tobias`, {
				method:"POST"
			})
			if(!response.ok){
				console.log("error")
			}
		} catch (error) {
			console.log(error)
		}
		
	}

	async function saveTask (event){
		if(event.key == "Enter"){
			try {
				const response = await fetch(`${baseURL}/todos/tobias`,{
					method: "POST",
					headers:{
						"Content-Type": "application/json"
					},
					body: JSON.stringify(task)
				})
				if(response.ok){
					getAllTask()
					setTask(defaultTaskValue)
				}
			} catch (error) {
				console.log(error)
			}
		}
		
	}

	//const deleteTask = (value) =>{
	//	const result = toDos.filter((__,index) => index!=value)
	//	setToDos(result)
	//}

	async function deleteTask(id){
		try {
			const response = await fetch(`${baseURL}/todos/${id}`,
				{method: "DELETE"}
			)
			if(response.ok){
				getAllTask()
			}
		} catch (error) {
			console.log(error)
		}
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
					onChange={onChangeTask}
					onKeyDown={saveTask}

					
					/>
				</form>
				<ul>
					{toDos.map((item)=>{
						return(<li key={item.id} className="border rounded text-body-secondary">{item.id} {item.label}
						<span>
							<i className="fa-solid fa-xmark" onClick={() => deleteTask(item.id)}></i>
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