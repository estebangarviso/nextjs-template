'use client';

import { type ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@shared/ui';
import { cn } from '@shared/utils/cn';

export type CustomerStatus = 'active' | 'inactive' | 'pending';

export interface Customer {
	id: string;
	name: string;
	email: string;
	status: CustomerStatus;
	orders: number;
	createdAt: string;
}

const STATUS_STYLES: Record<CustomerStatus, string> = {
	active: 'bg-primary/10 text-foreground',
	inactive: 'bg-muted text-muted-foreground',
	pending: 'bg-destructive/10 text-destructive',
};

const columns: ColumnDef<Customer>[] = [
	{ accessorKey: 'name', header: 'Name' },
	{ accessorKey: 'email', header: 'Email' },
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.original.status;
			return (
				<span
					className={cn(
						'inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize',
						STATUS_STYLES[status],
					)}
				>
					{status}
				</span>
			);
		},
	},
	{
		accessorKey: 'orders',
		header: 'Orders',
		cell: ({ row }) => (
			<span className="tabular-nums">{row.original.orders}</span>
		),
	},
	{
		accessorKey: 'createdAt',
		header: 'Created',
		cell: ({ row }) =>
			new Date(row.original.createdAt).toLocaleDateString(),
	},
];

export function CustomersTable({ data }: { data: Customer[] }) {
	return (
		<DataTable
			columns={columns}
			data={data}
			searchPlaceholder="Search customers…"
		/>
	);
}
