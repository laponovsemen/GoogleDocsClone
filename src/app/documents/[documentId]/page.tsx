import React from 'react';
import {useParams} from "next/navigation";
import {Editor} from "@/app/documents/[documentId]/editor";
import { Toolbar } from './toolbar';
import {Navbar} from "@/components/features/document/navbar/navbar";



interface DocumentIdPageProps {
	params: Promise<{documentId: string}>
}


const DocumentIdPage = async ({params}: DocumentIdPageProps) => {
	const documentId = (await params).documentId; // React.use(params) on client

	return (
		<div className={'min-h-screen bg-[#FAFBFD]'}>
			<div className={'flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden h-[112px]'}>
				<Navbar />
				<Toolbar />
			</div>
			<div className={'pt-[114px] print:pt-0'}>
				<Editor />
			</div>
		</div>
	);
};

export default DocumentIdPage;
