// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon, List } from 'semantic-ui-react';
import { useRouter } from 'src/hooks';

import { ReactComponent as BountyIcon } from '../assets/sidebar/bounties.svg';
import { ReactComponent as CalendarIcon } from '../assets/sidebar/calendar.svg';
import { ReactComponent as DiscussionsIcon } from '../assets/sidebar/discussions.svg';
import { ReactComponent as MembersIcon } from '../assets/sidebar/members.svg';
import { ReactComponent as MotionIcon } from '../assets/sidebar/motion.svg';
import { ReactComponent as NewsIcon } from '../assets/sidebar/news.svg';
import { ReactComponent as OverviewIcon } from '../assets/sidebar/overview_white.svg';
import { ReactComponent as ProposalIcon } from '../assets/sidebar/proposals.svg';
import { ReactComponent as ReferendaIcon } from '../assets/sidebar/referenda.svg';
import { ReactComponent as TipIcon } from '../assets/sidebar/tips.svg';
import { ReactComponent as TreasuryProposalIcon } from '../assets/sidebar/treasury_proposals.svg';

const CustomSidebar = ({ className, setIsCollapsed, sidebarHidden } : { className?: string, setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>, sidebarHidden: boolean }): JSX.Element => {
	const SidebarItems = [
		{
			icon: <OverviewIcon />,
			link: 'https://polkadot.polkassembly.io/',
			name: 'Overview'
		},
		{
			icon: <DiscussionsIcon />,
			link: 'https://polkadot.polkassembly.io/discussions',
			name: 'Discussions'
		},
		{
			icon: <CalendarIcon />,
			link: 'https://polkadot.polkassembly.io/calendar',
			name: 'Calendar'
		},
		{
			icon: <NewsIcon />,
			link: 'https://polkadot.polkassembly.io/news',
			name: 'News'
		},
		{
			icon: <Icon name='chain' size='small' />,
			link: '/',
			name: 'Parachains'
		}
	];

	const TreasuryItems = [
		{
			icon: <TreasuryProposalIcon />,
			link: 'https://polkadot.polkassembly.io/treasury-proposals',
			name: 'Proposals'
		},
		{
			icon: <BountyIcon />,
			link: 'https://polkadot.polkassembly.io/bounties',
			name: 'Bounties'
		},
		{
			icon: <TipIcon />,
			link: 'https://polkadot.polkassembly.io/tips',
			name: 'Tips'
		}
	];

	const DemocracyItems = [
		{
			icon: <ProposalIcon />,
			link: 'https://polkadot.polkassembly.io/proposals',
			name: 'Proposals'
		},
		{
			icon: <ReferendaIcon className='motion-icon' />,
			link: 'https://polkadot.polkassembly.io/referenda',
			name: 'Referenda'
		}
	];

	const CouncilItems = [
		{
			icon: <MotionIcon className='motion-icon' />,
			link: 'https://polkadot.polkassembly.io/motions',
			name: 'Motions'
		},
		{
			icon: <MembersIcon />,
			link: 'https://polkadot.polkassembly.io/council',
			name: 'Members'
		}
	];

	const TechCommItems = [
		{
			icon: <ProposalIcon />,
			link: 'https://polkadot.polkassembly.io/tech-comm-proposals',
			name: 'Proposals'
		}
	];

	const { history } = useRouter();
	const location = useLocation();

	const [activeRoute, setActiveRoute] = useState<string>('/');
	const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
	const [collapsedOptions, setCollapsedOptions] = useState<string[]>([]);

	useEffect(() => {
		setActiveRoute(location.pathname);
	}, [location.pathname]);

	const toggleSidebarCollapse = () => {
		setSidebarCollapsed(!sidebarCollapsed);
		setIsCollapsed(!sidebarCollapsed);
	};

	function toggleOptionCollapse (optionTitle:string) {
		const index = collapsedOptions.indexOf(optionTitle);

		if(index > -1){
			//is collapsed: remove from array
			const newCollapsedOptions = collapsedOptions.splice(0); //makes copy
			newCollapsedOptions.splice(index, 1);
			setCollapsedOptions(newCollapsedOptions);
		}else{
			const newCollapsedOptions = collapsedOptions.splice(0); //makes copy
			newCollapsedOptions.push(optionTitle);
			setCollapsedOptions(newCollapsedOptions);
		}
	}

	function gotoRoute(link: string){
		if(link == '/'){
			history.push('/');
		}else{
			window.location.href = link;
		}
	}

	return (
		<>
			<div className={`${className} ${sidebarHidden ? 'hidden-sm' : ''}`} style={ sidebarCollapsed ? { minWidth: '47px', padding: '1.5em 0.2em 0 0.2em', width:'47px' } : {} }>
				<div className='sidebar-parent'>
					<div onClick={ toggleSidebarCollapse } className='sidebar-collapse-btn' style={ sidebarCollapsed ? { left: '20px' } : {} }>
						<Icon size='small' name={sidebarCollapsed ? 'chevron up': 'chevron down' } />
					</div>

					<List size='large' verticalAlign='middle'>
						{/* Uncategorized */}
						{
							SidebarItems.map(item => (
								<List.Item key={item.name} onClick={() => gotoRoute(item.link)} className={`sidebar-item ${activeRoute == item.link ? 'active' : ''}`}>
									{item.icon}
									<List.Content style={ sidebarCollapsed ? { display: 'none' } : {} }>
										<List.Header>{item.name}</List.Header>
									</List.Content>
								</List.Item>
							))
						}

						{/* Democracy */}
						<List.Item className='sidebar-heading'>
							<List.Content style={ sidebarCollapsed ? { display: 'none' } : {} }>
								<List.Header><div>Democracy</div> {collapsedOptions.includes('democracy') ? <Icon onClick={() => toggleOptionCollapse('democracy')} name='chevron down' /> : <Icon onClick={() => toggleOptionCollapse('democracy')} name='chevron up' />}</List.Header>
							</List.Content>
						</List.Item>
						{!collapsedOptions.includes('democracy') || sidebarCollapsed ?
							DemocracyItems.map(item => (
								<List.Item key={item.name} onClick={() => gotoRoute(item.link)} className={`sidebar-item ${activeRoute == item.link ? 'active' : ''}`}>
									{item.icon}
									<List.Content style={ sidebarCollapsed ? { display: 'none' } : {} }>
										<List.Header>{item.name}</List.Header>
									</List.Content>
								</List.Item>
							))
							:
							null
						}

						{/* Council */}
						<List.Item className='sidebar-heading'>
							<List.Content style={ sidebarCollapsed ? { display: 'none' } : {} }>
								<List.Header> <div>Council</div> {collapsedOptions.includes('council') ? <Icon onClick={() => toggleOptionCollapse('council')} name='chevron down' /> : <Icon onClick={() => toggleOptionCollapse('council')} name='chevron up' />}</List.Header>
							</List.Content>
						</List.Item>
						{
							!collapsedOptions.includes('council') || sidebarCollapsed ?
								CouncilItems.map(item => (
									<List.Item key={item.name} onClick={() => gotoRoute(item.link)} className={`sidebar-item ${activeRoute == item.link ? 'active' : ''}`}>
										{item.icon}
										<List.Content style={ sidebarCollapsed ? { display: 'none' } : {} }>
											<List.Header>{item.name}</List.Header>
										</List.Content>
									</List.Item>
								))
								:
								null
						}

						{/* Treasury */}
						<List.Item className='sidebar-heading'>
							<List.Content style={ sidebarCollapsed ? { display: 'none' } : {} }>
								<List.Header> <div>Treasury</div> {collapsedOptions.includes('treasury') ? <Icon onClick={() => toggleOptionCollapse('treasury')} name='chevron down' /> : <Icon onClick={() => toggleOptionCollapse('treasury')} name='chevron up' />} </List.Header>
							</List.Content>
						</List.Item>
						{
							!collapsedOptions.includes('treasury') || sidebarCollapsed ?
								TreasuryItems.map(item => (
									<List.Item key={item.name} onClick={() => gotoRoute(item.link)} className={`sidebar-item ${activeRoute == item.link ? 'active' : ''}`}>
										{item.icon}
										<List.Content style={ sidebarCollapsed ? { display: 'none' } : {} }>
											<List.Header>{item.name}</List.Header>
										</List.Content>
									</List.Item>
								))
								:
								null
						}

						{/* TechComm */}
						<List.Item className='sidebar-heading'>
							<List.Content style={ sidebarCollapsed ? { display: 'none' } : {} }>
								<List.Header> <div>Tech. Comm.</div> {collapsedOptions.includes('techComm') ? <Icon onClick={() => toggleOptionCollapse('techComm')} name='chevron down' /> : <Icon onClick={() => toggleOptionCollapse('techComm')} name='chevron up' />}</List.Header>
							</List.Content>
						</List.Item>
						{
							!collapsedOptions.includes('techComm') || sidebarCollapsed ?
								TechCommItems.map(item => (
									<List.Item key={item.name} onClick={() => gotoRoute(item.link)} className={`sidebar-item ${activeRoute == item.link ? 'active' : ''}`}>
										{item.icon}
										<List.Content style={ sidebarCollapsed ? { display: 'none' } : {} }>
											<List.Header>{item.name}</List.Header>
										</List.Content>
									</List.Item>
								))
								:
								null
						}
					</List>
				</div>
			</div>
		</>
	);
};

