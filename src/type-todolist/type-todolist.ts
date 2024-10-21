export type Todo = {
	id: string;
	text: string;
	checked: boolean;
};

export type State = {
	todos: Todo[];
};

export type AddAction = {
	type: "Add";
	payload: string;
};

export type RemoveAction = {
	type: "remove";
	payload: { id: string };
};

export type ToggleAction = {
	type: "toggle";
	payload: { id: string };
};

export type Action = AddAction | RemoveAction | ToggleAction;
