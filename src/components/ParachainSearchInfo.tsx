// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import styled from '@xstyled/styled-components';
import React from 'react';
import { Card, Grid } from 'semantic-ui-react';

interface Props {
	className?: string
}

const ParachainSearchInfo = ({ className }: Props) => {
	return (
		<div className={className}>
			<Card fluid className='parachainSearchInfo-card'>
				<Card.Content>
					<Grid centered stackable columns={2} verticalAlign='middle'>
						<Grid.Column className='parachainSearchInfo-text' mobile={16} tablet={8} computer={10}>
							<h4> Polkadot and Kusama ecosystems directory </h4>
						</Grid.Column>
						<Grid.Column className='' mobile={16} tablet={8} computer={6}>
							{/* TODO: Make Search Bar */}
						</Grid.Column>
					</Grid>
				</Card.Content>
			</Card>
		</div>
	);
};

export default styled(ParachainSearchInfo)`
	.parachainSearchInfo-card {
		background: #E5007A !important;
		border-radius: 0.8em;
		padding: 0.8em 0.3em 0.8em 0.3em;
		-webkit-box-shadow: 0px 5px 10px 1px rgba(186,182,186,1);
		-moz-box-shadow: 0px 5px 10px 1px rgba(186,182,186,1);
		box-shadow: 0px 5px 10px 1px rgba(186,182,186,1);

		.parachainSearchInfo-text{
			h4 {
				color: #fff !important;
				font-weight: 400;
				font-size: 18px !important;
			}
		}
	}
`;
