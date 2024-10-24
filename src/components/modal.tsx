import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type CustomModalProps = {
	isModalOpen: boolean;
	closeModal: () => void;
	editTodo: (id: string, newText: string) => void;
	initialText: string;
	taskId: string;
};

export function Modal({
	isModalOpen,
	closeModal,
	initialText,
	taskId,
	editTodo,
}: CustomModalProps) {
	const [newText, setNewtext] = useState(initialText);

	const handleSave = () => {
		editTodo(taskId, newText);
		closeModal();
	};
	return (
		<Dialog open={isModalOpen} onOpenChange={closeModal}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar Tarefa</DialogTitle>
				</DialogHeader>

				<form>
					<Input
						type="text"
						value={newText}
						onChange={(e) => setNewtext(e.target.value)}
					/>
				</form>

				<Button type="submit" onClick={handleSave}>
					Salvar Tarefa
				</Button>
			</DialogContent>
		</Dialog>
	);
}
