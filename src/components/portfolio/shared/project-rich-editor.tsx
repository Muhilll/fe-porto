"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import ImageExtension from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { UploadService } from "@/features/portfolio/upload/upload-service";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  FileCode,
  Minus,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ImageIcon,
  Upload,
  Link as LinkIcon,
  Unlink,
  RemoveFormatting,
  Eye,
  Edit3,
  Loader2,
  HelpCircle,
} from "lucide-react";

interface ProjectRichEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

function ToolbarBtn({
  onClick,
  active,
  disabled,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`p-1.5 rounded-lg text-xs transition-colors flex items-center justify-center ${
        active
          ? "bg-foreground text-background font-semibold shadow-xs"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      } ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-4 bg-border/70 mx-1 shrink-0" />;
}

export function ProjectRichEditor({
  content,
  onChange,
  placeholder = "Tulis detail studi kasus proyek, arsitektur, fitur, dan dokumentasi...",
  minHeight = "280px",
}: ProjectRichEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlDialog, setShowUrlDialog] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrlInput, setLinkUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 dark:text-blue-400 underline underline-offset-4 hover:opacity-80",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      ImageExtension.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-xl border border-border shadow-sm my-4 max-w-full h-auto",
        },
      }),
      TextStyle,
      Color,
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class: `prose prose-sm dark:prose-invert max-w-none focus:outline-none p-4 text-sm leading-relaxed`,
        style: `min-height: ${minHeight};`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync content when external content changes (e.g. edit mode opened)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div
        className="rounded-xl border border-border bg-muted/20 flex items-center justify-center text-xs text-muted-foreground"
        style={{ minHeight }}
      >
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        Memuat Editor...
      </div>
    );
  }

  // Handle image file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await UploadService.uploadImage(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err: any) {
      alert(err.message || "Gagal mengunggah gambar");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle image insert by URL
  const handleInsertImageUrl = () => {
    if (imageUrlInput.trim()) {
      editor.chain().focus().setImage({ src: imageUrlInput.trim() }).run();
      setImageUrlInput("");
      setShowUrlDialog(false);
    }
  };

  // Handle link insert or toggle
  const handleOpenLinkDialog = () => {
    if (editor.isActive("link")) {
      // If already linked, toggle or open dialog with current href
      const previousUrl = editor.getAttributes("link").href || "";
      setLinkUrlInput(previousUrl);
    } else {
      setLinkUrlInput("");
    }
    setShowLinkDialog(true);
  };

  const handleApplyLink = () => {
    if (!linkUrlInput.trim()) {
      editor.chain().focus().unsetLink().run();
    } else {
      let finalUrl = linkUrlInput.trim();
      if (!/^https?:\/\//i.test(finalUrl) && !finalUrl.startsWith("#") && !finalUrl.startsWith("mailto:")) {
        finalUrl = `https://${finalUrl}`;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: finalUrl })
        .run();
    }
    setLinkUrlInput("");
    setShowLinkDialog(false);
  };

  return (
    <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-xs focus-within:border-foreground/40 transition-colors">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1 p-2 bg-muted/40 border-b border-border text-xs">
        <div className="flex flex-wrap items-center gap-0.5">
          {/* History */}
          <ToolbarBtn
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          {/* Headings */}
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive("heading", { level: 2 })}
            title="Heading 2 (Judul Besar)"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive("heading", { level: 3 })}
            title="Heading 3 (Sub-Judul)"
          >
            <Heading3 className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          {/* Formats */}
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Tebal (Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Miring (Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Garis Bawah (Ctrl+U)"
          >
            <UnderlineIcon className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Coretan (Strikethrough)"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            active={editor.isActive("highlight")}
            title="Sorot Warna / Highlight"
          >
            <Highlighter className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          {/* Alignments */}
          <ToolbarBtn
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            title="Rata Kiri"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            title="Rata Tengah"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            title="Rata Kanan"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            active={editor.isActive({ textAlign: "justify" })}
            title="Rata Kanan Kiri (Justify)"
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          {/* Lists & Quotes */}
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Daftar Poin (Bullet List)"
          >
            <List className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Daftar Angka (Numbered List)"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Kutipan (Blockquote)"
          >
            <Quote className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          {/* Code */}
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
            title="Kode Baris (Inline Code)"
          >
            <Code className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Blok Kode (Code Block)"
          >
            <FileCode className="w-3.5 h-3.5" />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Garis Pembatas (Divider)"
          >
            <Minus className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          {/* Link */}
          <ToolbarBtn
            onClick={handleOpenLinkDialog}
            active={editor.isActive("link")}
            title="Tautan / Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </ToolbarBtn>
          {editor.isActive("link") && (
            <ToolbarBtn
              onClick={() => editor.chain().focus().unsetLink().run()}
              title="Hapus Tautan (Unlink)"
            >
              <Unlink className="w-3.5 h-3.5 text-red-500" />
            </ToolbarBtn>
          )}

          <ToolbarBtn
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            title="Hapus Pemformatan (Clear Formatting)"
          >
            <RemoveFormatting className="w-3.5 h-3.5" />
          </ToolbarBtn>

          <Divider />

          {/* Image Upload & Link */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            title="Unggah Screenshot / Gambar"
            className="p-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
          >
            {isUploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-foreground" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline text-[11px] font-mono">Upload Foto</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => setShowUrlDialog((prev) => !prev)}
            title="Sisipkan Gambar dari URL"
            className="p-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-mono">URL Foto</span>
          </button>
        </div>

        {/* Mode Toggle (Edit / Preview) */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsPreview((p) => !p)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              isPreview
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {isPreview ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isPreview ? "Edit Mode" : "Preview"}</span>
          </button>
        </div>
      </div>

      {/* Link Dialog Drawer */}
      {showLinkDialog && (
        <div className="p-3 bg-muted/60 border-b border-border flex items-center gap-2 text-xs animate-in fade-in">
          <LinkIcon className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="url"
            value={linkUrlInput}
            onChange={(e) => setLinkUrlInput(e.target.value)}
            placeholder="https://github.com/proyek-anda atau https://..."
            className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-foreground"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleApplyLink())}
            autoFocus
          />
          <button
            type="button"
            onClick={handleApplyLink}
            className="px-3 py-1.5 rounded-lg bg-foreground text-background font-medium hover:opacity-90 cursor-pointer"
          >
            Terapkan
          </button>
          {editor.isActive("link") && (
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setShowLinkDialog(false);
              }}
              className="px-2 py-1.5 text-red-500 hover:underline cursor-pointer"
            >
              Hapus Link
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowLinkDialog(false)}
            className="px-2 py-1.5 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            Batal
          </button>
        </div>
      )}

      {/* URL Image Dialog Drawer */}
      {showUrlDialog && (
        <div className="p-3 bg-muted/60 border-b border-border flex items-center gap-2 text-xs animate-in fade-in">
          <ImageIcon className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="url"
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            placeholder="https://images.unsplash.com/... atau URL foto"
            className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-foreground"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleInsertImageUrl())}
            autoFocus
          />
          <button
            type="button"
            onClick={handleInsertImageUrl}
            className="px-3 py-1.5 rounded-lg bg-foreground text-background font-medium hover:opacity-90 cursor-pointer"
          >
            Sisipkan
          </button>
          <button
            type="button"
            onClick={() => setShowUrlDialog(false)}
            className="px-2 py-1.5 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            Batal
          </button>
        </div>
      )}

      {/* Content Area */}
      {isPreview ? (
        <div
          className="p-6 prose prose-sm dark:prose-invert max-w-none bg-background overflow-y-auto"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{
            __html: editor.getHTML() || "<p class='text-muted-foreground italic'>Belum ada konten ditulis.</p>",
          }}
        />
      ) : (
        <EditorContent editor={editor} />
      )}

      {/* Bottom Info Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-t border-border/60 text-[11px] font-mono text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>
            {editor.getText().trim().split(/\s+/).filter(Boolean).length} kata
          </span>
          <span>•</span>
          <span>{editor.getText().length} karakter</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px]">
          <HelpCircle className="w-3 h-3" />
          <span className="hidden sm:inline">Mendukung heading, bullet/numbered list, link, highlight, dan gambar</span>
        </div>
      </div>
    </div>
  );
}
