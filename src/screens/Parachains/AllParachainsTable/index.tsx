// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';
// import { Link } from 'react-router-dom';
import { Tab, Table } from 'semantic-ui-react';

import AllParachainsCard from '../AllParachainsCard';
// import ParachainsFilterHeader from '../ParachainsFilterHeader';
import ParachainsTableHeader from '../ParachainsTableHeader';
import ParachainsTableRow from '../ParachainsTableRow';

interface Props {
	className?: string
	data?: any
}

const AllParachainsTable = ({ className, data }:Props) => {
	let serialNum = 0;
	return <Tab.Pane loading={!data} className={className}>
		<Table className='hidden-mobile' basic='very' striped unstackable selectable columns={6}>
			{/* <ParachainsFilterHeader className={className} data={data} /> */}
			<ParachainsTableHeader className={className} />

			<Table.Body>
				{data.map(
					(project: any) => {
						serialNum++;
						return <ParachainsTableRow key={project.id} serialNum={serialNum} {...project} />;
					}
				)}
			</Table.Body>
		</Table>

		<div className="hidden-desktop">
			{data.map(
				(project: any) => {
					serialNum++;
					return <AllParachainsCard key={project.id} {...project} />;
				}
			)}
		</div>
	</Tab.Pane>;
};

export default styled(AllParachainsTable)`
	&&& {
		background: white !important;
		border: none !important;
		width: 100% !important;
		margin-left: 0 !important;
		font-size: 1.5rem;
		overflow-x: auto;
		overflow-y: hidden;

		@media only screen and (max-width: 767px) {
			background: transparent !important;
		}

		.hidden-mobile {
			@media only screen and (max-width: 767px) {
				display: none !important;
			}
		}

		.hidden-desktop {
			@media only screen and (min-width: 767px) {
				display: none !important;
			}
		}

		.tab-menu {
			overflow-x: auto;
			overflow-y: hidden;

			a.active {
				border-bottom: 5px solid #E5007A !important;
			}
		}
	
		.item:first-child{
			margin-left: 1em !important;
		}
	
		.item {
			font-size: 1.5em;
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

		.coming-soon-row {
			padding: 2em 1em !important;
			font-size: 16px;
			font-weight: 500;
			color: #75767C;
			width: 100%;
		}
	}
`;
