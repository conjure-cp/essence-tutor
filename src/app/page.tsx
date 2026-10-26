import CodeEditor from "@/views/Editor";
import {saveFile} from "@/views/actions";
import {Lesson} from "@/views/Lesson";

export default function Home() {
  return (
      <>
        <Lesson />
        <CodeEditor content="testing" onSave={saveFile}></CodeEditor>
      </>
  );
}
