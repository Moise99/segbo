// components/RichTextEditor.tsx
'use client';

import { Button } from '@/components/ui/button';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Heading2, Italic, List, ListOrdered } from 'lucide-react';
//import { useState } from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({
    value,
    onChange,
}: RichTextEditorProps) {
    //const [debugHtml, setDebugHtml] = useState('');

    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-5xl m-2 focus:outline-none min-h-[150px]',
            },
        },
    });

    if (!editor) return null;

    return (
        <div className="rounded-md border">
            {/* Toolbar */}
            <div
                className="flex space-x-1 border-b bg-gray-50 p-2"
                role="toolbar"
            >
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-gray-200' : ''}
                    aria-pressed={editor.isActive('bold')}
                >
                    <Bold className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-gray-200' : ''}
                    aria-pressed={editor.isActive('italic')}
                >
                    <Italic className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={
                        editor.isActive('heading', { level: 2 })
                            ? 'bg-gray-200'
                            : ''
                    }
                    aria-pressed={editor.isActive('heading', { level: 2 })}
                >
                    <Heading2 className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={
                        editor.isActive('bulletList') ? 'bg-gray-200' : ''
                    }
                    aria-pressed={editor.isActive('bulletList')}
                >
                    <List className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        editor.isActive('orderedList') ? 'bg-gray-200' : ''
                    }
                    aria-pressed={editor.isActive('orderedList')}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>

                {/* Bouton debug */}
                {/* <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setDebugHtml(editor.getHTML())}
                >
                    <Bug className="h-4 w-4" />
                </Button> */}
            </div>

            {/* Zone d'édition */}
            <EditorContent
                editor={editor}
                className="tiptap min-h-[150px] p-2"
            />

            {/* Zone debug affichant le HTML */}
            {/* {debugHtml && (
                <div className="p-2 border-t bg-gray-50 text-xs font-mono whitespace-pre-wrap">
                    {debugHtml}
                </div>
            )} */}
        </div>
    );
}
