export interface TaskType {
	_id: string;
	title: string;
	description?: string;
	completed: boolean;
	listId: string;
	createdBy: string;
	order: number;
	createdAt: string;
	updatedAt: string;
  }
  