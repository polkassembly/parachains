// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';
import { Table } from 'semantic-ui-react';
import HelperTooltip from 'src/ui-components/HelperTooltip';

interface ParachainsTableHeaderProps {
	className?: string
	chain: 'kusama' | 'polkadot' | 'all'
}

const ParachainsTableHeader = function ({
	chain,
	className
}:ParachainsTableHeaderProps) {

	return (
		<Table.Header className={`${className}`}>
			<Table.Row>
				<Table.HeaderCell><span className='title'>#</span></Table.HeaderCell>
				<Table.HeaderCell className='project-title-cell' width={8}><span className='title'>Project</span></Table.HeaderCell>
				<Table.HeaderCell width={2} className='status-cell'>
					<span className='title'>Status</span>
					<div className='tooltip-icon'>
						<HelperTooltip position='left center' content='Current Project Status, one of : Announced, Testing, In Auction, Parachain' />
					</div>
				</Table.HeaderCell>
				{chain == 'all' && <Table.HeaderCell width={1}>
					<span className='title'>Chain</span>
				</Table.HeaderCell>}
				<Table.HeaderCell width={2}>
					<span className='title'>Token</span>
					<div className='tooltip-icon'>
						<HelperTooltip position='left center' content='Project Tokens' />
					</div>
				</Table.HeaderCell>
				<Table.HeaderCell width={2}>
					<span className='title'>W3F Grant</span>
					<div className='tooltip-icon'>
						<HelperTooltip position='left center' content='The Web3 Foundation Grants Program funds software development and research in the field of decentralized software protocols.' />
					</div>
				</Table.HeaderCell>
				<Table.HeaderCell width={1}>
					<span className='title'>Investors</span>
					<div className='tooltip-icon'>
						<HelperTooltip position='left center' content='Project investors count' />
					</div>
				</Table.HeaderCell>
				<Table.HeaderCell className='width-70'>
					<span className='title'>Github</span>
				</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
	);
};

export default styled(ParachainsTableHeader)`
	position: sticky;
	top: 0;
	z-index: 200;

	th {
		font-weight: 500 !important;
		padding-top: 1.5em;
		padding-bottom: 1.5em;
		text-align: center !important;

		&.project-title-cell, &.status-cell {
			text-align: left !important;
		}

		.tooltip-icon {
			margin-left: 12px;
			display: inline-block;
			span > img {
				margin-bottom: -3.5px !important;
			}
		}

		:first-child {
			padding: 0 !important;
			min-width: 50px;
		}

		:not(:first-child){
			min-width: 130px;
			span.title {
				border-left: 1px solid #ddd;
				padding: 0.3em 0 0.3em 1em;
				margin-left: -1em;
			}
		}

		&:first-child {
			padding-right: 0 !important;
			width: 120px !important;
		}
	}
	
	.width-70 {
		min-width: 70px !important;
		max-width: 70px !important;
		width: 70px !important;
	}
`;
