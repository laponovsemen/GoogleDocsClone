import React from 'react';
import {useParams} from "next/navigation";
import {Editor} from "@/app/documents/[documentId]/editor";
import { Toolbar } from './toolbar';



interface DocumentIdPageProps {
	params: Promise<{documentId: string}>
}


const DocumentIdPage = async ({params}: DocumentIdPageProps) => {
	const documentId = (await params).documentId; // React.use(params) on client

	return (
		<div className={'min-h-screen bg-[#FAFBFD]'}>
			<Toolbar />
			<Editor />
		</div>
	);
};

export default DocumentIdPage;
