'use client';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '@/redux/store';

export default function ReduxProvider ({ children }: { children: ReactNode }) {
	const storeRef = useRef(setupStore());

  return <Provider store={storeRef.current}>{children}</Provider>;
}