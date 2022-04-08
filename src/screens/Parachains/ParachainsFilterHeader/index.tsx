// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';
import { Table } from 'semantic-ui-react';

interface ParachainsFilterHeaderProps {
	className?: string
	data?: any
}

const ParachainsFilterHeader = function ({
	className
}:ParachainsFilterHeaderProps) {

	return (
		<Table.Header className={`${className}`}>
			<Table.Row>
			</Table.Row>
		</Table.Header>
	);
};

export default styled(ParachainsFilterHeader)`
	background: #F2F2F2;
`;
