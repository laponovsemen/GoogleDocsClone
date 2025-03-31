import React from 'react';
import {useEditorStore} from "@/store/use-editor-store";
import {ColorResult, SketchPicker} from 'react-color'
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";
import {HighlighterIcon} from "lucide-react";


export const HighlightColorButton = () => {
	const {editor} = useEditorStore()

	const value = editor?.getAttributes('highlight').color || '#ffffff'

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setHighlight({color: color.hex}).run();
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className={'px-1.5 hover:bg-neutral-200/80 rounded-sm justify-center items-center flex shrink-0 min-w-7 h-7'}>
					<HighlighterIcon className={'size-4'}/>
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
