// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon, List } from 'semantic-ui-react';
import { useRouter } from 'src/hooks';

const CustomSidebar = ({ className, setIsCollapsed } : { className?: string, setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element => {
	const SidebarItems = [
		{
			icon: <Icon name='th' />,
			link: 'https://polkadot.polkassembly.io/',
			name: 'Overview'
		},
		{
			icon: <Icon name='comments outline' />,
			link: 'https://polkadot.polkassembly.io/discussions',
			name: 'Discussions'
		},
		{
			icon: <Icon name='calendar alternate outline' />,
			link: 'https://polkadot.polkassembly.io/calendar',
			name: 'Calendar'
		},
		{
			icon: <Icon name='newspaper outline' />,
			link: 'https://polkadot.polkassembly.io/news',
			name: 'News'
		},
		{
			icon: <Icon name='chain' />,
			link: '/',
			name: 'Parachains'
		}
	];

	const TreasuryItems = [
		{
			icon: <Icon name='diamond' />,
			link: 'https://polkadot.polkassembly.io/treasury-proposals',
			name: 'Proposals'
		},
		{
			icon: <Icon name='dollar sign' />,
			link: 'https://polkadot.polkassembly.io/bounties',
			name: 'Bounties'
		},
		{
			icon: <Icon name='lightbulb outline' />,
			link: 'https://polkadot.polkassembly.io/tips',
			name: 'Tips'
		}
	];

	const DemocracyItems = [
		{
			icon: <Icon name='file alternate outline' />,
			link: 'https://polkadot.polkassembly.io/proposals',
			name: 'Proposals'
		},
		{
			icon: <Icon name='clipboard check' />,
			link: 'https://polkadot.polkassembly.io/referenda',
			name: 'Referenda'
		}
	];

	const CouncilItems = [
		{
			icon: <Icon name='forward' />,
			link: 'https://polkadot.polkassembly.io/motions',
			name: 'Motions'
		},
		{
			icon: <Icon name='users' />,
			link: 'https://polkadot.polkassembly.io/council',
			name: 'Members'
		}
	];

	const TechCommItems = [
		{
			icon: <Icon name='file alternate outline' />,
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
			<div className={className} style={ sidebarCollapsed ? { minWidth: '47px', padding: '1.5em 0.2em 0 0.2em', width:'47px' } : {} }>
				<div className='sidebar-parent'>
					<div onClick={ toggleSidebarCollapse } className='sidebar-collapse-btn' style={ sidebarCollapsed ? { left: '47px' } : {} }>
						<Icon size='small' name={sidebarCollapsed ? 'chevron right': 'chevron left' } />
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

	@media only screen and (max-width: 992px) {
		display: none;
	}

	.sidebar-collapse-btn{
		position: absolute;
		top: 500px;
		left: 217px;
		background: #fff;
		height: 4em;
		width: 1em;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 100;
		border-radius: 0 30px 30px 0;
	}

	.sidebar-item {
		border-radius: 4px;
		margin: 0 0;
		padding: 0.8em !important;
		cursor: pointer;
		
		&.active {
			background: #E5007A !important;
			color: #fff;
			margin: 0.6em 0;
			
			.header, .icon {
				color: #fff !important;
			}
		}
		
		&:hover {
			background: #eee;
		}

		.icon {
			color: #778192 !important;
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

			.icon {
				cursor: pointer;
			}
		}
	}

	.sidebar-parent {
		position: sticky;
		top: -167px;
	}
`;