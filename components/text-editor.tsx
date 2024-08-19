"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { cn } from "@/lib/utils"

interface TextEditorProps {
  className?: string
  value: string
  onChange: (value: string) => void
}

export const TextEditor = ({ className, value, onChange }: TextEditorProps) => {
  const editor = useEditor({
    content: value,
    editorProps: {
      attributes: {
        class: cn("outline-none focus:outline-none prose"),
      },
    },
    extensions: [
      StarterKit.configure({
        code: {
          HTMLAttributes: {
            class: "border rounded-xl px-3 py-2 no-before no-after",
          },
        },
      }),
    ],
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  return (
    <EditorContent
      editor={editor}
      className={cn(
        "scrollY no-before no-after prose max-h-[200px] max-w-full overflow-y-auto rounded-xl border border-input px-3 py-2 prose-p:text-sm prose-p:text-foreground",
        className,
      )}
      placeholder="description product"
      spellCheck="false"
      autoComplete="off"
      autoCorrect="off"
    />
  )
}
