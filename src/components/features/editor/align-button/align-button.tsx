import React from 'react';
import {useEditorStore} from "@/store/use-editor-store";
import {ColorResult, SketchPicker} from 'react-color'
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";
import {AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, HighlighterIcon} from "lucide-react";


export const AlignButton = () => {
	const {editor} = useEditorStore()

	const alignments = [
		{
			label: 'Align Left',
			value: 'left',
			icon: AlignLeftIcon
		},
		{
			label: 'Align Center',
			value: 'center',
			icon: AlignCenterIcon
		},
		{
			label: 'Align Right',
			value: 'right',
			icon: AlignRightIcon
		},
		{
			label: 'Align Justify',
			value: 'justify',
			icon: AlignJustifyIcon
		}
	]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className={'px-1.5 hover:bg-neutral-200/80 rounded-sm justify-center items-center flex shrink-0 min-w-7 h-7'}>
					<AlignLeftIcon className={'size-4'}/>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={'p-1 flex flex-col gap-y-1'}
			>
				{alignments.map(({label, icon: Icon, value}, index) => (
					<button
						key={value}
						onClick={() => editor?.chain().focus().setTextAlign(value).run()}
						className={cn(
							'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
							editor?.isActive({ textAlign: value}) && "bg-neutral-200/80"
						)}
					>
						<Icon className={'size-4'}/>
						<span className={'text-sm'}>{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
