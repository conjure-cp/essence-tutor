import CodeEditor from "@/components/views/Editor";
import {saveFile} from "@/components/views/actions";
import {Lesson} from "@/components/views/Lesson";
import {Group, Panel, Separator} from "react-resizable-panels";

export default function Home() {
  return (
      <Group className="w-full">
          <Panel defaultSize="50%">
              <Lesson />
          </Panel>

          <Separator className="w-1.5 bg-base-300 transition-colors hover:bg-primary data-[resize-handle-state=drag]:bg-primary" />

          <Panel collapsible>
              <CodeEditor content="testing" onSave={saveFile}></CodeEditor>
          </Panel>
      </Group>

      // <>
      //
      //
      // </>
  );
}
