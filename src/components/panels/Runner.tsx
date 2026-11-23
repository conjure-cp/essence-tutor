"use client";

import {Dispatch, Fragment, ReactNode, SetStateAction, useState} from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Runner } from "@/lib/runners/abstract";
import { AASRunner } from "@/lib/runners/aas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "../ui/select";
import { ButtonGroup } from "@/components/ui/button-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { Model } from "@/lib/model";
import {WASMRunner} from "@/lib/runners/wasm";

import {useTheme} from "next-themes";
import {CopyButton} from "@/components/ui/copy-button";
import {CopyAcrossButton} from "@/components/ui/copy-across";

interface WrapperProps {
  title: ReactNode,
  actions?: ReactNode[],
  children: ReactNode,
}

const Wrapper = ({ title, children, actions }: WrapperProps) => {
  return (
    <div className="flex w-full h-full">
      <Card className="flex felx-col grow m-2 bg-secondary min-h-0">
        <CardHeader className="flex items-center justify-between shrink-0">
          <CardTitle>{title}</CardTitle>
          {actions && actions.length > 0 && (
              <CardAction className="flex items-center gap-2">
                {actions.map((action, i) => (
                    <Fragment key={i}>{action}</Fragment>
                ))}
              </CardAction>
          )}
        </CardHeader>
        <CardContent className="flex-1 min-h-0 rounded-xl overflow-y-scroll">{children}</CardContent>
      </Card>
    </div>
  ); 
}


interface CodePanelProps {
  className?: string;
  theme?: "light" | "dark" | "none";
  state?: string,
  setState?: Dispatch<SetStateAction<string>>
}

const EditorPanel = ({ className = "border-1 h-full overflow-hidden rounded-xl", theme, state, setState }: CodePanelProps) => {
  return (
    <ReactCodeMirror className={className} height="100%" basicSetup={{lineNumbers: true}} theme={theme ?? "none"} value={state} onChange={setState} />
  );
};

const OutputPanel = ({ className =  "border-1 h-full overflow-hidden rounded-xl", theme, state, setState }: CodePanelProps) => {
  return (
    <ReactCodeMirror className={className} height="100%" basicSetup={{highlightActiveLine: false, highlightActiveLineGutter: false}} theme={theme ?? "none"} value={state} editable={false} />
  );
}

export const ExamplesPanel = ({ className =  "border-1 h-full overflow-hidden rounded-xl", theme, state, setState }: CodePanelProps ) => {
  return (
      <Wrapper title="Example" actions={[<CopyButton content={state} />, <CopyAcrossButton state={state ?? ""} setState={setState} />]}>
        <ReactCodeMirror className={className} height="100%" basicSetup={{highlightActiveLine: false, highlightActiveLineGutter: false}} theme={theme ?? "none"} value={state} editable={false} />
      </Wrapper>
  );
}

interface RunnerPanelProps {
  editorState: string,
  setEditorState: Dispatch<SetStateAction<string>>,
  initialConsoleContent?: string
}

export const RunnerPanel = ({ editorState, setEditorState, initialConsoleContent }: RunnerPanelProps) => {
  const [runnerType, setRunnerType] = useState("oxide");
  const [outputState, setOutputState] = useState(initialConsoleContent ?? "");

  const RUNNER_TYPES = [
    { label: "Local", value: "oxide" },
    { label: "Remote", value: "aas" }
  ];

  const solve = async () => {
    if (Runner.getInstance() == undefined) {
      updateRunner(runnerType);
    }

    let model: Model = new Model(editorState || "", new Map<string, string>());
    let runner: Runner = Runner.getInstance()!;

    await runner.solve(model, "minion");
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
        Runner.setInstance(new WASMRunner());
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

  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <ResizablePanelGroup orientation="vertical">
      
      <ResizablePanel defaultSize="75%">
        <Wrapper title="Editor" actions={[<CopyButton content={editorState} />, <SolveAction />]}>
          <EditorPanel theme={theme} state={editorState} setState={setEditorState} />
        </Wrapper>
      </ResizablePanel>
    
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize="25%">
        <Wrapper title="Output">
          <OutputPanel theme={theme} state={outputState} setState={setOutputState} />
        </Wrapper>
      </ResizablePanel>
    
    </ResizablePanelGroup>
  );
};
