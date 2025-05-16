import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../../../config';
import { ListType } from '@/types/lists';
import { UserType } from '@/types/users';

const BASE_URL = config.API_URL;

interface AddCollaboratorArgs {
	listId: string;
	collaboratorId: string;
}
interface RemoveCollaboratorArgs {
	listId: string;
	collaboratorId: string;
}

type AddCollaboratorResponse = ListType;
type RemoveCollaboratorResponse = ListType;
type SearchUsersResponse = { result: UserType[] };

interface RegisterPayloadWithRecaptcha extends Partial<UserType> {
	recaptchaToken?: string;
}


export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ['User', 'List', 'Task'],
	endpoints: (builder) => ({
		// User endpoints
		fetchUsers: builder.query({
			query: () => '/users',
			providesTags: ['User'],
		}),
		fetchUserById: builder.query({
			query: (id) => `/users/${id}`,
			providesTags: (result, error, id) => [{ type: 'User', id }],
		}),
		searchUsers: builder.query<SearchUsersResponse, string>({
			query: (searchTerm) => `/users?email=${encodeURIComponent(searchTerm)}`,
			providesTags: (result, error, searchTerm) => [{ type: 'User', id: `SEARCH_${searchTerm}` }],
			keepUnusedDataFor: 60,
		}),
		addUser: builder.mutation({
			query: (newUser: RegisterPayloadWithRecaptcha) => ({
				url: '/register',
				method: 'POST',
				body: newUser,
			}),
			invalidatesTags: ['User'],
		}),
		updateUser: builder.mutation({
			query: ({ id, ...updatedUser }) => ({
				url: `/users/${id}`,
				method: 'PUT',
				body: updatedUser,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/users/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, id) => [{ type: 'User', id }],
		}),

		// List endpoints
		fetchLists: builder.query({
			query: () => '/lists',
			providesTags: ['List'],
		}),
		fetchListById: builder.query({
			query: (id) => `/lists/${id}`,
			providesTags: (result, error, id) => [{ type: 'List', id }],
		}),
		addList: builder.mutation({
			query: (newList) => ({
				url: '/lists',
				method: 'POST',
				body: newList,
			}),
			invalidatesTags: ['List'],
		}),
		updateList: builder.mutation({
			query: ({ id, ...updatedList }) => ({
				url: `/lists/${id}`,
				method: 'PUT',
				body: updatedList,
			}),
			invalidatesTags: ['List'],
		}),
		deleteList: builder.mutation({
			query: (id) => ({
				url: `/lists/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['List'],
		}),
		addCollaborator: builder.mutation<AddCollaboratorResponse, AddCollaboratorArgs>({
			query: ({ listId, collaboratorId }) => ({
				url: `/lists/${listId}/share/${collaboratorId}`,
				method: 'POST',
			}),
			invalidatesTags: (result, error, { listId }) => [{ type: 'List', id: listId }],
		}),
		removeCollaborator: builder.mutation<RemoveCollaboratorResponse, RemoveCollaboratorArgs>({
			query: ({ listId, collaboratorId }) => ({
				url: `/lists/${listId}/share/${collaboratorId}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, { listId }) => [{ type: 'List', id: listId }],
		}),

		// Task endpoints
		fetchTasksByListId: builder.query({
			query: (listId) => `/lists/${listId}/tasks`,
			providesTags: ['Task'],
		}),
		fetchTaskByIdUnderList: builder.query({
			query: ({ listId, taskId }) => `/lists/${listId}/tasks/${taskId}`,
			providesTags: (result, error, { listId, taskId }) => [{ type: 'Task', id: `${taskId}` }],
		}),
		addTaskUnderList: builder.mutation({
			query: ({ listId, newTask }) => ({
				url: `/lists/${listId}/tasks`,
				method: 'POST',
				body: newTask,
			}),
			invalidatesTags: ['Task'],
		}),
		updateTaskUnderList: builder.mutation({
			query: ({ listId, taskId, updatedTask }) => ({
				url: `/lists/${listId}/tasks/${taskId}`,
				method: 'PUT',
				body: updatedTask,
			}),
			invalidatesTags: ['Task'],
		}),
		deleteTaskUnderList: builder.mutation({
			query: ({ listId, taskId }) => ({
				url: `/lists/${listId}/tasks/${taskId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Task'],
		}),
	}),
});

export const {
	// User hooks
	useFetchUsersQuery,
	useFetchUserByIdQuery,
	useSearchUsersQuery,
	useLazySearchUsersQuery,
	useAddUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
	// List hooks
	useFetchListsQuery,
	useFetchListByIdQuery,
	useAddListMutation,
	useUpdateListMutation,
	useDeleteListMutation,
	useAddCollaboratorMutation,
	useRemoveCollaboratorMutation,
	// Task hooks
	useFetchTasksByListIdQuery,
	useFetchTaskByIdUnderListQuery,
	useAddTaskUnderListMutation,
	useUpdateTaskUnderListMutation,
	useDeleteTaskUnderListMutation,
} = apiSlice;