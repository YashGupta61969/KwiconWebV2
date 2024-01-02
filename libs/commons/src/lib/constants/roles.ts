export interface IRole {
	title: string;
	content: string;
	value: 'student' | 'advisor' | 'senior student';
}

//* All Constants for Roles
export const roles: IRole[] = [
	{
		title: 'Student',
		content: 'You are a student seeking advice.',
		value: 'student',
	},
	{
		title: 'Advisor',
		content: 'You are a career consultant or worked in any field. Build a compelling profile, enabling students to easily connect with you.',
		value: 'advisor',
	},
	{
		title: 'Both',
		content: 'You are a student seeking advice & available to guide.',
		value: 'senior student',
	},
];
