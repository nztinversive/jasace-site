"use client";

import { useEffect, type MouseEvent, type ReactNode } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { normalizeEditorHtml } from "@/lib/blog-content";

function ToolbarButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      data-active={active}
      onClick={onClick}
      className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-stone-800 bg-stone-950 px-3 text-sm font-semibold text-stone-300 transition-colors hover:border-stone-700 hover:text-stone-50 disabled:cursor-not-allowed disabled:opacity-40 data-[active=true]:border-terra/50 data-[active=true]:bg-terra/10 data-[active=true]:text-terra"
    >
      {children}
    </button>
  );
}

function BoldIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 5h6a4 4 0 0 1 0 8H7z" />
      <path d="M7 13h7a4 4 0 0 1 0 8H7z" />
    </svg>
  );
}

function ItalicIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4H10" />
      <path d="M14 20H9" />
      <path d="M14 4 10 20" />
    </svg>
  );
}

function BulletListIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="5" cy="7" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="5" cy="17" r="1.5" fill="currentColor" stroke="none" />
      <path d="M10 7h9" />
      <path d="M10 12h9" />
      <path d="M10 17h9" />
    </svg>
  );
}

function OrderedListIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 7h10" />
      <path d="M10 12h10" />
      <path d="M10 17h10" />
      <path d="M4 6h2v4" />
      <path d="M3.5 17.5c.5-.7 1.3-1 2-1 .8 0 1.5.5 1.5 1.3 0 1.7-3 1.5-3 3.2h3" />
    </svg>
  );
}

function BlockquoteIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 8H5v6h4l-2 4" />
      <path d="M19 8h-4v6h4l-2 4" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11 4" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L13 20" />
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 14 4 9l5-5" />
      <path d="M20 20a8 8 0 0 0-8-8H4" />
    </svg>
  );
}

function RedoIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 14 5-5-5-5" />
      <path d="M4 20a8 8 0 0 1 8-8h8" />
    </svg>
  );
}

function setLink(editor: Editor) {
  const previousUrl = editor.getAttributes("link").href as string | undefined;
  const nextUrl = window.prompt("Enter a URL for this link.", previousUrl ?? "https://");

  if (nextUrl === null) {
    return;
  }

  if (!nextUrl.trim()) {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }

  editor.chain().focus().extendMarkRange("link").setLink({ href: nextUrl.trim() }).run();
}

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["http", "https", "mailto"],
      }),
      Image,
      Placeholder.configure({
        placeholder: "Write the full article content here...",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "tiptap-editor min-h-[300px] px-5 py-4 text-sm leading-7 text-stone-200 focus:outline-none",
        spellcheck: "true",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(normalizeEditorHtml(currentEditor.getHTML()));
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentValue = normalizeEditorHtml(editor.getHTML());
    const nextValue = normalizeEditorHtml(value);

    if (currentValue !== nextValue) {
      editor.commands.setContent(nextValue || "", { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="rounded-3xl border border-stone-800 bg-stone-950">
        <div className="border-b border-stone-800 px-5 py-4 text-sm text-stone-500">Loading editor...</div>
        <div className="min-h-[300px] px-5 py-4 text-sm text-stone-500" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
      <div className="flex flex-wrap gap-2 border-b border-stone-800 bg-stone-900/70 px-4 py-3">
        <ToolbarButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <BoldIcon />
        </ToolbarButton>
        <ToolbarButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <ItalicIcon />
        </ToolbarButton>
        <ToolbarButton label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <span className="text-xs tracking-wide">H2</span>
        </ToolbarButton>
        <ToolbarButton label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <span className="text-xs tracking-wide">H3</span>
        </ToolbarButton>
        <ToolbarButton label="Bullet List" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <BulletListIcon />
        </ToolbarButton>
        <ToolbarButton label="Ordered List" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <OrderedListIcon />
        </ToolbarButton>
        <ToolbarButton label="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <BlockquoteIcon />
        </ToolbarButton>
        <ToolbarButton label="Link" active={editor.isActive("link")} onClick={() => setLink(editor)}>
          <LinkIcon />
        </ToolbarButton>
        <ToolbarButton
          label="Undo"
          disabled={!editor.can().chain().focus().undo().run()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoIcon />
        </ToolbarButton>
        <ToolbarButton
          label="Redo"
          disabled={!editor.can().chain().focus().redo().run()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoIcon />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
