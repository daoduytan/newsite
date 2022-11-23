import { type MDEditorProps } from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Props extends MDEditorProps {}

export function Editor(props: Props) {
  return <MDEditor {...props} />;
}
