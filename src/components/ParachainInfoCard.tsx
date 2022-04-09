// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ApiPromise, WsProvider } from '@polkadot/api';
import { DeriveBalancesAccount } from '@polkadot/api-derive/types';
import type { Balance } from '@polkadot/types/interfaces';
import { BN_ZERO, u8aConcat, u8aToHex } from '@polkadot/util';
import styled from '@xstyled/styled-components';
import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import { Card, Divider, Icon } from 'semantic-ui-react';
import kusamaLogo from 'src/assets/kusama-logo.gif';
import auctionIcon from 'src/assets/parachains/auction.png';
import chainIcon from 'src/assets/parachains/chain.png';
import crowdloansIcon from 'src/assets/parachains/crowdloans.png';
import polkadotLogo from 'src/assets/polkadot-logo-small-inverted.png';
import { REACT_APP_SUBSCAN_API_KEY } from 'src/global/apiKeys';
import { chainProperties } from 'src/global/networkConstants';
import Loader from 'src/ui-components/Loader';
import formatBnBalance from 'src/util/formatBnBalance';

interface Props {
	className?: string
	network: 'polkadot' | 'kusama'
}

interface Result {
	value?: Balance;
	treasuryAccount: Uint8Array;
}

const EMPTY_U8A_32 = new Uint8Array(32);

const ParachainInfoCard = ({ className, network }: Props) => {
	const [api, setApi] = useState<ApiPromise>();
	const [apiReady, setApiReady] = useState(false);

	useEffect(() => {
		const WS_PROVIDER = network == 'polkadot' ? 'wss://rpc.polkadot.io' : 'wss://kusama-rpc.polkadot.io';
		const provider = new WsProvider(WS_PROVIDER);

		async function initAPI() {
			const api = await ApiPromise.create({ provider });

			if(api){
				setApi(api);
				api.isReady.then(() => {
					setApiReady(true);
					console.log('API ready');
				})
					.catch((error) => {
						console.error(error);
					});
			}
		}
		initAPI();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [currentBlock, setCurrentBlock] = useState<BN>(new BN(0));
	const [treasuryBalance, setTreasuryBalance] = useState<
		DeriveBalancesAccount | undefined
	>(undefined);
	const [resultValue, setResultValue] = useState<string>('0');
	const [availableUSD, setAvailableUSD] = useState<string>('');
	const [result, setResult] = useState<Result>(() => ({
		spendPeriod: BN_ZERO,
		treasuryAccount: u8aConcat('modl', 'py/trsry', EMPTY_U8A_32).subarray(
			0,
			32
		)
	}));

	useEffect(() => {
		if (!api) {
			return;
		}

		if (!apiReady) {
			return;
		}

		api.derive.chain.bestNumber((number) => {
			setCurrentBlock(number);
		});

		api.derive.balances
			?.account(u8aToHex(result.treasuryAccount))
			.then((treasuryBalance) => {
				setTreasuryBalance(treasuryBalance);
			});

		if (treasuryBalance) {
			setResult(() => ({
				treasuryAccount: u8aConcat(
					'modl',
					api.consts.treasury && api.consts.treasury.palletId
						? api.consts.treasury.palletId.toU8a(true)
						: 'py/trsry',
					EMPTY_U8A_32
				),
				value: treasuryBalance.freeBalance.gt(BN_ZERO)
					? treasuryBalance.freeBalance
					: undefined
			}));

			if (result.value) {
				setResultValue(result.value.toString());
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [api, apiReady, treasuryBalance, currentBlock]);

	function formatUSDWithUnits (usd:string) {
		// Nine Zeroes for Billions
		const formattedUSD = Math.abs(Number(usd)) >= 1.0e+9

			? (Math.abs(Number(usd)) / 1.0e+9).toFixed(2) + 'B'
		// Six Zeroes for Millions
			: Math.abs(Number(usd)) >= 1.0e+6

				? (Math.abs(Number(usd)) / 1.0e+6).toFixed(2) + 'M'
			// Three Zeroes for Thousands
				: Math.abs(Number(usd)) >= 1.0e+3

					? (Math.abs(Number(usd)) / 1.0e+3).toFixed(2) + 'K'

					: Math.abs(Number(usd)).toFixed(2);

		return formattedUSD;

	}

	// fetch available token to USD price whenever available token changes
	useEffect(() => {
		let cancel = false;

		// replace spaces returned in string by format function
		const token_available: number = parseFloat(formatBnBalance(
			resultValue.toString(),
			{
				network: network,
				numberAfterComma: 2,
				withThousandDelimitor: false,
				withUnit: false
			}
		).replaceAll(/\s/g,''));

		async function fetchAvailableUSDCPrice(token: number) {
			if (cancel) return;
			const response = await fetch(
				`https://${network}.api.subscan.io/api/open/price_converter`,
				{
					body: JSON.stringify({
						from: chainProperties[network].tokenSymbol,
						quote: 'USD',
						value: token
					}),
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						'X-API-Key': REACT_APP_SUBSCAN_API_KEY || ''
					},
					method: 'POST'
				}
			);
			const responseJSON = await response.json();
			if (responseJSON['message'] == 'Success') {
				const formattedUSD = formatUSDWithUnits(responseJSON['data']['output']);
				setAvailableUSD(formattedUSD);
			}
		}
		fetchAvailableUSDCPrice(token_available);

		return () => { cancel = true; };
	}, [resultValue, network]);

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
			{!apiReady && <div style={ { background: 'rgba(255, 255, 255, 0.4)', height: '100vh', left: '0', position: 'fixed', top:'0', width: '100vw', zIndex: 500 } } ><Loader text='Waiting to make a connection to the remote endpoint and finishing API initialization.' size="big" /></div>}
			<Card.Content>
				<Card.Header className='parachain-card-header'>
					<img height={33} width={33} src={network=='polkadot' ? polkadotLogo : kusamaLogo} alt="Chain Logo" />
					<span className='network-name'>{network}</span>
					<span className="dotDivider"></span>

					<span>
						{result.value ? (
							<span>
								{ formatUSDWithUnits(
									formatBnBalance(
										result.value.toString(),
										{
											network: network,
											numberAfterComma: 0,
											withThousandDelimitor: false,
											withUnit: false
										}
									)
								)}&nbsp;{network == 'polkadot' ? 'DOT' : 'KSM' }
							</span>
						) : (
							<div>
								<Icon loading name='circle notched' />
							</div>
						)}
					</span>

					<span className="dotDivider"></span>
					<span>${availableUSD}</span>
				</Card.Header>
				<Card.Meta className='parachain-card-meta'>
					{network == 'polkadot' ? '11%' : '31%' } of Total Supply Locked in Parachains and Crowdloans
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
		/* width: 500px !important; */
		margin-right: 28px !important;

		.parachain-card-header {
			display: flex !important;
			align-items: center;
			font-size: 24px !important;

			img {
				margin-right: 20px;
				margin-top: 2px;
				border-radius: 50%;
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
		}

		.parachain-card-meta {
			margin-left: 53px;
			margin-top: 12px;
			margin-bottom: 24px;
			font-size: 15px !important;
			color: #646464 !important;
		}

		.parachain-card-desc{
			display: flex !important;
			align-items: center;
			justify-content: space-around;
			margin-left: 20px;
			margin-top: 24px;

			.metric-line {
				display: flex;
				align-items: center;

				.metric-num {
					margin-left: 7px;
					font-weight: 500;
					font-size: 22px;
					color: #E5007A;
				}
			}

			.metric-name {
				margin-top: 8px !important;
				font-size: 18px;
			}
		}
`;
