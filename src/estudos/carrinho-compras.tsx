import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

import { useReducer } from "react";

interface Item {
	id: number;
	title: string;
	price: number;
	image: string;
	quantity: number;
}

interface CartState {
	cart: Item[];
	total: number;
	itemCount: number;
}

type Action =
	| { type: "ADD_ITEM"; payload: Item }
	| { type: "REMOVE_ITEM"; payload: { id: number } };

const initialState: CartState = {
	cart: [],
	total: 0,
	itemCount: 0,
};

const reducer = (state: CartState, action: Action) => {
	switch (action.type) {
		case "ADD_ITEM": {
			const existingItem = state.cart.find(
				(item) => item.id === action.payload.id,
			);
			if (existingItem) {
				return {
					...state,
					cart: state.cart.map((item) =>
						item.id === action.payload.id
							? { ...item, quantity: item.quantity + 1 }
							: item,
					),
				};
			}
			return {
				...state,
				cart: [...state.cart, { ...action.payload, quantity: 1 }],
			};
		}
		case "REMOVE_ITEM": {
			const existingItem = state.cart.find(
				(item) => item.id === action.payload.id,
			);

			if (existingItem && existingItem.quantity === 1) {
				return {
					...state,
					cart: state.cart.filter((item) => item.id !== action.payload.id),
				};
			}
			return {
				...state,
				cart: state.cart.map((item) =>
					item.id === action.payload.id
						? { ...item, quantity: item.quantity - 1 }
						: item,
				),
			};
		}
	}
};

export function Carrinho() {
	const [dados, setDados] = useState<Item[]>([]);
	const [state, dispatch] = useReducer(reducer, initialState);

	const addItem = (item: Item) => {
		dispatch({ type: "ADD_ITEM", payload: item });
	};

	const removeItem = (id: number) => {
		dispatch({ type: "REMOVE_ITEM", payload: { id } });
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://fakestoreapi.com/products");
				if (!response.ok) {
					throw new Error("Erro na requisição");
				}
				const result = await response.json();
				setDados(result);
			} catch (error) {
				console.log(`erro: ${error}`);
			}
		};
		fetchData();
	}, []);

	console.log(dados);
	console.log(state.cart);

	return (
		<div className="grid grid-cols-4 gap-4 p-10">
			<Sheet>
				<SheetTrigger asChild>
					<Button>Carrinho</Button>
				</SheetTrigger>
				<SheetContent className="w-[400px] sm:w-[540px]">
					<SheetHeader className="pb-3 border-b">
						<SheetTitle>Seu carrinho tem {state.cart.length} itens</SheetTitle>
					</SheetHeader>

					<div className="flex flex-col max-h-screen gap-3 pt-5 pb-20 overflow-auto hide-scrollbar">
						{state.cart.map((cart) => (
							<div key={cart.id} className="flex gap-5">
								<div className="w-full h-32 border border-red-500 max-w-32">
									<img
										src={cart.image}
										alt={cart.title}
										className="object-cover w-full h-full"
									/>
								</div>
								<div className="flex flex-col flex-1">
									<p className="text-sm">{cart.title}</p>
									<div className="flex justify-between mt-5 text-end">
										<p className="text-sm">R$ {cart.quantity * cart.price}</p>
										<div className="flex items-center gap-2">
											<Button size="sm" onClick={() => addItem(cart)}>
												+
											</Button>
											<p>{cart.quantity}</p>
											<Button size="sm" onClick={() => removeItem(cart.id)}>
												-
											</Button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</SheetContent>
			</Sheet>

			{dados?.map((item) => (
				<Card key={item.id} className="rounded-lg">
					<CardContent className="flex flex-col items-center justify-center">
						<div className="flex items-center w-full h-48 py-2">
							<img
								src={item.image}
								alt={item.title}
								className="object-cover w-full h-full"
							/>
						</div>
						<div className="mt-4 text-center">
							<p className="font-semibold">{item.title}</p>
						</div>
						<div className="pt-2">
							<Button onClick={() => addItem(item)}>
								Adicionar ao carrinho
							</Button>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
