'use client'
import ReduxProvider from "@/components/layouts/ReduxProvider";
import List from "./List";

const ListWrapper = () => {

	return (
		<div id="list-wrapper">
			<ReduxProvider>
				<List />
			</ReduxProvider>
		</div>
	)
}

export default ListWrapper