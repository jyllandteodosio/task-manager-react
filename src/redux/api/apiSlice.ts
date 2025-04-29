import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../../../config';

const BASE_URL = config.API_URL;

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
		addUser: builder.mutation({
			query: (newUser) => ({
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

		// Task endpoints
		fetchTasksByListId: builder.query({
			query: (listId) => `/lists/${listId}/tasks`,
			providesTags: (result, error, listId) => [{ type: 'Task', id: listId }],
		}),
		fetchTaskByIdUnderList: builder.query({
			query: ({ listId, taskId }) => `/lists/${listId}/tasks/${taskId}`,
			providesTags: (result, error, { listId, taskId }) => [{ type: 'Task', id: `${listId}-${taskId}` }],
		}),
		addTaskUnderList: builder.mutation({
			query: ({ listId, newTask }) => ({
				url: `/lists/${listId}/tasks`,
				method: 'POST',
				body: newTask,
			}),
			invalidatesTags: (result, error, { listId }) => [{ type: 'Task', id: listId }],
		}),
		updateTaskUnderList: builder.mutation({
			query: ({ listId, taskId, updatedTask }) => ({
				url: `/lists/${listId}/tasks/${taskId}`,
				method: 'PUT',
				body: updatedTask,
			}),
			invalidatesTags: (result, error, { listId, taskId }) => [{ type: 'Task', id: `${listId}-${taskId}` }],
		}),
		deleteTaskUnderList: builder.mutation({
			query: ({ listId, taskId }) => ({
				url: `/lists/${listId}/tasks/${taskId}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, { listId, taskId }) => [{ type: 'Task', id: `${listId}-${taskId}` }],
		}),
	}),
});

export const {
	useFetchUsersQuery,
	useFetchUserByIdQuery,
	useAddUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useFetchListsQuery,
	useFetchListByIdQuery,
	useAddListMutation,
	useUpdateListMutation,
	useDeleteListMutation,
	useFetchTasksByListIdQuery,
	useFetchTaskByIdUnderListQuery,
	useAddTaskUnderListMutation,
	useUpdateTaskUnderListMutation,
	useDeleteTaskUnderListMutation,
} = apiSlice;