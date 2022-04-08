// Copyright 2019-2020 @Premiurly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivacyPolicy, TermsAndConditions, TermsOfWebsite } from 'src/screens/LegalDocuments';
import NotFound from 'src/screens/NotFound';
import Parachains from 'src/screens/Parachains';

function SwitchRoutes() {
	return (
		<Switch>
			<Route exact path="/">
				<Parachains/>
			</Route>
			<Route path="/terms-and-conditions">
				<TermsAndConditions/>
			</Route>
			<Route path="/terms-of-website">
				<TermsOfWebsite/>
			</Route>
			<Route path="/privacy">
				<PrivacyPolicy/>
			</Route>
			<Route path="*">
				<NotFound/>
			</Route>
		</Switch>
	);
}

export default SwitchRoutes;

