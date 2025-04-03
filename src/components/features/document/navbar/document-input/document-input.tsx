import React, { useRef, useState } from 'react';
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import type { Id } from '../../../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../../../convex/_generated/api';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from 'sonner';
import { useStatus } from '@liveblocks/react';
import { LoaderIcon } from 'lucide-react';

interface DocumentInputProps {
	title: string;
	id: Id<'documents'>
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {

	const status = useStatus();
	const [value, setValue] = useState(title);
	const [isPending, setIsPending] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const inputRef = useRef<HTMLInputElement | null>(null)
	const mutate = useMutation(api.documents.updateById);
	const debouncedUpdate = useDebounce((newValue: string) => {
		if (newValue === title) return;

		setIsPending(true);
		mutate({ id, title: newValue })
			.then(() => toast.success('Document updated'))
			.catch(() => toast.error('Something went wrong'))
			.finally(() => setIsPending(false))

	}, 400)

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setValue(newValue);
		debouncedUpdate(newValue)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setIsPending(true);
		mutate({ id, title: value })
			.then(() => toast.success('Document updated'))
			.then(() => setIsEditing(false))
			.catch(() => toast.error('Something went wrong'))
			.finally(() => setIsPending(false))

	}

	const showLoader = isPending || status === 'reconnecting' || !(status === 'connected');
	const showError = status === 'disconnected'

	return (
		<div className={'flex items-center gap-2'}>
			{isEditing ? (
				<form
					className='relative w-fit max-w-[50ch]'
					onSubmit={handleSubmit}
				>
					<span className='invisible whitespace-pre px-1.5 text-lg'>
						{value || " "}
					</span>
					<input
						onBlur={() => setIsEditing(false)}
						type="text"
						value={value}
						onChange={onChange}
						className={'absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate'}
					/>
				</form>
			) : (
				<span
					onClick={() => {
						setIsEditing(true);
						setTimeout(() => {
							inputRef.current?.focus()
						}, 0)
					}}
					className={'flex text-lg px-1.5 cursor-pointer truncate '}
				>
					{title}
				</span>
			)}
			{showError && <BsCloudSlash className='size-4' />}
			{!showError && !showLoader && <BsCloudCheck className='size-4' />}
			{showLoader && <LoaderIcon className='size-4 animate-spin text-muted-foreground' />}
		</div>
	);
};

