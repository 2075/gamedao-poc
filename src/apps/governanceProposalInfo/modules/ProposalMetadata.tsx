import React from 'react'
import { Box, Button, Link, Stack, Typography } from 'src/components'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { normalizeNumber } from 'src/utils/normalizeNumber'
import { blockTime } from '../../lib/data'
import { useSelector } from 'react-redux'
import { blockStateSelector } from 'src/redux/block.slice'
import { useGameDaoControl } from 'src/hooks/useGameDaoControl'

export function ProposalMetadata({ address, body, proposalOwner, proposal, onVoteClicked }) {
	const blockNumber = useSelector(blockStateSelector)
	const { bodyMemberState } = useGameDaoControl()

	const bodyId = body.id

	const start = proposal ? (normalizeNumber(proposal.start) - blockNumber) * blockTime : null
	const expires = proposal ? (normalizeNumber(proposal.expiry) - blockNumber) * blockTime : null

	const isMember = bodyMemberState?.[bodyId]?.[address] === '1' ?? false

	return (
		<Stack flex="1" spacing={3}>
			<Box>
				<Typography>Organisation</Typography>
				<Link display="block" component={NavLink} to={`/app/organisations/${bodyId}`}>
					<Typography variant="body1">{body.name}</Typography>
				</Link>
			</Box>
			<Box>
				<Typography>Creator</Typography>
				<Link display="block" component={'a'} href={`https://sub.id/#/${proposalOwner}`}>
					<Typography variant="body1">{`${proposalOwner.substr(
						0,
						15
					)}...${proposalOwner.substr(proposalOwner.length - 6)}`}</Typography>
				</Link>
			</Box>
			<Box>
				<Typography>Start</Typography>
				<Typography display="block" variant="body1">
					{moment().add(start, 'seconds').format('YYYY-MM-DD HH:mm')}
				</Typography>
			</Box>
			<Box>
				<Typography>End</Typography>
				<Typography display="block" variant="body1">
					{moment().add(expires, 'seconds').format('YYYY-MM-DD HH:mm')}
				</Typography>
			</Box>
			<Box marginTop="auto !important" paddingTop={3}>
				<Typography>Vote</Typography>
				{isMember ? (
					<Stack direction="row" justifyContent="space-between">
						<Button onClick={() => onVoteClicked(false)}>No</Button>
						<Button onClick={() => onVoteClicked(true)}>Yes</Button>
					</Stack>
				) : (
					<Typography display="block" variant="body1">
						You need to be a member in order to vote for this proposal.
					</Typography>
				)}
			</Box>
		</Stack>
	)
}
