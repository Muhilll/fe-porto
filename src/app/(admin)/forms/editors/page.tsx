"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
  Bold, Italic, UnderlineIcon, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Code, Minus, Undo, Redo,
  Highlighter, Type, Heading1, Heading2, Heading3,
} from "lucide-react";

const COLORS = ["#000000","#374151","#ef4444","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899"];

function ToolbarBtn({ onClick, active, disabled, children, title }) {
  return (
    <button type="button" title={title} onClick={onClick} disabled={disabled}
      className={`p-1.5 rounded-md transition-colors text-sm ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"} ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}

function Divider() { return <div className="w-px h-5 bg-border mx-0.5" />; }

function RichEditor({ placeholder = "Write something amazing…" }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
    ],
    content: `<h2>Welcome to the Rich Text Editor</h2><p>This is a <strong>full-featured</strong> editor powered by <em>Tiptap</em>. You can format text with <u>underline</u>, <mark>highlights</mark>, colors, lists, and more.</p><ul><li>Bold, Italic, Underline, Strikethrough</li><li>Headings (H1, H2, H3)</li><li>Ordered and unordered lists</li><li>Text alignment</li><li>Blockquotes and code blocks</li></ul>`,
    editorProps: { attributes: { class: "prose prose-sm max-w-none min-h-[200px] focus:outline-none px-4 py-3" } },
  });

  if (!editor) return null;

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-muted border-b border-border">
        {/* History */}
        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo"><Undo className="size-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo"><Redo className="size-4" /></ToolbarBtn>
        <Divider />
        {/* Headings */}
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="H1"><Heading1 className="size-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="H2"><Heading2 className="size-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="H3"><Heading3 className="size-4" /></ToolbarBtn>
        <Divider />
        {/* Formatting */}
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><Bold className="size-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><Italic className="size-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><UnderlineIcon className="size-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><Strikethrough className="size-4" /></ToolbarBtn>
        <Divider />
        {/* Color picker */}
        <div className="flex items-center gap-0.5">
          {COLORS.map((c) => (
            <button key={c} type="button" title={`Color: ${c}`}
              onClick={() => editor.chain().focus().setColor(c).run()}
              className={`size-4 rounded-full border-2 transition-transform hover:scale-110 ${editor.getAttributes("textStyle").color === c ? "border-gray-900" : "border-transparent"}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <ToolbarBtn onClick={() => editor.chain().focus().unsetColor().run()} title="Clear color"><Type className="size-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHighlight({ color: "#fde68a" }).run()} active={editor.isActive("highlight")} title="Highlight"><Highlighter className="size-4" /></ToolbarBtn>
        <Divider />
        {/* Alignment */}
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align left"><AlignLeft className="size-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align center"><AlignCenter className="size-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align right"><AlignRight className="size-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify"><AlignJustify className="size-4" /></ToolbarBtn>
        <Divider />
        {/* Lists */}
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list"><List className="size-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered list"><ListOrdered className="size-4" /></ToolbarBtn>
        <Divider />
        {/* Blocks */}
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote"><Quote className="size-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline code"><Code className="size-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code block"><Code className="size-[18px]" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule"><Minus className="size-4" /></ToolbarBtn>
      </div>
      {/* Editor */}
      <EditorContent editor={editor} />
      {/* Word count */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-muted border-t border-border text-xs text-muted-foreground">
        <span>{editor.storage.characterCount?.characters?.() ?? 0} characters</span>
        <span>{editor.getText().split(/\s+/).filter(Boolean).length} words</span>
      </div>
    </div>
  );
}

function MinimalEditor() {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "<p>Start typing your comment here...</p>",
    editorProps: { attributes: { class: "min-h-[100px] focus:outline-none px-3 py-2 text-sm" } },
  });
  if (!editor) return null;
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex items-center gap-1 px-2 py-1.5 bg-muted border-b border-border">
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold className="size-3.5" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic className="size-3.5" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")}><UnderlineIcon className="size-3.5" /></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List className="size-3.5" /></ToolbarBtn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

export default function EditorsPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Rich Text Editors</h1>
        <p className="text-muted-foreground">Fully featured WYSIWYG editors powered by <strong>Tiptap</strong> — with formatting, color, alignment, lists, and code blocks.</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <div>
            <h2 className="text-lg font-semibold">Full-featured Rich Text Editor</h2>
            <p className="text-sm text-muted-foreground">Complete toolbar with headings, formatting, color, alignment, lists, blockquotes, and code blocks.</p>
          </div>
          <RichEditor />
        </div>

        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <div>
            <h2 className="text-lg font-semibold">Minimal Editor</h2>
            <p className="text-sm text-muted-foreground">Compact editor for comments, notes, or short-form content — only essential formatting tools.</p>
          </div>
          <MinimalEditor />
        </div>
      </div>
    </div>
  );
}
