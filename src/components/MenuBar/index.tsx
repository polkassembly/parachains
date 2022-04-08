// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import logo from '../../assets/polkassembly-logo.png';

interface Props {
	children?: ReactNode,
	className?: string,
	visible?: boolean
}

const MenuBar = ({ className } : Props): JSX.Element => {
	return (
		<>
			<Menu className={className} inverted widths={2} id='menubar'>
				<Menu.Item as={NavLink} to="/" className='logo' id='title'><img alt='Polkassembly Logo' src={logo} /></Menu.Item>
			</Menu>
		</>
	);
};

export default styled(MenuBar)`
@media only screen and (min-width: 992px) {
	height: 80px;
}

	&.ui.menu, .ui.inverted.menu {
		font-family: font_default;
		background-color: #1E1E28;
		border-radius: 0rem;
		letter-spacing: 0.2px;
		margin: 0 !important;

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
`;
