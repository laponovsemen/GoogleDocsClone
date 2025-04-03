
'use client'

import { Toolbar } from '@/app/documents/[documentId]/toolbar';
import { Navbar } from './navbar/navbar';
import { usePreloadedQuery, type Preloaded } from 'convex/react';
import type { api } from '../../../../convex/_generated/api';
import { Editor } from '@/app/documents/[documentId]/editor';
import { Room } from '@/app/room';


interface DocumentPageProps {
    preloadedDocument: Preloaded<typeof api.documents.getById>
}


export const Document = ({ preloadedDocument }: DocumentPageProps) => {

    const document = usePreloadedQuery(preloadedDocument)

    return (
        <Room >

            <div className={'min-h-screen bg-[#FAFBFD]'}>
                <div className={'flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden h-[112px]'}>
                    <Navbar data={document} />
                    <Toolbar />
                </div>
                <div className={'pt-[114px] print:pt-0'}>
                    <Editor initialContent={document.initialContent} />
                </div>
            </div>
        </Room>

    );
};
