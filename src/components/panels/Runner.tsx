"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Runner } from "@/lib/runners/abstract";
import { AASRunner } from "@/lib/runners/aas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "../ui/select";
import { ButtonGroup } from "../ui/button-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { PlayIcon } from "lucide-react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { Model } from "@/lib/model";


interface WrapperProps {
  title: ReactNode,
  action?: ReactNode,
  children: ReactNode,
}

const Wrapper = ({ title, children, action }: WrapperProps) => {
  return (
    <div className="flex w-full h-full">
      <Card className="flex grow m-2 bg-secondary">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <CardAction>{action}</CardAction>
        </CardHeader>
        <CardContent className="rounded-xl overflow-y-scroll">{children}</CardContent>
      </Card>
    </div>
  ); 
}


interface EditorPanelProps {
  state?: string,
  setState: Dispatch<SetStateAction<string | undefined>>
};

const EditorPanel = ({ state, setState }: EditorPanelProps) => {
  return (
    <ReactCodeMirror value={state} onChange={setState} />
  );
};


interface OutputPanelProps {
  state?: string,
  setState: Dispatch<SetStateAction<string | undefined>>
}

const OutputPanel = ({ state, setState }: OutputPanelProps) => {
  return (
    <ReactCodeMirror value={state} editable={false} />
  );
}


interface RunnerPanelProps {
  initialEditorContent?: string,
  initialConsoleContent?: string
};

export const RunnerPanel = ({ initialEditorContent, initialConsoleContent }: RunnerPanelProps) => {
  const [runnerType, setRunnerType] = useState("aas");
  const [editorState, setEditorState] = useState(initialEditorContent);
  const [outputState, setOutputState] = useState(initialConsoleContent);

  const RUNNER_TYPES = [
    { label: "Conjure aaS", value: "aas" },
    { label: "Conjure Oxide", value: "oxide" }
  ];

  const solve = async () => {
    let model: Model = new Model(editorState || "", new Map<string, string>());
    let runner: Runner = new AASRunner();
    await runner.solve(model, "kissat");
    console.log(model);
    setOutputState(JSON.stringify(model.getSolutions() || ""));
  }
  const updateRunner = (type: string) => {
    switch (type) {
      case "aas":
        setRunnerType("aas");
        Runner.setInstance(new AASRunner());
        break;
      case "oxide":
        setRunnerType("oxide");
        break;
      default:
        throw new Error("invalid runner type");
    }
  }

  const SolveAction = () => {
    return (
      <ButtonGroup>
        <Select
          items={RUNNER_TYPES}
          value={runnerType}
          onValueChange={(value: string | null) => updateRunner(value as string)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {RUNNER_TYPES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        
        <Tooltip>
          <TooltipTrigger render={
            <Button aria-label="Run" variant="outline" onClick={solve}>
              <PlayIcon color="green" />
            </Button>
          } />
          <TooltipContent>
            <p>Run Model</p>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    );
  }

  return (
    <ResizablePanelGroup orientation="vertical">
      
      <ResizablePanel defaultSize="75%">
        <Wrapper title="Editor" action={<SolveAction />}>
          <EditorPanel state={editorState} setState={setEditorState} />
        </Wrapper>
      </ResizablePanel>
    
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize="25%">
        <Wrapper title="Output">
          <OutputPanel state={outputState} setState={setOutputState} />
        </Wrapper>
      </ResizablePanel>
    
    </ResizablePanelGroup>
  );
};
