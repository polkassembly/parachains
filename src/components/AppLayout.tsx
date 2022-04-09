// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useState } from 'react';

import CustomSidebar from './CustomSidebar';
import Footer from './Footer';
import MenuBar from './MenuBar';
import SwitchRoutes from './SwitchRoutes';

function AppLayout() {
	const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

	return (
		<>
			<MenuBar />
			<div className='d-flex'>
				<CustomSidebar setIsCollapsed={setSidebarCollapsed} />
				<div className={`route-wrapper ${sidebarCollapsed ? 'collapsed' : ''}` }>
					<SwitchRoutes />
				</div>
			</div>
			<Footer />
		</>
	);
}

export default AppLayout;

