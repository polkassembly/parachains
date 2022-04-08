// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';

import Footer from './Footer';
import MenuBar from './MenuBar';
import SwitchRoutes from './SwitchRoutes';

function AppLayout() {
	return (
		<>
			<MenuBar />
			<div className='d-flex'>
				<div className='route-wrapper'>
					<SwitchRoutes />
				</div>
			</div>
			<Footer />
		</>
	);
}

export default AppLayout;

