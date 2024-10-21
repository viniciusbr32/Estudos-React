import { ClipboardType } from "lucide-react";

export function TaskEmpty() {
	return (
		<div className="flex flex-col items-center justify-center">
			<ClipboardType />
			<p>Você não tem Tarefas Cadastradas</p>
		</div>
	);
}
