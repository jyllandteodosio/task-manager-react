'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface SocketContextType {
	socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const currentUser = useSelector((state: RootState) => state.auth.user);
	const [socket, setSocket] = useState<Socket | null>(null);

	const isProduction = process.env.NODE_ENV === 'production';
	const socketPath = isProduction ? '/api/socket.io' : '/socket.io';

	useEffect(() => {
		if (!currentUser?._id) return;

		// Initialize the socket connection
		const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000', {
			path: socketPath,
			transports: ['websocket'],
			withCredentials: true,
			secure: true,
			query: { userId: currentUser._id },
		});
		setSocket(newSocket);

		// Cleanup on unmount
		return () => {
			newSocket.disconnect();
		};
	}, [currentUser]);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

export const useSocket = (): SocketContextType => {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error('useSocket must be used within a SocketProvider');
	}
	return context;
};