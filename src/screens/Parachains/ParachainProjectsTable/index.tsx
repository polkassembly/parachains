// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';
import { Label, Menu, Tab } from 'semantic-ui-react';

import AllParachainsTable from '../AllParachainsTable';

interface Props {
  className?: string
	data?: any
}

const ParachainProjectsTable = ({ className, data }: Props) => {
	const kusamaData: any = data.filter((project: any) => {
		return project.chain == 'kusama';
	});

	const polkadotData: any = data.filter((project: any) => {
		return project.chain == 'polkadot';
	});

	const panes = [
		{
			menuItem: <Menu.Item key='all'>All <Label circular>{data.length}</Label></Menu.Item>,
			render: () => <AllParachainsTable data={data} />
		},
		{
			menuItem: <Menu.Item key='kusama'>Kusama <Label circular>{kusamaData.length}</Label></Menu.Item>,
			render: () => <AllParachainsTable data={kusamaData} />
		},
		{
			menuItem: <Menu.Item key='polkadot'>Polkadot <Label circular>{polkadotData.length}</Label></Menu.Item>,
			render: () => <AllParachainsTable data={polkadotData} />
		}
		// {
		// menuItem: <Menu.Item className='menu-right no-label-item' key='search'> <Icon name='search' /> </Menu.Item>,
		// render: () => <div>Search Test</div>
		// }
	];

	return (
		<Tab className={className} menu={{ className:'tab-menu', pointing: true, secondary: true }} panes={panes} />
	);
};

export default styled(ParachainProjectsTable)`
	&&& {
		background: white;
		border-top-left-radius: 0.5em;
		border-top-right-radius: 0.5em;
		padding-top: 0.5em;
		.item:hover {
			border-bottom: 5px solid #E5007A !important;
		}

		h1 {
			font-size: 30px;
			margin-bottom: 16px;
		}
		
		.menu-right{
			margin-left: auto !important;
		}
	
		.tab-menu {
			overflow-x: auto;
			overflow-y: hidden;

			.no-label-item {
				padding-top: 1.15em;
				padding-bottom: 1.15em;
			}

			a {
				.label {
					color: rgba(0, 0, 0, 0.45) !important;
					background: #F0F0F0 !important;
					font-size: 12px !important;
				}
			}
	
			a.active {
				border-bottom: 5px solid #E5007A !important;

				.label {
					font-size: 12px !important;
					color: #E5007A !important;
					background: rgba(229, 0, 122, 0.1) !important;
				}

			}

			a.active.no-border {
				border-bottom: 5px solid #fff !important;
			}
		}
	
		.item:first-child{
			margin-left: 1em !important;
		}
	
		.item {
			font-size: 1.5em;
		}
	
		.tab-panel{
			background: white;
			border: none !important;
			width: 100% !important;
			margin-left: 0 !important;
			font-size: 1.5rem;
			overflow-x: auto;
			overflow-y: auto;
			max-height: 500px;
			padding: 0 !important;

			table tbody {
				tr:nth-child(2n){
					background-color: rgba(30, 30, 40, 0.03) !important;
				}

				tr:hover {
					background-color: rgba(0, 0, 0, 0.1) !important;
					
				}
			}
			

		}
	
		.table-header{
			background: #F2F2F2;
	
			th {
				font-weight: 500 !important;
				padding-top: 1.5em;
				padding-bottom: 1.5em;

				:not(:first-child){
					span {
						border-left: 1px solid #ddd;
						padding: 0.3em 0 0.3em 1em;
						margin-left: -1em;
					}
				}
			}
		}
	}
`;
