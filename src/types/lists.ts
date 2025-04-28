export interface ListType {
	_id: string;
	title: string;
	description?: string;
	ownerId: string;
	collaborators: string[];
	createdAt: string;
	updatedAt: string;
}