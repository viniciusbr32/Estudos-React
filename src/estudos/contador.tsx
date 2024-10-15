import { useReducer } from "react";

type StateProps = {
	count: number;
};

type ActionProps = { type: "add" } | { type: "remove" };

const initialState = { count: 0 };

const reducer = (state: StateProps, action: ActionProps) => {
	switch (action.type) {
		case "add":
			return { count: state.count + 1 };
		case "remove":
			return { count: state.count - 1 };
		default: {
			return initialState;
		}
	}
};

export function Contador() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div>
			<button type="button" onClick={() => dispatch({ type: "add" })}>
				+
			</button>

			<div>
				<p>{Number(state.count)}</p>
			</div>

			<button type="button" onClick={() => dispatch({ type: "remove" })}>
				-
			</button>
		</div>
	);
}
