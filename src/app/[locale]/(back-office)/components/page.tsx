import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shared/ui';

import { InteractiveShowcase } from './_interactive-showcase';

export default function ComponentsPage() {
  return (
    <div className="container mx-auto max-w-5xl space-y-10 py-10">
      <h1 className="text-3xl font-bold">Component Showcase</h1>
      <p className="text-muted-foreground">
        Installed shadcn/ui primitives available via <code>@shared/ui</code>.
      </p>

      <Separator />

      {/* Breadcrumb */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Breadcrumb</h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      {/* Button */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Button</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      {/* Badge */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Badge</h2>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      {/* Card */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Card</h2>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>A brief description of the card content.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card body content goes here.</p>
          </CardContent>
        </Card>
      </section>

      {/* Input + Label */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Input &amp; Label</h2>
        <div className="max-w-sm space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="user@example.com" />
        </div>
      </section>

      {/* Skeleton */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Skeleton</h2>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-50" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </section>

      {/* Table */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Table</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Alice</TableCell>
              <TableCell>alice@example.com</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bob</TableCell>
              <TableCell>bob@example.com</TableCell>
              <TableCell>Editor</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Carol</TableCell>
              <TableCell>carol@example.com</TableCell>
              <TableCell>Viewer</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <Separator />

      {/* Interactive primitives (client component) */}
      <InteractiveShowcase />
    </div>
  );
}
