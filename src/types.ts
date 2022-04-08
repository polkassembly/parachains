// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Dispatch, SetStateAction } from 'react';

import { network, tokenSymbol } from './global/networkConstants';

export interface UserDetailsContextType {
	id?: number | null,
	picture?: string | null,
	username?: string | null,
	email?: string | null,
	email_verified?: boolean | null,
	addresses?: string[] | null,
	defaultAddress?: string | null,
	notification: {
		postParticipated: boolean,
		postCreated: boolean,
		newProposal: boolean,
		ownProposal: boolean
	} | null,
	setUserDetailsContextState: Dispatch<SetStateAction<UserDetailsContextType>>;
	web3signup?: boolean | null
}

export enum Role {
	ANONYMOUS = 'anonymous',
	ADMIN = 'admin',
	PROPOSAL_BOT = 'proposal_bot',
	USER = 'user',
}

// these are enforced by Hasura
export interface HasuraClaimPayload {
	'x-hasura-allowed-roles': Role[]
	'x-hasura-default-role': Role
	'x-hasura-user-email': string
	'x-hasura-user-id': string
	'x-hasura-kusama': string
	'x-hasura-kusama-default': string
	'x-hasura-polkadot': string
	'x-hasura-polkadot-default': string
}

export interface JWTPayploadType {
	exp: number
	sub: string
	username: string
	email: string
	email_verified: boolean
	iat: string
	notification: {
		postParticipated: boolean,
		postCreated: boolean,
		newProposal: boolean,
		ownProposal: boolean
	}
	'https://hasura.io/jwt/claims': HasuraClaimPayload
	web3signup: boolean
}

export interface NotificationContextType {
	deQueueNotification: (id: number) => void;
	notificationsQueue: Map<number, NotificationType>
	queueNotification: (notification: NotificationType) => void;
}

export enum NotificationStatus {
	SUCCESS,
	ERROR,
	WARNING
}

export interface NotificationType {
	header: string
	message: string
	status: NotificationStatus
}

export interface ModalType {
	content?: string,
	title?: string
}

export interface ModalContextType {
	dismissModal: () => void,
	modal: ModalType,
	setModal: (modal: ModalType) => void;
}

export interface AccountMeta {
	genesisHash: string | undefined
	name: string
	source: string
}

export interface Account {
	address: string
	meta: AccountMeta
}

export type Network = typeof network[keyof typeof network];
export type TokenSymbol = typeof tokenSymbol[keyof typeof tokenSymbol];

export type ChainPropType = {
	[index: string]: ChainProps;
};

export interface ChainProps {
	'blockTime': number;
	'ss58Format': number;
	'tokenDecimals': number;
	'tokenSymbol': TokenSymbol;
}

export type ChainLinksType = {
	[index: string]: ChainLinks;
};

export interface ChainLinks {
	blockExplorer: string;
	homepage: string;
	github: string;
	discord: string;
	twitter: string;
	telegram: string;
	youtube: string;
	reddit: string;
}

export interface LoadingStatusType {
	isLoading: boolean;
	message: string;
}

export interface ReactionMapFields {
	count: number
	userNames: string[]
}

export enum VoteThresholdEnum {
	Supermajorityapproval = 'Supermajorityapproval',
	Supermajorityrejection = 'Supermajorityrejection',
	Simplemajority = 'Simplemajority'
}

export type VoteThreshold = keyof typeof VoteThresholdEnum;

export interface MetaContextType {
	description: string;
	image: string;
	setMetaContextState: Dispatch<SetStateAction<MetaContextType>>;
	title: string;
	type: string;
	url: string;
}

export enum Vote {
	AYE = 'AYE',
	NAY = 'NAY'
}

export interface CouncilVote {
	address: string;
	vote: Vote;
}

export interface ReactionMapFields {
	count: number
	userNames: string[]
}
