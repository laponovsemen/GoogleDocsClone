"use client"

import { AlignButton } from "@/components/features/editor/align-button/align-button";
import { FontFamilyButton } from "@/components/features/editor/font-family-button/font-family-button";
import { FontSizeButton } from "@/components/features/editor/font-size-button/font-size-button";
import { HeadingLevelButton } from "@/components/features/editor/heading-level-button/heading-level-button";
import { HighlightColorButton } from "@/components/features/editor/highlight-color-button/highlight-color-button";
import { ImageButton } from "@/components/features/editor/image-button/image-button";
import { LineHeightButton } from "@/components/features/editor/line-height-button/line-height-button";
import { LinkButton } from "@/components/features/editor/link-button/link-button";
import { ListButton } from "@/components/features/editor/list-button/list-button";
import { TextColorButton } from "@/components/features/editor/text-color-button/text-color-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from '@/store/use-editor-store';
import {
	BoldIcon,
	ItalicIcon,
	ListTodoIcon,
	LucideIcon,
	MessageSquarePlusIcon,
	PrinterIcon,
	Redo2Icon, RemoveFormattingIcon,
	SpellCheckIcon,
	UnderlineIcon,
	Undo2Icon
} from "lucide-react";
import React from 'react';


interface ToolbarButtonProps {
	onClick?: () => void;
	isActive?: boolean;
	icon: LucideIcon;
}

const ToolbarButton: React.FunctionComponent<ToolbarButtonProps> = (props) => {
	const { onClick, icon: Icon, isActive } = props;
	return (
		<button
			onClick={onClick}
			className={cn("text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
				isActive && "bg-neutral-200/80"
			)}
		>
			<Icon className={'size-4'} />
		</button>
	)
}




export const Toolbar = () => {

	const { editor } = useEditorStore()

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
					onClick: () => editor?.chain().focus().addPendingComment().run(),
					isActive: editor?.isActive('liveblockCommentMark')
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
			{sections[0].map((item, index) => {
				return (
					<ToolbarButton key={`toolbar-item-${item.label}-${index}`} {...item} />
				)
			})}
			<Separator
				orientation="vertical"
				className={'h-6 bg-neutral-300'}
			/>
			<FontFamilyButton />
			<Separator
				orientation="vertical"
				className={'h-6 bg-neutral-300'}
			/>
			<HeadingLevelButton />
			<Separator
				orientation="vertical"
				className={'h-6 bg-neutral-300'}
			/>
			<FontSizeButton />
			<Separator
				orientation="vertical"
				className={'h-6 bg-neutral-300'}
			/>
			{sections[1].map((item, index) => {
				return (
					<ToolbarButton key={`toolbar-item-${item.label}-${index}`} {...item} />
				)
			})}
			<TextColorButton />
			<HighlightColorButton />
			<Separator
				orientation="vertical"
				className={'h-6 bg-neutral-300'}
			/>
			<LinkButton />
			<ImageButton />
			<AlignButton />
			<LineHeightButton />
			<ListButton />
			{sections[2].map((item, index) => {
				return (
					<ToolbarButton key={`toolbar-item-${item.label}-${index}`} {...item} />
				)
			})}
		</div>
	);
};

