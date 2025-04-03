import React from 'react';
import { useEditorStore } from "@/store/use-editor-store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
	ListIcon, ListOrderedIcon
} from "lucide-react";


export const ListButton = () => {
	const { editor } = useEditorStore()

	const lists = [
		{
			label: "Bullet List",
			icon: ListIcon,
			isActive: () => editor?.isActive("bulletList"),
			onClick: () => editor?.chain().focus().toggleBulletList().run()
		},
		{
			label: "Ordered List",
			icon: ListOrderedIcon,
			isActive: () => editor?.isActive("orderedList"),
			onClick: () => editor?.chain().focus().toggleOrderedList().run(),
		}
	]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className={'px-1.5 hover:bg-neutral-200/80 text-sm rounded-sm justify-center items-center flex shrink-0 min-w-7 h-7'}>
					<ListIcon className={'size-4'} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={'p-1 flex flex-col gap-y-1'}
			>
				{lists.map(({ label, onClick, isActive, icon: Icon }) => (
					<button
						key={label}
						onClick={onClick}
						className={cn(
							'flex flex-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
							isActive() && 'bg-neutral-200/80'
						)}
					>
						<Icon className={'size-4'} />
						<span className={'text-sm'}>{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
