'use client';

import { type ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@shared/ui';
import { cn } from '@shared/utils/cn';

export interface Employee {
	id: string;
	name: string;
	email: string;
	role: string;
	department: string;
	active: boolean;
	hiredAt: string;
}

const columns: ColumnDef<Employee>[] = [
	{ accessorKey: 'name', header: 'Name' },
	{ accessorKey: 'email', header: 'Email' },
	{ accessorKey: 'role', header: 'Role' },
	{ accessorKey: 'department', header: 'Department' },
	{
		accessorKey: 'active',
		header: 'Status',
		cell: ({ row }) => {
			const active = row.original.active;
			return (
				<span
					className={cn(
						'inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
						active
							? 'bg-primary/10 text-foreground'
							: 'bg-muted text-muted-foreground',
					)}
				>
					{active ? 'Active' : 'Inactive'}
				</span>
			);
		},
	},
	{
		accessorKey: 'hiredAt',
		header: 'Hired',
		cell: ({ row }) => new Date(row.original.hiredAt).toLocaleDateString(),
	},
];

export function EmployeesTable({ data }: { data: Employee[] }) {
	return (
		<DataTable
			columns={columns}
			data={data}
			searchPlaceholder="Search employees…"
		/>
	);
}
