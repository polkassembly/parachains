// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { createContext, useState } from 'react';

import { MetaContextType } from '../types';

const title = 'Polkassembly | Parachains';
const description = 'polkassembly, discussion platform for governance';

const initialMetaContext : MetaContextType = {
	description,
	image: 'https://polkadot.polkassembly.io/static/media/polkassembly-logo.aa0e69ae.png',
	setMetaContextState : (): void => {
		throw new Error('setMetaContextState function must be overridden');
	},
	title,
	type: 'website',
	url: 'https://polkassembly.io/'
};

export const MetaContext = createContext(initialMetaContext);

export const MetaProvider = ({ children }: React.PropsWithChildren<{}>) => {

	const [metaContextState, setMetaContextState] = useState(initialMetaContext);

	return (
		<MetaContext.Provider value={{ ...metaContextState, setMetaContextState }}>
			{children}
		</MetaContext.Provider>
	);
};
