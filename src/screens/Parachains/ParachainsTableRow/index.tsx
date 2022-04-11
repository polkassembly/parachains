// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';
import { Label, Popup, Table } from 'semantic-ui-react';
import kusamaLogo from 'src/assets/kusama-logo.gif';

import githubLogo from '../../../assets/parachains/github.png';
import w3fBlackLogo from '../../../assets/parachains/w3f-black.png';
import w3fGreenLogo from '../../../assets/parachains/w3f-green.png';
import w3fRedLogo from '../../../assets/parachains/w3f-red.png';
import polkadotLogo from '../../../assets/polkadot-logo-small-inverted.png';

interface ParachainsTableRowProps {
	id: number,
	serialNum: number,
	className?: string
	badges: string[]
	githubURL: string
	investorsCount: number
	logoURL: string
	name: string
	status: string
	token: string
	tokenPriceUSD: number
	w3fGrant: { [key: string]: any; } | null
}

const ParachainsTableRow = function ({
	className,
	// id,
	serialNum,
	badges,
	githubURL,
	investorsCount,
	logoURL,
	name,
	status,
	token,
	// tokenPriceUSD,
	w3fGrant
}:ParachainsTableRowProps) {

	function toTitleCase(str: string): string {
		return str.replace(
			/\w\S*/g,
			function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
			}
		);
	}

	const popupContent = () => {
		let content = '';
		if(w3fGrant){
			if(w3fGrant.terminated){
				content = toTitleCase(`W3F grant TERMINATED: "${w3fGrant.terminationReason}"`);
			}else if(w3fGrant.milestoneText){
				content = toTitleCase(`${w3fGrant.received} W3F grant(s) received, ${w3fGrant.milestoneText}`);
			}else{
				content = toTitleCase(`${w3fGrant.received} received, ${w3fGrant.completed} completed`);
			}
		}else {
			content = '';
		}
		return content;
	};

	return (
		<Table.Row className={className}>
			<Table.Cell>{serialNum}</Table.Cell>
			<Table.Cell className='project-cell'>
				<img src={logoURL} height={34} width={34} alt={`${name} Logo`} />
				<span className='project-name'>{name}</span>
				<div className='project-badges'>
					{badges.map(
						(badge: string) => {
							return <Label key={badge} content={badge} />;
						}
					)}
				</div>
			</Table.Cell>

			<Table.Cell>
				<Popup content={toTitleCase(status)} className='text-capitalize' hoverable size='huge' wide='very' trigger={
					status == 'live on polkadot' ?
						<img src={polkadotLogo} height={32} width={32} alt='Polkadot Logo' /> :
						<img src={kusamaLogo} height={32} width={32} alt='Kusama Logo' />
				} />
			</Table.Cell>

			<Table.Cell className='project-token-cell'>
				<div>
					<span>
						{token}
					</span>
					{/* TODO: Implement tokenPriceUSD */}
					{/* <span className="dotDivider"></span>
					<span>
						${tokenPriceUSD}
					</span> */}
				</div>
			</Table.Cell>
			<Table.Cell>
				{w3fGrant &&
					<Popup content={popupContent} className='text-capitalize' hoverable size='huge'
						trigger={
							<img src={w3fGrant.terminated ? w3fRedLogo : w3fGrant.milestoneText? w3fBlackLogo : w3fGreenLogo} height={28} width={28} alt='W3F Logo' />
						}
					/>
				}
			</Table.Cell>
			<Table.Cell>
				{investorsCount == 0 ? '' : investorsCount }
			</Table.Cell>
			<Table.Cell>
				<a href={githubURL} target='_blank' rel='noreferrer'>
					<img src={githubLogo} height={28} width={28} alt="Github" />
				</a>
			</Table.Cell>
		</Table.Row>
	);
};

export default styled(ParachainsTableRow)`
	cursor: pointer !important;
	text-transform: capitalize !important;

	img {
		border-radius: 50%;
	}
	
	td {
		padding-top: 16px !important;
		padding-bottom: 16px !important;
		font-size: 16px;
		font-weight: 500;
		color: #75767C;
		
		:first-child {
			padding: 0 !important;
			text-align: center !important;
		}
	}

	.dotDivider {
		height: 4px;
		width: 4px;
		background-color: #4E4E4E;
		margin: auto 8px;
		border-radius: 50%;
	}
	
	.project-cell {
		display: flex;
		align-items: center;
		min-width: 480px;
		
		.project-name {
			margin-left: 16px;
		}

		.project-badges{
			margin-left: 16px;

			.label {
				background: #E5007A;
				color: #fff;
				font-size: 12px;
				font-weight: 400;
				text-transform: capitalize;
				border-radius: 48px;
				margin-right: 12px;

				@media screen and (max-width: 1373px) {
					margin-top: 12px;
				}
			}
		}
	}

	.project-token-cell>div {
		display: flex;
		align-content: center;
	}

	.text-capitalize {
		text-transform: capitalize !important;
	}
`;
