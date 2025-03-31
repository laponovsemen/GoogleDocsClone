import React, {useState} from 'react';
import {useEditorStore} from "@/store/use-editor-store";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Link2Icon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export const LinkButton = () => {
	const {editor} = useEditorStore();
	const [value, setValue] = useState<string>(editor?.getAttributes('link').href ?? '');

	const onChange = (href: string) => {
		editor?.chain().focus().extendMarkRange('link').setLink({href}).run();
		setValue('');
	}

	return (
		<DropdownMenu onOpenChange={(open) => {
			if (open) {
				setValue(editor?.getAttributes('link').href ?? '');
			}
		}}>
			<DropdownMenuTrigger asChild>
				<button
					className={'px-1.5 hover:bg-neutral-200/80 rounded-sm justify-center items-center flex shrink-0 min-w-7 h-7'}>
					<Link2Icon className={'size-4'}/>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={'p-2.5 flex items-center gap-x-2'}
			>
				<Input
					placeholder={'Paste link'}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<Button onClick={() => onChange(value)}>Apply</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	)

};

