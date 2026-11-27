"use client";

import ReactCodeMirror from "@uiw/react-codemirror";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronUp, CircleCheck, CircleQuestionMark, CircleX } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

export enum TaskState {
  UNKNOWN = 0,
  WAITING = 1,
  FAILURE = 2,
  COMPLETE = 3
}

export interface Task {
  number: number,
  title?: string,
  description?: string,
  state?: TaskState,
  boilerplate?: string,
}

export interface TaskListProps {
  tasks: Task[],
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <Card className="p-0">
      <CardContent className="w-full p-0">
        {
          tasks.map((v, i) => (
            <TaskListItem task={v} key={i} />
          ))
        }
      </CardContent>
    </Card>
  );
}

function TaskListItem({ task }: { task: Task }) {
  const [taskState, setTaskState] = useState(task.state || TaskState.UNKNOWN);

  return (
    <Collapsible className="w-full px-4 py-2 not-last:border-b-1">
      <div className="w-full flex justify-between items-center">
        <CollapsibleTrigger className="hover:cursor-pointer"><strong className="mr-2">Task {task.number}</strong><span className="hover:underline">{task.title}</span></CollapsibleTrigger>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setTaskState(TaskState.WAITING)}>Check Answer</Button>
          
          {
            taskState == TaskState.COMPLETE ? <CircleCheck color="green" />
                                            : taskState == TaskState.FAILURE ? <CircleX color="red" />
                                                                             : taskState == TaskState.WAITING ? <Spinner className="size-6" />
                                                                                                              : <CircleQuestionMark color="orange" />
          }
          
          <CollapsibleTrigger render={
            <Button className="hover:cursor-pointer" variant="secondary" size="icon-sm"><ChevronUp className="group-data-panel-open/button:rotate-180" /></Button>
          } />
        </div>
      </div>

      <CollapsibleContent className="py-2">
        {task.description}
        {task.boilerplate && <ReactCodeMirror value={task.boilerplate} readOnly={true} editable={false} />}
      </CollapsibleContent>
    </Collapsible>
  )
}
