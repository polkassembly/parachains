// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';

// import { Link } from 'react-router-dom';
import logo from '../../assets/polkassembly-logo.png';

const Footer = ({ className }:{ className?: string } ): JSX.Element => {
	const year = new Date().getFullYear();

	return (
		<footer className={className}>
			<div className="flex">
				<div className="logo">
					<img alt='Polkassembly Logo' className='logo-img' src={logo} />
				</div>

				<div className="site-links">
					<div className="help-center-links">
						<h3>Help Center</h3>
						<div className='flex-col'>
							<Link to="/terms-and-conditions" className='footer-link'>Terms and Conditions</Link>
							<a href="https://github.com/premiurly/polkassembly/issues" target='_blank' rel='noreferrer' className='footer-link'>Report an Issue</a>
						</div>
					</div>
					<div className="pa-links">
						<h3>Polkassembly</h3>
						<div className='flex-col'>
							<Link to="/terms-of-website" className='footer-link'>Terms of Website</Link>
							<Link to="/privacy" className='footer-link'>Privacy Policy</Link>
						</div>
					</div>
				</div>
			</div>

			<Divider />

			<div className='copy-year'>
				&copy; Premiurly {year}
			</div>
		</footer>
	);
};

export default styled(Footer)`
	width: 100vw !important;
	background-color: nav_black;
	font-family: font_default;
	color: grey_secondary;
	font-size: 16px;
	padding: 35px 74px;

	@media only screen and (max-width: 992px) {
		padding: 25px 20px;
	}

	
	
	.flex {
		width: 90%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 50px;

		@media only screen and (max-width: 992px) {
			flex-direction: column;
			width: 100%;
			margin-bottom: 15px;


			& > .help-center-links, & > .pa-links {
				display: none;
			}
		}

		.site-links {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			
			& > div {
				margin-left: 5em;
			}
			
			@media only screen and (max-width: 992px) {
				max-width: 500px;
				display: flex;
				justify-content: start;


				& > div:first-child {
					margin-left: 0;
				}

				& > div:not(:first-child) {
					margin-left: 30px;
				}
			}
		}

		.logo-img {
			width: 250px;
			max-width: 289px;
			height: auto;

			@media only screen and (max-width: 992px) {
				width: 168px;
				margin-bottom: 26px;
			}
		}

		h3 {
			color: #FFFFFF;
			font-size: 16px;
			margin-bottom: 16px;
		}
	}

	.flex-col {
		display: flex;
		flex-direction: column;

		a {
			color: #ACACAC;
			font-size: 16px;
			margin-bottom: 8px;
		}
	}

	.copy-year {
		margin-top: 20px;
	}

`;
