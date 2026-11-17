"use client";

import ReactCodeMirror from "@uiw/react-codemirror";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Check, CircleCheck, CircleX, Cross } from "lucide-react";

interface Task {
  title: string,
  description: string,
  complete: boolean,
  boilerplate?: string,
}

interface TaskAccordionProps {
  tasks: Task[],
}

export function TaskAccordion({ tasks }: TaskAccordionProps) {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <Accordion multiple>
          {
            tasks.map((t, i) => (
              <AccordionItem value={i} key={i} className="px-2">
                <AccordionTrigger>
                  <div className="w-full flex flex-row items-center justify-between mr-4">
                    <p><strong className="mr-4">Task {i + 1}</strong>{t.title}</p>
                    <div className="flex flex-row gap-2">
                      <Button variant="outline" size="xs">Check Answer</Button>
                      { t.complete ? <CircleCheck color="green" /> : <CircleX color="red" /> }
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{ t.description }</p>
                  { t.boilerplate && <ReactCodeMirror value={t.boilerplate} editable={false} readOnly={true} /> }
                </AccordionContent>
              </AccordionItem>
            ))
          }
        </Accordion>
      </CardContent>
    </Card>
  );
}
