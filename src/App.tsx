import { Carrinho } from "./estudos/carrinho-compras";

function App() {
	// const { data, error, isLoading } = useFetch<DataProps>(
	// 	"https://randomuser.me/api/?results=20",
	// );

	return (
		<>
			{/* {isLoading && <div>Carregando....</div>}
			{error && <div>{error.message}</div>}

			{data?.results?.map((item) => (
				<div key={item.cell}>{item.name.first}</div>
			))} */}

			{/* <GerenciamentoEmail /> */}

			{/* <Contador /> */}
			<Carrinho />
		</>
	);
}

export default App;
