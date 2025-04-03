import React, { useState } from 'react';
import { useEditorStore } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from 'lucide-react';


export const FontSizeButton = () => {
	const { editor } = useEditorStore()

	const currentFontSize = editor?.getAttributes('textStyle').fontSize
		? editor?.getAttributes('textStyle').fontSize.replace("px", '')
		: "16"

	const [fontSize, setFontSize] = useState<string>(currentFontSize)
	const [inputValue, setInputValue] = useState<string>(fontSize)
	const [isEditing, setIsEditing] = useState<boolean>(false)

	const updateFontSize = (newSize: string) => {
		const size = parseInt(newSize);

		if (!isNaN(size) && size > 0) {
			editor?.chain().focus().setFontSize(`${size}px`).run()
			setFontSize(newSize)
			setInputValue(newSize)
			setIsEditing(false)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const handleInputBlur = () => {
		updateFontSize(inputValue)
	}
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			updateFontSize(inputValue);
			editor?.commands.focus()
		}
	}

	const increment = () => {
		const newSize = parseInt(fontSize) + 1;
		updateFontSize(newSize.toString())
	}

	const decrement = () => {
		const newSize = parseInt(fontSize) - 1;
		if (newSize > 0) {
			updateFontSize(newSize.toString())
		}
	}

	return (
		<div className={'flex items-center gap-x-0.5'}>
			<button
				onClick={decrement}
				className={'px-1.5 hover:bg-neutral-200/80 text-sm rounded-sm justify-center items-center flex shrink-0 w-7 h-7'}
			>
				<MinusIcon className={'size-4'} />
			</button>
			{isEditing ? (
				<input
					value={inputValue}
					type="text"
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					onKeyDown={handleKeyDown}
					className={'px-1.5 bg-transparent focus:ring-0 focus:outline-none text-sm rounded-sm w-10 h-7 border text-center border-neutral-400'}

				/>
			) : (
				<button
					onClick={() => {
						setIsEditing(true)
						setFontSize(currentFontSize)
					}}

					className={'px-1.5 hover:bg-neutral-200/80 text-sm rounded-sm bg-transparent cursor-text w-10 h-7 border text-center border-neutral-400'}
				>
					{currentFontSize}
				</button>
			)}
			<button
				onClick={increment}
				className={'px-1.5 hover:bg-neutral-200/80 text-sm rounded-sm justify-center items-center flex shrink-0 w-7 h-7'}
			>
				<PlusIcon className={'size-4'} />
			</button>
		</div>
	);
};
