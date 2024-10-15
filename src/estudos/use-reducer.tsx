import axios from "axios";
import { useCallback, useEffect, useReducer } from "react";

type StateProps<T> = {
	data?: T;
	error?: Error;
	isLoading: boolean;
};

type ActionProps<T> =
	| {
			type: "loading";
	  }
	| {
			type: "fetched";
			payload: T;
	  }
	| {
			type: "error";
			payload: Error;
	  };

export function useFetch<T = unknown>(url: string) {
	const initialState: StateProps<T> = {
		data: undefined,
		error: undefined,
		isLoading: true,
	};

	const reducer = (state: StateProps<T>, action: ActionProps<T>) => {
		switch (action.type) {
			case "loading":
				return { ...initialState, isLoading: true };
			case "fetched":
				return { ...initialState, data: action.payload, isLoading: false };
			case "error":
				return { ...initialState, error: action.payload, isLoading: false };
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const handleFetch = useCallback(async () => {
		dispatch({ type: "loading" });

		try {
			const response = await axios.get(url);
			dispatch({ type: "fetched", payload: response.data });
		} catch (err) {
			if (axios.isAxiosError(err) && err.response)
				dispatch({ type: "error", payload: err as Error });
		}
	}, [url]);

	useEffect(() => {
		handleFetch();
	}, [handleFetch]);

	return {
		data: state.data,
		error: state.error,
		isLoading: state.isLoading,
	};
}
export type DataProps = {
	results: Array<{
		name: {
			first: string;
			last: string;
		};
		cell: string;
	}>;
};
