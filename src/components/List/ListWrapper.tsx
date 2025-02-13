'use client'
import ClientProvider from "@/components/layouts/ComponentProvider";
import List from "./List";

const ListWrapper = () => {

	return (
		<div id="list-wrapper">
			<ClientProvider>
				<List />
			</ClientProvider>
		</div>
	)
}

export default ListWrapper