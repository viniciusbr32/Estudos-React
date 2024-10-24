import { Header } from "@/components/header";
import { Task } from "@/components/task";
import { TaskEmpty } from "@/components/taskEmpty";
import { Button } from "@/components/ui/button";
import type { Action, State, Todo } from "@/type-todolist/type-todolist";
import { PlusCircle } from "lucide-react";
import { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialState: State = {
	todos: [],
};

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case "Add":
			return {
				...state,
				todos: [
					...state.todos,
					{ id: uuidv4(), text: action.payload, checked: false },
				],
			};

		case "remove":
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload.id),
			};
		case "edit":
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id
						? { ...todo, text: action.payload.newText }
						: todo,
				),
			};
		case "toggle":
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id
						? { ...todo, checked: !todo.checked }
						: todo,
				),
			};
	}
};

export function TodoList() {
	const [inputValue, setInputValue] = useState("");
	const [state, dispatch] = useReducer(reducer, initialState);

	function AddItem() {
		dispatch({ type: "Add", payload: inputValue });
		setInputValue("");
	}

	function RemoveItem(id: string) {
		dispatch({ type: "remove", payload: { id } });
	}

	function ToggleItem(id: string) {
		dispatch({ type: "toggle", payload: { id } });
	}

	function EditItem(id: string, newText: string) {
		dispatch({ type: "edit", payload: { id, newText } });
	}

	const completedTasksCount = state.todos.filter(
		(todo: Todo) => todo.checked,
	).length;

	return (
		<div>
			<div className="bg-zinc-900">
				<div className="relative max-w-3xl mx-auto ">
					<Header />
					<div className="absolute bottom-[-28px] flex items-center w-full gap-3">
						<input
							placeholder="Digite uma tarefa"
							className="w-full pl-3 border rounded-sm text-slate-100 focus:outline-none bg-zinc-800 focus:ring-0 h-14"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
						<Button
							className="flex items-center gap-2 h-14 bg-zinc-800 text-slate-100"
							onClick={AddItem}
						>
							<PlusCircle />
							Criar
						</Button>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between max-w-3xl mx-auto mt-24 font-semibold text-gray-300">
				<p>Tarefas Criadas: {state.todos.length}</p>
				<p>
					Tarefas Completadas : {state.todos.length} / {completedTasksCount}
				</p>
			</div>

			<div className="flex flex-col max-w-3xl gap-3 mx-auto mt-6">
				{state.todos?.map((item) => (
					<Task
						key={item.id}
						text={item.text}
						id={item.id}
						onRemove={RemoveItem}
						checked={item.checked}
						onToggle={ToggleItem}
						EditTodo={EditItem}
					/>
				))}
				{state.todos.length === 0 && <TaskEmpty />}
			</div>
		</div>
	);
}
