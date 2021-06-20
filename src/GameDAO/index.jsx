/**
					 _______________________________ ________
					 \____    /\_   _____/\______   \\_____  \
						 /     /  |    __)_  |       _/ /   |   \
						/     /_  |        \ |    |   \/    |    \
					 /_______ \/_______  / |____|_  /\_______  /
									 \/        \/         \/         \/
					 Z  E  R  O  .  I  O     N  E  T  W  O  R  K
					 © C O P Y R I O T   2 0 7 5   Z E R O . I O
**/

import React, { useEffect, useState } from 'react'
import { useSubstrate } from '../substrate-lib'

import { Menu, Label, Tab, Grid } from 'semantic-ui-react'
// import Loader from '../components/Loader'
//
import Campaigns from './components/Campaigns'
import CreateCampaign from './components/CreateCampaign'
// import Proposals from './components/Proposals'
// import CreateProposal from './components/CreateProposal'

const GameDAO = props => {

	const { accountPair } = props
	const { api } = useSubstrate()

	const [campaigns, setCampaigns] = useState(null)
	const [proposals, setProposals] = useState(null)

	useEffect(() => {

		let unsubscribe = null

		api.query.gameDaoGovernance.nonce(n => {
			setProposals(n.toNumber())
		}).then( unsub => {
			unsubscribe = unsub
		}).catch( console.error )

		return () => unsubscribe && unsubscribe()

	}, [api.query.gameDaoGovernance])

	useEffect(() => {

		let unsubscribe = null

		api.query.gameDaoCrowdfunding.nonce(n => {
			setCampaigns(n.toNumber())
		}).then( unsub => {
			unsubscribe = unsub
		}).catch( console.error )

		return () => unsubscribe && unsubscribe()

	}, [api.query.gameDaoCrowdfunding])

	const panes = [

		{
			menuItem: (
				<Menu.Item key='campaigns'>
					Campaigns{ (campaigns>0) && <Label>{ campaigns }</Label> }
				</Menu.Item>
			),
			render: () =>
				<Tab.Pane key='campaigns'>
					<Campaigns accountPair={accountPair}/>
				</Tab.Pane>
		},
		{
			menuItem: 'Create Campaign',
			render: () =>
				<Tab.Pane key='create_campaign'>
					<CreateCampaign
						accountPair={accountPair}
						/>
				</Tab.Pane>
			,
		},
		{
			menuItem:
				<Menu.Item key='proposals'>
					Proposals{ (proposals>0) && <Label>{ proposals }</Label> }
				</Menu.Item>,
			render: () =>
				<Tab.Pane key='proposals'><div>Proposals</div></Tab.Pane>
		},
		{
			menuItem:
				<Menu.Item key='create_proposal'>
					Create Proposal
				</Menu.Item>,
			render: () =>
			<Tab.Pane key='create_proposal'><div>Create Proposal</div></Tab.Pane>
		},
	]

	return (
		<Grid.Column width={16}>
			<Tab panes={ panes }/>
		</Grid.Column>
	)

}

export default function Dapp (props) {

	const { accountPair } = props;
	const { api } = useSubstrate();

	return api && api.query.gameDaoCrowdfunding && accountPair
		? <GameDAO {...props} />
		: null;

}

//
//
//
