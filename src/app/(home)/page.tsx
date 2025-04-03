'use client'

import React from 'react';
import { Navbar } from '@/components/features/home/navbar';
import { TemplateGallery } from '@/components/features/home/template-gallery/template-gallery';
import { api } from '../../../convex/_generated/api'
import { usePaginatedQuery } from "convex/react";
import { DocumentsTable } from '@/components/features/home/documents-table/documents-table';
import { useSearchParam } from '@/hooks/use-search-param';

const Home = () => {
	const [search] = useSearchParam('search')
	const { results, status, loadMore } = usePaginatedQuery(api.documents.getDocuments, { search }, {
		initialNumItems: 5,
	})

	console.log('search', search)
	return (
		<div className={"flex min-h-screen flex-col"}>
			<div className={'fixed top-0 left-0 z-10 h-16 bg-white p-4 w-full'}>
				<Navbar />
			</div>
			<div className={'mt-16'}>
				<TemplateGallery />
				<DocumentsTable
					documents={results}
					loadMore={loadMore}
					status={status}
				/>
			</div>

		</div>
	);
};

export default Home;
