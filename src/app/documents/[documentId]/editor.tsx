'use client'

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Underline from "@tiptap/extension-underline";
import { useEditorStore } from "@/store/use-editor-store";
import { FontFamily } from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import Link from '@tiptap/extension-link'
import { TextAlign } from "@tiptap/extension-text-align";
import { FontSizeExtension } from "@/extension/font-size";
import { LineHeightExtension } from '@/extension/line-height';
import { Ruler } from '@/components/features/editor/ruler/ruler';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap'
import { Threads } from './threads';
import { useStorage } from '@liveblocks/react/suspense';
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/constants/margins';


interface EditorProps {
	initialContent?: string
}

export const Editor = ({ initialContent }: EditorProps) => {
	const leftMargin = useStorage((root) => root.leftMargin)
	const rightMargin = useStorage((root) => root.rightMargin)
	const liveblocks = useLiveblocksExtension({
		initialContent,
		offlineSupport_experimental: true,
	})
	const { setEditor } = useEditorStore()
	const editor = useEditor({
		onCreate({ editor }) {
			setEditor(editor)
		},
		onUpdate({ editor }) {
			setEditor(editor);
		},
		onDestroy() {
			setEditor(null)
		},
		onSelectionUpdate({ editor }) {
			setEditor(editor);
		},
		onTransaction({ editor }) {
			setEditor(editor);
		},
		onFocus({ editor }) {
			setEditor(editor);
		},
		onBlur({ editor }) {
			setEditor(editor);
		},
		onContentError({ editor }) {
			setEditor(editor)
		},
		immediatelyRender: false,
		extensions: [
			StarterKit.configure({
				history: false
			}),
			liveblocks,
			FontSizeExtension,
			LineHeightExtension.configure({
				types: ['heading', 'paragraph'],
				defaultLineHeight: 'normal'
			}),
			Table,
			TableRow,
			TableCell,
			TableHeader,
			TaskList,
			Image,
			Underline,
			FontFamily,
			TextStyle,
			Color,
			TextAlign.configure({
				types: ['heading', 'paragraph']
			}),
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: 'https'
			}),
			Highlight.configure({
				multicolor: true
			}),
			TaskItem.configure({
				nested: true
			})],
		content: '<span>asasas</span>',
		editorProps: {
			attributes: {
				style: `padding-left: ${leftMargin ?? LEFT_MARGIN_DEFAULT}px; padding-right: ${rightMargin ?? RIGHT_MARGIN_DEFAULT}px;`,
				class: 'focus:outline-none print:border-0 border bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pb-10 pr-14 cursor-text'
			}
		}
	})

	return (
		<div className={'size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible'}>
			<Ruler />
			<div
				className={'min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'}>
				<EditorContent editor={editor} />
				<Threads editor={editor} />
			</div>
		</div>
	);
};

