// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React, { useEffect, useState } from 'react';
import { Card, Loader } from 'semantic-ui-react';
import ParachainInfoCard from 'src/components/ParachainInfoCard';
// import { Card } from 'semantic-ui-react';
// import ParachainInfoCard from 'src/components/ParachainInfoCard';
import ParachainSearchInfo from 'src/components/ParachainSearchInfo';

import ParachainProjectsTabs from './ParachainProjectsTabs';

interface Props {
  className?: string
}

const Parachains = ({ className }: Props) => {

	const [parachainsData, setParachainsData] = useState([]);

	useEffect(() => {
		fetch('parachains.json')
			.then((r) => r.json())
			.then((data) => {
				setParachainsData(data);
			});
	},[]);

	return (
		<div className={className}>
			<ParachainSearchInfo className='ma-sm-1' />

			<Card.Group className='card-group'>
				<ParachainInfoCard network='polkadot' />
				<ParachainInfoCard network='kusama' />
			</Card.Group>

			{parachainsData.length > 0 ? <div>
				<h2>Projects</h2>
				<ParachainProjectsTabs data={parachainsData} />
			</div> : <div className="loader-cont"><Loader active inline /></div>}
		</div>
	);
};

export default styled(Parachains)`
	h1 {
		font-size: 48px;
		font-weight: 500;
		margin-bottom: 28px !important;
	}

	h2 {
		font-size: 30px;
		color: #454545;
		margin-top: 48px;
		margin-bottom: 16px;

		@media only screen and (max-width: 768px) {
			margin-left: 16px;
		}
	}

	.loader-cont {
		display: flex;
    justify-content: center;
    margin-top: 30%;
	}

	.ma-sm-1 {
		@media only screen and (max-width: 768px) {
			margin: 1rem;
		}
	}

	.card-group {
		margin-top: 32px;
		flex-wrap: nowrap;
		max-width: 99.9%;
		overflow-x: hidden !important;

		&:hover {
			overflow-x: auto !important;
		}

		@media only screen and (max-width: 768px){
			overflow-x: hidden !important;
			padding-left: 1em;
			flex-direction: column;
			align-items: center;
			max-width: 100%;
			margin-left: 4px;
			margin-top: 22px;


			&:hover {
				overflow-x: hidden !important;
			}
		}
	}
`;