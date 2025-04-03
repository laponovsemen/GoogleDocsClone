import React from 'react';
import {cn} from "@/lib/utils";
import {LoaderIcon} from "lucide-react";


interface FullScreenLoaderProps {
	label?: string;
}


export const FullScreenLoader = ({label} : FullScreenLoaderProps) => {
	return (
		<div className={cn(
			'min-h-screen flex flex-col items-center justify-center gap-2',
		)}>
			<LoaderIcon className={'size-6 text-muted-foreground animate-spin'}/>
			{label && <p className={'text-sm text-muted-foreground'}>{label}</p>}
		</div>
	);
};

