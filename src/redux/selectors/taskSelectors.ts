import { RootState } from '@/types';

export const selectTaskById = (state: RootState, taskId: string) => 
  state.tasks.items.find(task => task.id === taskId);


