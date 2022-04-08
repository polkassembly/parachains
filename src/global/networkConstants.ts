// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ChainLinksType, ChainPropType } from '../types';

export const network = {
	BIFROST: 'bifrost',
	KILT: 'kilt',
	KUSAMA: 'kusama',
	MOONBEAM: 'moonbeam',
	MOONRIVER: 'moonriver',
	POLKADOT: 'polkadot'
};

export const tokenSymbol = {
	DOT: 'DOT',
	KSM: 'KSM'
};

export const chainProperties: ChainPropType = {
	[network.KUSAMA]: {
		blockTime: 6000,
		ss58Format: 2,
		tokenDecimals: 12,
		tokenSymbol: tokenSymbol.KSM
	},
	[network.POLKADOT]: {
		blockTime: 6000,
		ss58Format: 0,
		tokenDecimals: 10,
		tokenSymbol: tokenSymbol.DOT
	}
};

export const chainLinks: ChainLinksType = {
	[network.POLKADOT]: {
		blockExplorer: 'https://polkadot.subscan.io/',
		discord: 'https://discord.gg/wGUDt2p',
		github: 'https://github.com/paritytech/polkadot',
		homepage: 'https://polkadot.network/',
		reddit: 'https://www.reddit.com/r/polkadot',
		telegram: 'https://t.me/PolkadotOfficial',
		twitter: 'https://twitter.com/Polkadot',
		youtube: 'https://www.youtube.com/channel/UCB7PbjuZLEba_znc7mEGNgw'
	},
	[network.KUSAMA]: {
		blockExplorer: 'https://kusama.subscan.io/',
		discord: 'https://discord.gg/9AWjTf8wSk',
		github: 'https://github.com/paritytech/polkadot',
		homepage: 'https://kusama.network/',
		reddit: 'https://www.reddit.com/r/Kusama/',
		telegram: 'https://t.me/kusamanetworkofficial',
		twitter: 'https://twitter.com/kusamanetwork',
		youtube: 'https://www.youtube.com/channel/UCq4MRrQhdoIR0b44GxcCPxw'
	}
};

export const chainDetails: { [index: string]: string} = {
	[network.POLKADOT]: 'Polkadot enables scalability by allowing specialized blockchains to communicate with each other in a secure, trust-free environment. Polkadot is built to connect and secure unique blockchains, whether they be public, permission-less networks, private consortium chains, or oracles and other Web3 technologies. It enables an internet where independent blockchains can exchange information under common security guarantees. Polkadot uses a sophisticated governance mechanism that allows it to evolve gracefully overtime at the ultimate behest of its assembled stakeholders. The stated goal is to ensure that the majority of the stake can always command the network.',
	[network.KUSAMA]: 'Kusama is an early release of Polkadot: a scalable, multichain network for radical innovation. Kusama serves as a proving ground that allows teams and developers to build and deploy a parachain, and experiment with Polkadot’s governance and NPoS functionality in a real environment.'
};