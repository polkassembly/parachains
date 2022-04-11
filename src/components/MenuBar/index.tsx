// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Responsive } from 'semantic-ui-react';

import logo from '../../assets/polkassembly-logo.png';

interface Props {
	children?: ReactNode,
	className?: string,
	visible?: boolean
}

const MenuBar = ({ className } : Props): JSX.Element => {
	return (
		<>
			<Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
				<Menu className={className} inverted widths={2} id='menubar'>
					<Menu.Item as={NavLink} to="/" className='logo' id='title'><img alt='Polkassembly Logo' src={logo} /></Menu.Item>
				</Menu>
			</Responsive>
			<Responsive minWidth={Responsive.onlyComputer.minWidth}>
				<Menu className={className} stackable inverted borderless>
					<Menu.Item as={NavLink} to="/" className='logo' id='title'><img alt='Polkassembly Logo' src={logo} /></Menu.Item>
				</Menu>
			</Responsive>
		</>
	);
};

export default styled(MenuBar)`
	&.ui.menu, .ui.inverted.menu {
		font-family: font_default;
		background-color: nav_black;
		border-radius: 0rem;
		letter-spacing: 0.2px;

		.logo {
			img {
				width: 16rem;

				@media only screen and (max-width: 992px) {
					width: 10rem;
				}
			}
			background-color: nav_black !important;
		}
	}

	@media only screen and (max-width: 992px) {

		&.ui.menu, .ui.inverted.menu {
			min-height: 5rem;
			border-bottom-style: solid;
			border-bottom-width: 1px;
			border-bottom-color: grey_primary;
			margin: 0rem!important;

			#title {
				position: absolute;
				text-align: left;
				margin: auto 0;
				left: 2rem;
				top: 0.3rem;
				padding-top: 1rem;
				padding-bottom: 0;
				border-radius: 0.8rem!important;
			}

			.item {
				font-size: md;
				display: inline-block;
				&:before {
					width: 0rem;
				}
			}
		}

		.ui.icon.menu .item {
			text-align: left;
			padding: 1.5rem 1rem;
		}
	}

	@media only screen and (min-width: 992px) {
		&.ui.menu {
			padding: 0.5rem 2rem;
			font-size: md;
			.item {
				padding: 0.5rem 0.5rem;
				margin: 0 1.2rem;
				:hover {
					background-color: nav_black !important;
				}
			}
		}

	}
`;