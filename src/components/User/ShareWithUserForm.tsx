import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useLazySearchUsersQuery, useAddCollaboratorMutation } from '@/redux/api/apiSlice';
import { debounce } from 'lodash';
import { UserType } from '@/types/users';
import ErrorMessageAlert from '../Alerts/ErrorMessageAlert';

interface ShareWithUserFormProps {
	closeModal: () => void;
}

const ShareWithUserForm: React.FC<ShareWithUserFormProps> = ({ closeModal }) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

	const searchInputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const listId = useSelector((state: RootState) => state.currentList.currentList?._id);

	const [
		triggerSearch,
		{ data: searchResponse, isLoading: isSearching, isError: isSearchError, error: searchError }
	] = useLazySearchUsersQuery();
	const searchResults = searchResponse?.result || [];

	const [
		addCollaborator,
		{ isLoading: isAddingCollaborator, isError: isAddError, error: addError }
	] = useAddCollaboratorMutation();

	const debouncedSearch = useCallback(
		debounce((query: string) => {
			if (query.trim().length > 1) {
				triggerSearch(query);
				setIsDropdownOpen(true);
			} else {
				setIsDropdownOpen(false);
			}
		}, 300),
		[triggerSearch]
	);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = e.target.value;
		setSearchTerm(newSearchTerm);
		debouncedSearch(newSearchTerm);
	};

	const handleSelectUser = (user: UserType) => {
		if (!selectedUsers.some(selected => selected._id === user._id)) {
			setSelectedUsers(prev => [...prev, user]);
		}
		setSearchTerm('');
		setIsDropdownOpen(false);
		searchInputRef.current?.focus();
	};

	const handleRemoveUser = (userId: string) => {
		setSelectedUsers(prev => prev.filter(user => user._id !== userId));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (selectedUsers.length === 0) {
			alert("Please select at least one user to share list with.");
			return;
		}
		if (!listId) {
			alert("Cannot share list: List ID is missing.");
			return;
		}

		const promises = selectedUsers.map(user =>
			addCollaborator({ listId, collaboratorId: user._id }).unwrap()
		);

		try {
			await Promise.all(promises);
			console.log("List shared successfully");
			setSelectedUsers([]);
			closeModal();
		} catch (err) {
			console.error("Failed to share list:", err);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				searchInputRef.current &&
				!searchInputRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const availableUsers = searchResults?.filter(
		user => !selectedUsers.some(selected => selected._id === user._id)
	) ?? [];

	return (
		<>
			<h2 className="mb-4 text-xl font-semibold text-gray-800">Share with User</h2>

			{(isSearchError || isAddError) && (
				<ErrorMessageAlert error={searchError || addError} />
			)}

			<form
				className="mt-4 space-y-4"
				id="share-list-form"
				onSubmit={handleSubmit}
			>
				<div>
					<div className="relative mt-1">
						<div className="flex flex-wrap items-center gap-1 rounded-md border border-gray-300 p-1.5 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
							{selectedUsers.map(user => (
								<span key={user._id} className="inline-flex items-center rounded bg-indigo-100 px-2 py-0.5 text-sm font-medium text-indigo-800">
									{user.username}
									<button
										type="button"
										onClick={() => handleRemoveUser(user._id)}
										className="ml-1 flex-shrink-0 rounded-full p-0.5 text-indigo-500 hover:bg-indigo-200 hover:text-indigo-700 focus:outline-none"
										aria-label={`Remove ${user.username}`}
									>
										<svg className="h-3 w-3" stroke="currentColor" fill="none" viewBox="0 0 8 8">
											<path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
										</svg>
									</button>
								</span>
							))}
							<input
								ref={searchInputRef}
								id="user-search"
								type="text"
								value={searchTerm}
								onChange={handleSearchChange}
								onFocus={() => searchTerm.trim().length > 1 && setIsDropdownOpen(true)}
								placeholder={selectedUsers.length > 0 ? "" : "Search usernames..."}
								className="flex-grow border-none p-0.5 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
								autoComplete="off"
							/>
						</div>

						{isDropdownOpen && (
							<div
								ref={dropdownRef}
								className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
							>
								{isSearching && <div className="px-3 py-2 text-gray-500">Searching...</div>}
								{!isSearching && availableUsers.length === 0 && searchTerm.length > 1 && (
									<div className="px-3 py-2 text-gray-500">No matching users found.</div>
								)}
								{!isSearching && availableUsers.map((user) => (
									<div
										key={user._id}
										onClick={() => handleSelectUser(user)}
										className="relative cursor-pointer select-none px-3 py-2 text-gray-900 hover:bg-indigo-600 hover:text-white"
									>
										{user.username}
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className="flex justify-end space-x-3 pt-2">
					<button
						type="button"
						onClick={closeModal}
						disabled={isAddingCollaborator}
						className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isAddingCollaborator || selectedUsers.length === 0}
						className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isAddingCollaborator ? "Sharing..." : "Share List"}
					</button>
				</div>
			</form>
		</>
	);
};

export default ShareWithUserForm;
