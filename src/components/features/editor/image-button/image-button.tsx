import React, {useState} from 'react';
import {useEditorStore} from "@/store/use-editor-store";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ImageIcon,  SearchIcon, UploadIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";

export const ImageButton = () => {
	const {editor} = useEditorStore();
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>();
	const [imageUrl, setImageUrl] = useState<string>('');

	const onChange = (src: string) => {
		editor?.chain().focus().setImage({src}).run();
	}

	const onUpload = () => {
		const input = document.createElement("input");
		input.type = 'file'
		input.accept = 'image/*';

		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				const imageUrl = URL.createObjectURL(file);
				console.log(imageUrl, 'imageUrl')
				onChange(imageUrl);
			}
		}

		input.click();
	};

	const handleImageUrlSubmit = () => {
		if (imageUrl) {
			onChange(imageUrl);
			setImageUrl('');
			setIsDialogOpen(false)
		}
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						className={'px-1.5 hover:bg-neutral-200/80 rounded-sm justify-center items-center flex shrink-0 min-w-7 h-7'}
					>
						<ImageIcon className={'size-4'}/>
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={onUpload}>
						<UploadIcon className={'size-4 mr-2'}/>
						Upload
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
						<SearchIcon className={'size-4 mr-2'}/>
						Paste image url
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Insert image URL
						</DialogTitle>
					</DialogHeader>
					<Input
						placeholder="Enter image url"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						onKeyDown={(e) => {
							if(e.key === 'Enter') {
								handleImageUrlSubmit();
							}
						}}
					/>
					<DialogFooter>
						<Button onClick={handleImageUrlSubmit}>
							Insert
						</Button>
					</DialogFooter>
				</DialogContent>

			</Dialog>
		</>
	)

};
