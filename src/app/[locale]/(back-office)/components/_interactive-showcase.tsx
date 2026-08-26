'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Button,
} from '@shared/ui';

export function InteractiveShowcase() {
  return (
    <>
      {/* Tabs */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Tabs</h2>
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">Tab One</TabsTrigger>
            <TabsTrigger value="two">Tab Two</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Content for tab one.</TabsContent>
          <TabsContent value="two">Content for tab two.</TabsContent>
        </Tabs>
      </section>

      {/* Toggle */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Toggle</h2>
        <Toggle aria-label="Toggle bold">Bold</Toggle>
      </section>

      {/* Tooltip */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Tooltip</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </section>

      {/* Avatar */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Avatar</h2>
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </div>
      </section>

      {/* Accordion */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Accordion</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles via Tailwind CSS.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Dialog */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Dialog</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a demonstration of the Dialog primitive.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>

      {/* Select */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Select</h2>
        <Select>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Pick a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>
      </section>
    </>
  );
}
