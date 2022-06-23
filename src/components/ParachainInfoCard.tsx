// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';
import { Card, Divider } from 'semantic-ui-react';
import kusamaLogo from 'src/assets/kusama-logo.gif';
import auctionIcon from 'src/assets/parachains/auction.png';
import chainIcon from 'src/assets/parachains/chain.png';
import crowdloansIcon from 'src/assets/parachains/crowdloans.png';
import polkadotLogo from 'src/assets/polkadot-logo-small-inverted.png';

interface Props {
	className?: string
	network: 'polkadot' | 'kusama'
}

const ParachainInfoCard = ({ className, network }: Props) => {
	const polkadotMetrics = {
		auction: '14th',
		crowdloans: '5',
		parachains: '14'
	};

	const kusamaMetrics = {
		auction: '31st',
		crowdloans: '5',
		parachains: '29'
	};

	const metrics = network=='polkadot' ? polkadotMetrics : kusamaMetrics;

	return (
		<Card className={className}>
			<Card.Content>
				<Card.Header className='parachain-card-header'>
					<img src={network=='polkadot' ? polkadotLogo : kusamaLogo} alt="Chain Logo" />
					<span className='network-name'>{network}</span>
				</Card.Header>
				<Card.Meta className='parachain-card-meta'>
					{network == 'polkadot' ? '11%' : '31%' } of Total Supply Locked<span className='hidden-sm'> in Parachains and Crowdloans</span>
				</Card.Meta>

				<Divider />

				<Card.Description className='parachain-card-desc'>
					{/* Auction */}
					<div className='metric-container'>
						<div className='metric-line'>
							<img src={auctionIcon} alt="Auction Icon" />
							<span className='metric-num'>{metrics.auction}</span>
						</div>
						<div className='metric-name'>Auction</div>
					</div>

					{/* Crowdloans */}
					<div className='metric-container'>
						<div className='metric-line'>
							<img src={crowdloansIcon} alt="Crowdloans Icon" />
							<span className='metric-num'>{metrics.crowdloans}</span>
						</div>
						<div className='metric-name'>Crowdloans</div>
					</div>

					{/* Parachains */}
					<div className='metric-container'>
						<div className='metric-line'>
							<img src={chainIcon} alt="Parachains Icon" />
							<span className='metric-num'>{metrics.parachains}</span>
						</div>
						<div className='metric-name'>Parachains</div>
					</div>
				</Card.Description>
			</Card.Content>
		</Card>
	);
};

export default styled(ParachainInfoCard)`
		border-radius: 10px !important;
		padding: 6px 0.1em !important;
		min-width: min-content !important;
		width: 500px !important;
		min-width: 400px !important;
		margin-right: 28px !important;

		@media only screen and (max-width: 768px) {
			width: 100% !important;
			min-width: 100% !important;
		}

		.parachain-card-header {
			display: flex !important;
			align-items: center;
			font-size: 24px !important;

			@media only screen and (max-width: 768px) {
				font-size: 16px !important;
				color: #7E7E7E !important;
				font-weight: 500;
			}
			
			img {
				margin-right: 20px;
				margin-top: 2px;
				border-radius: 50%;
				height: 33px;
				width: 33px;

				@media only screen and (max-width: 768px) {
					height: 24px;
					width: 24px;
				}
			}

			.network-name {
				text-transform: capitalize;
			}

			.dotDivider {
				height: 5px;
				width: 5px;
				background-color: #4E4E4E;
				margin: 0 20px;
				border-radius: 50%;
				display: inline-block;
			}

			.sub-text {
				color: #A7A7A7;
				font-size: 12px;
				font-weight: 400;
				display: none;
				margin-left: 6px;

				@media only screen and (max-width: 768px) {
					display: inline-block;
				}
			}
		}

		.parachain-card-meta {
			margin-left: 53px;
			margin-top: 12px;
			margin-bottom: 24px;
			font-size: 15px !important;
			color: #646464 !important;

			@media only screen and (max-width: 768px) {
				font-size: 12px !important;
				margin-top: 0;
				margin-bottom: 16px;
				margin-left: 43px;

				.hidden-sm {
					display: none;
				}
			}
		}

		.parachain-card-desc{
			display: flex !important;
			align-items: center;
			justify-content: space-around;
			margin-left: 20px;
			margin-top: 24px;

			@media only screen and (max-width: 768px) {
				margin-left: 0;
				margin-top: 16px;
			}

			.metric-line {
				display: flex;
				align-items: center;

				img {
					@media only screen and (max-width: 768px) {
						height: 14px;
						width: auto;
					}
				}

				.metric-num {
					margin-left: 7px;
					font-weight: 500;
					font-size: 22px;
					color: #E5007A;

					@media only screen and (max-width: 768px) {
						font-size: 14px;
					}
				}
			}

			.metric-name {
				margin-top: 8px !important;
				font-size: 18px;

				@media only screen and (max-width: 768px) {
					font-size: 12px;
				}
			}
		}
`;
