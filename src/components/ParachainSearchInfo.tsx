// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';

interface Props {
	className?: string
}

const ParachainSearchInfo = ({ className }: Props) => {
	return (
		<div className={className}>
			<div className="text">Polkadot and Kusama ecosystems directory</div>
		</div>
	);
};

export default styled(ParachainSearchInfo)`
	border-radius: 0.8em;
	-webkit-box-shadow: 0px 5px 10px 1px rgba(186,182,186,1);
	-moz-box-shadow: 0px 5px 10px 1px rgba(186,182,186,1);
	box-shadow: 0px 5px 10px 1px rgba(186,182,186,1);
	background: #E5007A !important;
	display: flex;
	padding: 24px 24px;
	color: #fff;
	font-size: 16px;
	width: 98%;
	justify-content: space-between;
	text-align: left;

	@media only screen and (max-width: 1189px) {
		padding: 20px 20px;
		flex-direction: column;
		justify-content: center;
	}

	@media only screen and (max-width: 767px) {
		flex-direction: column;
		justify-content: center;
		margin-left: auto !important;
		margin-right: auto !important;
	}
	
`;
