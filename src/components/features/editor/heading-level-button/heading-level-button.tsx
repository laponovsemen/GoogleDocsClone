import React, { useMemo } from 'react';
import { useEditorStore } from "@/store/use-editor-store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import type { Level } from "@tiptap/extension-heading";

type HeadingLevelType = {
	label: string;
	value: Level | 0;
	fontSize: string;
}

export const HeadingLevelButton = () => {
	const { editor } = useEditorStore();
	const headings: HeadingLevelType[] = useMemo(() => ([
		{ label: "Normal text", value: 0, fontSize: "16px" },
		{ label: "Heading 1", value: 1, fontSize: "32px" },
		{ label: "Heading 2", value: 2, fontSize: "24px" },
		{ label: "Heading 3", value: 3, fontSize: "20px" },
		{ label: "Heading 4", value: 4, fontSize: "18px" },
		{ label: "Heading 5", value: 5, fontSize: "16px" },
	]), []);

	const getCurrentHeading = () => {
		for (let level = 0; level <= 5; level++) {
			if (editor?.isActive('heading', { level })) {
				return `Heading ${level}`;
			}
		}
		return 'Normal text'
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className={
					cn(
						'h-7 min-w-7 shrink-0 flex items-center justify-center text-sm overflow-hidden px-1.5 hover:bg-neutral-200/80 rounded-sm '
					)
				}>
					<span className={'truncate'}>
						{getCurrentHeading()}
					</span>
					<ChevronDownIcon className={'ml-2 size-4 shrink-0'} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={'p-1 flex flex-col gap-y-1'}>
				{
					headings.map(({ value, fontSize, label }) => (
						<button
							key={value}
							style={{ fontSize }}
							onClick={() => {
								if (value === 0) {
									editor?.chain().focus().setParagraph().run();
								} else {
									editor?.chain().focus().toggleHeading({ level: value }).run()
								}
							}}
							className={cn(
								'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
								(value === 0 && !editor?.isActive('heading')) || editor?.isActive('heading', { level: value }) && 'bg-neutral-200/80',
							)}
						>
							<span>{label}</span>
						</button>
					))
				}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

