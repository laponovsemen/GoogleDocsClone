import React from 'react';
import {useEditorStore} from "@/store/use-editor-store";
import {ColorResult, SketchPicker} from 'react-color'
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";


export const TextColorButton = () => {
	const {editor} = useEditorStore()

	const value = editor?.getAttributes('textStyle').color || "#000000";

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setColor(color.hex).run();
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						'text-sm overflow-hidden px-1.5 flex-col hover:bg-neutral-200/80 rounded-sm justify-center items-center flex shrink-0 min-w-7 h-7',
					)}
				>
					<span className={'text-xs'}>A</span>
					<div className={cn('h-0.5 w-full')} style={{backgroundColor: value}}/>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={'p-0'}
			>
				<SketchPicker
					color={value}
					onChange={onChange}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
