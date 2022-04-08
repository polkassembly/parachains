// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';
import { Popup } from 'semantic-ui-react';

import infoCircleIcon from '../assets/InfoCircle.png';

interface Props {
	content: string
	position?:
	| 'top left'
	| 'top right'
	| 'bottom right'
	| 'bottom left'
	| 'right center'
	| 'left center'
	| 'top center'
	| 'bottom center'
}

const popupStyle = {
	fontSize: '1.2rem',
	marginLeft: '-1rem'
};

const myIcon = ({ className }:{className?: string}) => <img className={className} height="18" width="18" src={infoCircleIcon} />;

export const StyledIcon = styled(myIcon)`
	margin-top: -0.25em !important;
	margin-left: 0.25em !important;
`;

const HelperTooltip = ({ content, position }:Props) =>
	<Popup
		trigger={<span><StyledIcon /></span>}
		content={content}
		style={popupStyle}
		hoverable={true}
		position={position ? position : 'top left'}
	/>;

export default HelperTooltip;
