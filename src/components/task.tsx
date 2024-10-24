import { EditIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "./modal";

type TaskType = {
	text: string;
	id: string;
	onRemove: (id: string) => void;
	onToggle: (id: string) => void;
	EditTodo: (id: string, newText: string) => void;
	checked: boolean;
};

export function Task({
	text,
	id,
	onRemove,
	onToggle,
	checked,
	EditTodo,
}: TaskType) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);
	return (
		<div
			className={`flex items-center justify-between px-4 rounded-lg py-9 bg-zinc-800 ${checked && "line-through text-gray-400"}`}
		>
			<div className="flex items-center gap-3 ">
				<input
					type="checkbox"
					checked={checked}
					onChange={() => onToggle(id)}
					className="appearance-none w-6 h-6 flex justify-center border-[2px] border-purple-600 bg-transparent rounded-full checked:bg-green-500 checked:border-transparent focus:outline-none checked:before:content-['✓'] checked:before:text-white checked:before:flex checked:before:justify-center checked:before:items-center  "
				/>

				<p>{text}</p>
			</div>
			<div className="flex items-center gap-2">
				<Trash2
					onClick={() => onRemove(id)}
					className="cursor-pointer"
					color="red"
				/>
				<EditIcon size={24} color="currentColor" onClick={openModal} />
				<Modal
					isModalOpen={isOpen}
					closeModal={closeModal}
					initialText={text}
					taskId={id}
					editTodo={EditTodo}
				/>
			</div>
		</div>
	);
}
