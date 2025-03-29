"use client"

import React from 'react';
import {
	BoldIcon,
	ItalicIcon, ListTodo, ListTodoIcon,
	LucideIcon, MessageSquarePlus, MessageSquarePlusIcon,
	PrinterIcon,
	Redo2Icon, RemoveFormattingIcon,
	SpellCheckIcon, SquarePlayIcon,
	UnderlineIcon,
	Undo2Icon
} from "lucide-react";
import {cn} from "@/lib/utils";
import { useEditorStore } from '@/store/use-editor-store';
import {Separator} from "@/components/ui/separator";
import {FontFamilyButton} from "@/components/features/editor/font-family-button/font-family-button";
import {HeadingLevelButton} from "@/components/features/editor/heading-level-button/heading-level-button";


interface ToolbarButtonProps {
	onClick?: () => void;
	isActive?: boolean;
	icon: LucideIcon;
}

const ToolbarButton: React.FunctionComponent<ToolbarButtonProps> = (props) => {
	const {onClick, icon: Icon, isActive} = props;
	return (
		<button
			onClick={onClick}
			className={cn("text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
					isActive && "bg-neutral-200/80"
				)}
		>
			<Icon className={'size-4'}/>
		</button>
	)
}




export const Toolbar = () => {

	const {editor} = useEditorStore()

	const sections: {
		label: string;
		icon: LucideIcon;
		onClick: () => void;
		isActive?: boolean
	}[][] = [
		[
			{
				label: "Undo",
				icon: Undo2Icon,
				onClick: () => editor?.chain().focus().undo().run(),
			},
			{
				label: "Redo",
				icon: Redo2Icon,
				onClick: () => editor?.chain().focus().redo().run(),
			},
			{
				label: "Print",
				icon: PrinterIcon,
				onClick: () => window.print()
			},
			{
				label: 'Spell check',
				icon: SpellCheckIcon,
				onClick: () => {
					const current = editor?.view.dom.getAttribute("spellcheck");
					console.log(current, 'current')
					editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
				}
			}
		],
		[
			{
				label: "Bold",
				icon: BoldIcon,
				isActive: editor?.isActive('bold'),
				onClick: () => editor?.chain().focus().toggleBold().run(),
			},
			{
				label: "Italic",
				icon: ItalicIcon,
				isActive: editor?.isActive('italic'),
				onClick: () => editor?.chain().focus().toggleItalic().run(),
			},
			{
				label: "Underline",
				icon: UnderlineIcon,
				isActive: editor?.isActive('underline'),
				onClick: () => editor?.chain().focus().toggleUnderline().run(),
			}
		],
		[
			{
				label: "Comment",
				icon: MessageSquarePlusIcon,
				onClick: () => console.log('todo: comment'),
				isActive: false, // todo : enable this functionality
			},
			{
				label: "List todo",
				icon: ListTodoIcon,
				onClick: () => editor?.chain().focus().toggleTaskList().run(),
				isActive: editor?.isActive('taskList'), // todo : enable this functionality
			},
			{
				label: "Remove Formatting",
				icon: RemoveFormattingIcon,
				onClick: () => editor?.chain().focus().unsetAllMarks().run(),
			}
		]
	]

	return (
		<div className={'bg-[#F1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'}>
			{ sections[0].map((item, index) => {
				return (
					<ToolbarButton key={`toolbar-item-${item.label}-${index}`} {...item}/>
				)
			})}
			<Separator
				orientation="vertical"
				className={'h-6 bg-neutral-300'}
			/>
			<FontFamilyButton/>
			<Separator
				orientation="vertical"
				className={'h-6 bg-neutral-300'}
			/>
			<HeadingLevelButton />
			<Separator
				orientation="vertical"
				className={'h-6 bg-neutral-300'}
			/>
		{/*	todo font size*/}
			<Separator
				orientation="vertical"
				className={'h-6 bg-neutral-300'}
			/>
			{sections[1].map((item, index) => {
				return (
					<ToolbarButton key={`toolbar-item-${item.label}-${index}`} {...item}/>
				)
			})}
		{/*	 todo: text color*/}
		{/*	todo : Highlight color*/}
			<Separator
				orientation="vertical"
				className={'h-6 bg-neutral-300'}
			/>
		{/* todo link*/}
		{/*todo image*/}
		{/*todo align*/}
		{/*todo line height*/}
		{/*todo list*/}
			{sections[2].map((item, index) => {
				return (
					<ToolbarButton key={`toolbar-item-${item.label}-${index}`} {...item}/>
				)
			})}
		</div>
	);
};

