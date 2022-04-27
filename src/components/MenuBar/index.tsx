// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

import logo from '../../assets/polkassembly-logo.png';

interface Props {
	children?: ReactNode
	className?: string
	toggleSidebarHidden?: () => void
}

const MenuBar = ({ className, toggleSidebarHidden } : Props): JSX.Element => {

	const toggleSidebar = () => {
		toggleSidebarHidden && toggleSidebarHidden();
	};

	return (
		<>
			<Menu className={className} inverted id='menubar'>
				<Menu.Item className='hidden-md sidebar-btn'>
					<Icon onClick={toggleSidebar} name="sidebar" size='large' />
				</Menu.Item>
				<Menu.Item as={NavLink} to="/" className='logo' id='title'><img alt='Polkassembly Logo' src={logo} /></Menu.Item>
			</Menu>
		</>
	);
};

export default styled(MenuBar)`
	&.ui.menu, .ui.inverted.menu {
		padding: 0.85rem 2rem;
		font-family: font_default;
		background-color: nav_black;
		border-radius: 0rem;
		letter-spacing: 0.2px;
		margin-bottom: 0;
		position: fixed;
		width: 100%;
		z-index: 400;

		.item {
			color: grey_secondary;
			font-weight: 500;
			&:hover {
				color: white;
			}
			&:before {
				content: none !important;
			}
		}

		.sidebar-btn {
			margin-right: 1rem;
			padding: 0;
		}

		i.icon {
			color: grey_secondary;
		}

		.logo {
			padding: 0;
			img {
				width: 16rem;

				@media only screen and (max-width: 992px) {
					width: 10rem;
				}
			}
			background-color: nav_black !important;
		}

		@media only screen and (min-width: 992px) {
			position: static;

			.hidden-md {
				display: none;
			}
		}
	}
`;
