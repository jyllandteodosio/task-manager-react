'use client'

import ClientProvider from "@/components/taskComponents/ComponentProvider";
import List from "./List";

const ListWrapper = () => {

	return (
		<ClientProvider>
			<List />
		</ClientProvider>
	)
}

export default ListWrapper