export default styled(CustomSidebar)`
	background: #fff;
	min-width: 230px;
	padding: 1.5em 0.8em 0 0.8em;
	box-shadow: 0.5px 0 5px -2px #888;
	
	.header { 
		font-family: 'Roboto' !important;
	}

	@media only screen and (max-width: 992px) {
		position: fixed;
		z-index: 300;
		top: 25px;
		height: 100vh;
		width: 60%;
		padding-right: 0;
		max-width: 250px;

		&.hidden-sm {
			display: none;
		}
	}

	.sidebar-collapse-btn{
		position: absolute;
		top: 439px;
		left: 194px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 100;
		border-bottom: 14px solid #fff;
		border-left: 12px solid transparent;
		border-right: 12px solid transparent;
		height: 0;
		width: 63px;
    transform : rotate(90deg);
    filter: drop-shadow(3px -1px 1px #88888860);

		.icon {
			margin-bottom: -17px;
		}

		@media only screen and (max-width: 992px) {
			display: none;
		}
	}

	.sidebar-item {
		border-radius: 4px;
		margin: 0 0;
		padding: 0.8em !important;
		cursor: pointer;
		display: flex !important;
		align-items: center;
		
		&.active {
			background: #E5007A !important;
			color: #fff;
			margin: 0.6em 0;
			
			.header, .icon {
				color: #fff !important;
			}

			svg {
				&:not(.motion-icon) {
					path {
						fill: #fff;
					}
				}

				&.motion-icon {
					path {
						stroke: #fff;

						&:nth-of-type(2) {
							fill: #fff;
						}
						
					}
				}
			}
		}
		
		&:hover {
			background: #eee;
		}

		.content {
			padding-left: 0.5em;
		}

		.icon {
			color: #778192 !important;
			margin-left: 5px !important;
		}
		
		&:hover {
			background: #eee;
		}

		svg {
			min-width: 20px !important;
			max-width: 20px !important;
			width: 20px !important;

			&:not(.motion-icon) {
				path {
					fill: #778192;
				}
			}

		}

		.header {
			color: #778192 !important;
			font-size: 1em;
			font-weight: normal !important;
		}
	}

	.sidebar-heading {
		margin-top: 1em;
		margin-bottom: 0.5em;
		margin-left: 1em;
		font-size: 0.95em;

		.header {
			color: #B9C1CE !important;
			font-weight: 400 !important;
			text-transform: uppercase;
			display: flex !important;
			justify-content: space-between;
			font-family: 'Roboto' !important;

			.icon {
				cursor: pointer;
			}
		}
	}

	.sidebar-parent {
		position: sticky;
		top: -167px;

		@media only screen and (max-width: 992px) {
			overflow-y: auto;
			position: static;
			height: 93.8vh;
			padding-right: 1rem;
		}
	}
`;