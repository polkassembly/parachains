// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ThemeProvider } from '@xstyled/styled-components';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppLayout from './components/AppLayout';
import Head from './components/Head';
import { MetaProvider } from './context/MetaContext';
import { theme } from './themes/theme';
import { GlobalStyle } from './ui-components/GlobalStyle';

const App = () => {
	return (
		<>
			<Router>
				<ThemeProvider theme={theme}>
					<MetaProvider>
						<Head />
						<GlobalStyle />
						<AppLayout />
					</MetaProvider>
				</ThemeProvider>
			</Router>
		</>
	);
};

export default App;
