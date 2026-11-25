"use client";

import ReactCodeMirror from "@uiw/react-codemirror";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Check, ChevronsUp, ChevronsUpDown, ChevronUp, CircleCheck, CircleQuestionMark, CircleX, Cross } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export enum TaskState {
  UNKNOWN = 0,
  ERROR = 1,
  SUCCESS = 2
}

export interface Task {
  title: string,
  description: string,
  state: TaskState,
  boilerplate?: string,
}

interface TaskAccordionProps {
  tasks: Task[],
}

export function TaskAccordion({ tasks }: TaskAccordionProps) {
  console.log(tasks);
  return (
    <Card className="p-0">
      <CardContent className="w-full p-0">
        {
          tasks.map((v, i) => (
            <Collapsible key={i} className="w-full p-3 not-last:border-b-1">
              <div className="w-full flex justify-between items-center">
                <p><strong className="pr-4">Task {i + 1}</strong>{v.title}</p>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={() => alert(v.state)}>Check Answer</Button>
                  { v.state == TaskState.SUCCESS ? <CircleCheck color="green" /> : v.state == TaskState.ERROR ? <CircleX color="red" /> : <CircleQuestionMark color="orange" /> }
                  <CollapsibleTrigger render={<Button variant="ghost" size="icon"><ChevronUp className="group-data-panel-open/button:rotate-180" /></Button>} />
                </div>
              </div>
              
              <CollapsibleContent className="my-2">
                <p>
                  {v.description}
                </p>
                { v.boilerplate && <ReactCodeMirror value={v.boilerplate} readOnly={true} editable={false} /> }
              </CollapsibleContent>
            </Collapsible>
          ))
        }
      </CardContent>
    </Card>
  );
}
