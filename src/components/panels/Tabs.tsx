"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wrapper } from "@/components/Wrapper"

export function TabsLine({
  code,
  parameters,
}: {
  code: React.ReactNode
  parameters: React.ReactNode
}) {
  return (
    <Tabs defaultValue="code" className="flex h-full w-full flex-col">
        <Wrapper
            button
            header={
                <TabsList variant="line" className="text-white">
                    <TabsTrigger value="code" className="text-base font-bold">
                        Code
                    </TabsTrigger>
                    <TabsTrigger value="parameters" className="text-base font-bold">
                        Parameters
                    </TabsTrigger>
                </TabsList>
            }>
            <TabsContent value="code" className="h-full">
                {code}
            </TabsContent>
            <TabsContent value="parameters" className="h-full overflow-auto">
                {parameters}
            </TabsContent>
        </Wrapper>
    </Tabs>
  )
}