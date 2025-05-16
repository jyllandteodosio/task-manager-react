'use client'

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useFetchListByIdQuery } from "@/redux/api/apiSlice";
import { ListType } from "@/types/lists";
import Modal from "../layouts/Modal";
import UserIcon from "../User/UserIcon";
import UnshareWithUserForm from "../User/UnshareWithUserForm";
import ShareWithUserButton from "../User/ShareWithUserButton";

const SharedWith = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<string>("");

    const currentUserData = useSelector((state: RootState) => state.auth.user);
    const currentUserId: string | undefined = currentUserData?._id;

    const activeListId = useSelector((state: RootState) => state.currentList.currentList?._id);

    const {
        data: apiResponse,
        isLoading,
        isFetching,
    } = useFetchListByIdQuery(activeListId, {
        skip: !activeListId,
    });

    const listData: ListType | undefined = apiResponse?.result;

    const isOwner = useMemo(() => {
        return currentUserId === listData?.ownerId;
    }, [currentUserId, listData?.ownerId]);

    const filteredCollaborators = useMemo(() => {
        if (listData?.collaborators && currentUserId) {
            const collaboratorsSource = listData.collaborators;

            const result = collaboratorsSource.filter(
                (collaboratorId: string) => collaboratorId !== currentUserId
            );
            return result;
        } else {
            return [];
        }
    }, [listData, currentUserId]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (isLoading && !activeListId) {
        return <div className="mt-4"><span className="font-bold text-sm text-[#757575]">Select a list to see collaborators.</span></div>;
    }

    if (isLoading && activeListId) {
        return <div className="mt-4"><span className="font-bold text-sm text-[#757575]">Loading collaborators...</span></div>;
    }

    if (!activeListId && !isLoading) {
        return null;
    }


    return (
        <div id="sharedWith" className="mt-4">
            <span className="font-bold text-sm text-[#757575]">Shared with:</span>
            <div id="sharedWithUsers" className="flex items-center justify-start mt-2 gap-x-2">
                {isFetching && <span className="text-xs text-gray-400">Updating...</span>}
                {!isFetching && filteredCollaborators?.map((userId: string) => {
                    if (isOwner) {
                        return (
                            <button
                                id="unshare-with-user"
                                type="button"
                                key={userId}
                                className="relative group rounded-full"
                                onClick={() => {
                                    setSelectedUser(userId);
                                    openModal();
                                }}
                            >
                                <UserIcon userId={userId} />
                                <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </button>
                        );
                    } else {
                        return (
                            <UserIcon key={userId} userId={userId} />
                        );
                    }
                })}
                {isOwner && (
                    <ShareWithUserButton />
                )}
            </div>
            {isOwner && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <UnshareWithUserForm userId={selectedUser} closeModal={closeModal} listId={activeListId} />
                </Modal>
            )}
        </div>
    )
}

export default SharedWith;
