import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import React from "react";
import MenuBar from "./MenuBar";

const TipTap = ({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder: "Write something ...",
      }),
      Image,
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert bg-neutral-900 p-3 rounded-md min-h-[400px] min-w-full border border-zinc-800 overflow-auto resize-y focus:outline-none focus:border-white border-t-none",
      },
    },
    onUpdate({ editor }) {
      const value = editor.getHTML() === "<p></p>" ? "" : editor.getHTML();
      onChange(value);
    },
  });
  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default TipTap;
