import { useReducer } from "react";

type StateProps = {
	nome: string;
	email: string;
};

const initialState: StateProps = {
	nome: "",
	email: "",
};

type ActionProps =
	| {
			type: "SET_FIELD";
			field: keyof StateProps;
			value: string;
	  }
	| {
			type: "reset";
	  };

const reducer = (state: StateProps, action: ActionProps) => {
	switch (action.type) {
		case "SET_FIELD":
			return { ...state, [action.field]: action.value };
		case "reset":
			return initialState;
		default:
			return state;
	}
};

export function GerenciamentoEmail() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: "SET_FIELD",
			field: e.target.name as keyof StateProps,
			value: e.target.value,
		});
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert(`o email é ${state.email} e o nome é ${state.nome}`);
	};

	const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch({
			type: "reset",
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Nome:
						<input
							type="text"
							name="nome"
							value={state.nome}
							onChange={handleChange}
						/>
					</label>
				</div>
				<div>
					<label>
						E-mail:
						<input
							type="email"
							name="email"
							value={state.email}
							onChange={handleChange}
						/>
					</label>
				</div>
				<button type="submit">Enviar</button>
				<button type="button" onClick={handleReset}>
					Resetar
				</button>
			</form>
		</div>
	);
}
