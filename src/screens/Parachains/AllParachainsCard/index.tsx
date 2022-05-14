// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';
import { Divider, Label, Popup } from 'semantic-ui-react';

import announcedIcon from '../../../assets/parachains/announced.png';
import auctionIcon from '../../../assets/parachains/auction.png';
import liveIcon from '../../../assets/parachains/chain.png';
import githubLogo from '../../../assets/parachains/github.png';
import testingIcon from '../../../assets/parachains/testing.png';
import w3fBlackLogo from '../../../assets/parachains/w3f-black.png';
import w3fGreenLogo from '../../../assets/parachains/w3f-green.png';
import w3fRedLogo from '../../../assets/parachains/w3f-red.png';

interface AllParachainsCardProps {
	id: number,
	className?: string
	badges: string[]
	chain: string,
	githubURL: string
	investorsCount: number
	logoURL: string
	name: string
	status: string
	token: string
	tokenPriceUSD: number
	w3fGrant: { [key: string]: any; } | null
}

const AllParachainsCard = function ({
	className,
	// id,
	badges,
	githubURL,
	investorsCount,
	logoURL,
	name,
	status,
	token,
	// tokenPriceUSD,
	w3fGrant
}:AllParachainsCardProps) {

	function toTitleCase(str: string): string {
		return str.replace(
			/\w\S*/g,
			function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
			}
		);
	}

	const grantPopupText = () => {
		let content = '';
		if(w3fGrant){
			if(w3fGrant.terminated){
				content = ('W3F grant TERMINATED');
			}else if(w3fGrant.milestoneText){
				content = (`${w3fGrant.received} Received`);
			}else{
				content = (`${w3fGrant.received} Received\n${w3fGrant.completed} Completed`);
			}
		}else {
			content = '';
		}
		return content;
	};

	const grantPopupContent = () => {
		let content = '';
		if(w3fGrant){
			if(w3fGrant.terminated){
				content = toTitleCase(`W3F grant TERMINATED: "${w3fGrant.terminationReason}"`);
			}else if(w3fGrant.milestoneText){
				content = toTitleCase(`${w3fGrant.received} received, ${w3fGrant.milestoneText}`);
			}else{
				content = toTitleCase(`${w3fGrant.received} received, ${w3fGrant.completed} completed`);
			}
		}else {
			content = '';
		}
		return content;
	};

	return (
		<div className={className}>
			<div className='parachain-card-header'>
				<div>
					<img src={logoURL} height={20} width={20} alt={`${name} Logo`} />
					<span className='project-name'>{name}</span>
				</div>
				<a href={githubURL} target='_blank' rel='noreferrer'>
					<img src={githubLogo} height={16} width={16} alt="Github" />
				</a>
			</div>

			<Divider />

			<div className="parachain-card-meta">
				<div className="div1">
					<h3>Tokens</h3>
					<p>{token == '' ? 'N/A' : token}</p>
				</div>
				<div className="div2">
					<h3>Investors</h3>
					<p>{investorsCount == 0 ? 'N/A' : investorsCount }</p>
				</div>
				<div className="div3">
					<h3>Status</h3>
					<p className="status">
						{
							status.search('auction') !== -1 ? <><img src={auctionIcon} height={12} width={12} alt='Auction Icon' /> In Auction</>:
								status.search('Testing') !== -1 ? <><img src={testingIcon} height={12} width={12} alt='Testing Icon' /> Testing</> :
									status.search('announced') !== -1 ? <><img src={announcedIcon} height={12} width={12} alt='Announced Icon' /> Announced</>:
										status.search('live') !== -1 ? <><img src={liveIcon} height={12} width={12} alt='Live Icon' /> Live</> : null
						}
					</p>
				</div>
				<div className="div4">
					<h3>W3F Grant</h3>
					<div>
						{ w3fGrant ?
							<div className="grant-data-div">
								<img src={w3fGrant.terminated ? w3fRedLogo : w3fGrant.milestoneText? w3fBlackLogo : w3fGreenLogo} height={16} width={16} alt='W3F Logo' />
								<Popup content={grantPopupContent} className='text-capitalize' size='huge'
									trigger={
										<div className={`grant-text ${w3fGrant.terminated ? 'red-text' : w3fGrant.milestoneText? '' : 'green-text'}`}>{grantPopupText()}</div>
									}
								/>
							</div>
							: 'N/A'
						}
					</div>
				</div>
			</div>

			<div className="parachain-card-tags">
				<h3>Tags</h3>
				<div className='project-badges'>
					{badges.map(
						(badge: string) => {
							return <Label key={badge} content={badge} />;
						}
					)}
				</div>
			</div>
		</div>
	);
};

export default styled(AllParachainsCard)`
	text-transform: capitalize !important;
	background: #fff;
	width: 98%;
	height: 100%;
	margin-top: 16px;
	margin-right: auto;
	margin-left: auto;
	padding: 16px 16px 16px 16px;
	border-radius: 10px;
	border: 1px solid #D5DBDE;

	.parachain-card-header {

		&, div {
			display: flex;
		}

		justify-content: space-between;

		align-items: center;
		color: #75767C;

		img { 
			margin-right: 10px;
		}

		.project-name {
			font-size: 16px;
		}
	}

	.parachain-card-meta {
		margin-top: 16px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-column-gap: 40px;
		grid-row-gap: 16px;
		color: #3B444F;

		.div1 { grid-area: 1 / 1 / 2 / 2; }
		.div2 { grid-area: 1 / 2 / 2 / 3; }
		.div3 { grid-area: 2 / 1 / 3 / 2; }
		.div4 { grid-area: 2 / 2 / 3 / 3; }

		h3 {
			font-size: 12px;
			margin-bottom: 11px;
			font-weight: 500;
		}

		p, div {
			font-size: 14px;

			&.status {
				display: flex;
				align-items: center;

				img {
					margin-right: 4px;
				}
			}

			.grant-data-div {
				display: flex;
				align-items: start;
				white-space: pre-wrap;
				img {
					margin-top: 2px;
				}

				.grant-text {
					margin-left: 6px;
					font-weight: 500;

					&.red-text {
						color: #F51D2C !important;
					}

					&.green-text {
						color: #52C41A !important;
					}
				}
			}
		}
	}
	
	.parachain-card-tags {
		margin-top: 20px;

		h3 {
			font-weight: 700 !important;
			font-size: 12px !important;
			margin-bottom: 0;
		}

		.project-badges{
			display: flex;
			overflow-x: auto;
			max-width: 100% !important;

			@media only screen and (max-width: 767px) {
				overflow-x: auto;
				background: transparent !important;
				-ms-overflow-style: none;  /* Internet Explorer 10+ */
				scrollbar-width: none;  /* Firefox */

				&::-webkit-scrollbar {
					display: none;  /* Safari and Chrome */
				}
			}
			
			.label {
				background: #E5007A;
				color: #fff;
				font-size: 10px;
				font-weight: 400;
				text-transform: capitalize;
				border-radius: 48px;
				height: 22px;
				display: flex;
				align-items: center;
				margin-right: 8px;

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
