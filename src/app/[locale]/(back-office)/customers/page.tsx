import { CustomersTable, type Customer } from './customers-table';

// Sample data — replace with a TanStack Query call to the (((app-backend-title))).
const customers: Customer[] = [
	{
		id: 'c_001',
		name: 'Ada Lovelace',
		email: 'ada@example.com',
		status: 'active',
		orders: 12,
		createdAt: '2025-01-14',
	},
	{
		id: 'c_002',
		name: 'Alan Turing',
		email: 'alan@example.com',
		status: 'active',
		orders: 7,
		createdAt: '2025-02-02',
	},
	{
		id: 'c_003',
		name: 'Grace Hopper',
		email: 'grace@example.com',
		status: 'pending',
		orders: 0,
		createdAt: '2025-03-19',
	},
	{
		id: 'c_004',
		name: 'Katherine Johnson',
		email: 'katherine@example.com',
		status: 'inactive',
		orders: 24,
		createdAt: '2024-11-08',
	},
	{
		id: 'c_005',
		name: 'Edsger Dijkstra',
		email: 'edsger@example.com',
		status: 'active',
		orders: 3,
		createdAt: '2025-04-27',
	},
];

export default function CustomersPage() {
	return (
		<section className="space-y-6">
			<header>
				<h1 className="text-2xl font-bold">Customers</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Manage and review your customer base.
				</p>
			</header>
			<CustomersTable data={customers} />
		</section>
	);
}
