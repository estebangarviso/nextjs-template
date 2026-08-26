import { EmployeesTable, type Employee } from './employees-table';

// Sample data — replace with a TanStack Query call to the (((app-backend-title))).
const employees: Employee[] = [
	{
		id: 'e_001',
		name: 'Margaret Hamilton',
		email: 'margaret@example.com',
		role: 'Engineering Lead',
		department: 'Engineering',
		active: true,
		hiredAt: '2023-06-01',
	},
	{
		id: 'e_002',
		name: 'Tim Berners-Lee',
		email: 'tim@example.com',
		role: 'Architect',
		department: 'Platform',
		active: true,
		hiredAt: '2022-09-12',
	},
	{
		id: 'e_003',
		name: 'Barbara Liskov',
		email: 'barbara@example.com',
		role: 'Principal Engineer',
		department: 'Engineering',
		active: true,
		hiredAt: '2021-03-23',
	},
	{
		id: 'e_004',
		name: 'Dennis Ritchie',
		email: 'dennis@example.com',
		role: 'Systems Engineer',
		department: 'Infrastructure',
		active: false,
		hiredAt: '2020-01-15',
	},
	{
		id: 'e_005',
		name: 'Radia Perlman',
		email: 'radia@example.com',
		role: 'Network Engineer',
		department: 'Infrastructure',
		active: true,
		hiredAt: '2024-02-05',
	},
];

export default function EmployeesPage() {
	return (
		<section className="space-y-6">
			<header>
				<h1 className="text-2xl font-bold">Employees</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Manage your team members and their roles.
				</p>
			</header>
			<EmployeesTable data={employees} />
		</section>
	);
}
