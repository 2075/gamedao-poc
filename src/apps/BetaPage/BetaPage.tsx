import { Button, Card, Paper, Stack, Typography } from '../../components'
import { Box, CardContent, CardMedia } from '@mui/material'
import './textOverride.css'
import { useTheme } from '@mui/material/styles'
import { useCallback } from 'react'
import { useWallet } from '../../context/Wallet'
import { useStore } from '../../context/Store'

import cassette from "../QuestPage/modules/resources/cassette.png"
import datasette from "../QuestPage/modules/resources/datasette.png"
import joystick from "../QuestPage/modules/resources/joystick.png"

export function BetaPage() {
	const theme = useTheme()
	const { updateWalletState, connected } = useWallet()
	const { updateStore, allowConnection } = useStore()
	const handleConnect = useCallback(
		(e) => {
			e.stopPropagation()
			if (allowConnection) {
				updateWalletState({ allowConnect: true })
			} else {
				updateStore({ allowConnection: true })
			}
		},
		[allowConnection, updateWalletState, updateStore]
	)

	return (
		<Stack spacing={4}>
			<Card>
				<Stack direction={"row"}>
					<CardMedia style={{ width: "33.3%" }} component="img" alt="hero" image={cassette} />
					<CardMedia style={{ borderLeft: "2.5px dashed white", width: "33.3%" }} component="img" alt="hero" image={datasette} />
					<CardMedia style={{ borderLeft: "2.5px dashed white", width: "33.3%" }} component="img" alt="hero" image={joystick} />
				</Stack>
				<CardContent>
					<Stack spacing={4} padding={4}>
						<Typography className="beta-page__title-color">
							UNLOCK THE GATES TO GAMEDAO
						</Typography>
						<Typography>
							GameDAO is a fundraising, coordination and ownership protocol for video
							games, creators and teams building in the dotsama ecosystem. You can use
							it in almost any way you want. This is the closed beta to build and test
							together with you.
						</Typography>
						<Typography>
							In order to access the beta of GameDAO{' '}
							<span style={{ color: '#21E19D' }}>two prerequisites</span> are needed.
						</Typography>
					</Stack>
				</CardContent>
			</Card>

			<Stack spacing={4} direction="row" width={'100%'}>
				<Paper sx={{ flex: '1' }}>
					<Box width="100%" padding={4}>
						<Stack direction="row" spacing={4} alignItems="center">
							<div className="beta-page__ellipse beta-page__ellipse--1" />
							<Typography>Create your own polkadot wallet</Typography>
						</Stack>
						<ol style={{ paddingLeft: '7.2rem' }}>
							<li>
								<Typography>
									Follow the steps in our{' '}
									<a style={{ color: theme.palette.text.primary }} href={'#'}>
										documentation.
									</a>
									<span style={{ fontStyle: 'italic' }}>
										{' '}
										Already have your own polkadot wallet? Skip to step 2.
									</span>
								</Typography>
							</li>
						</ol>
					</Box>
				</Paper>
				<Paper sx={{ flex: '1' }}>
					<Box width="100%" padding={4}>
						<Stack direction="row" spacing={4} alignItems="center">
							<div className="beta-page__ellipse beta-page__ellipse--2" />
							<Typography>Get your personal tangram key</Typography>
						</Stack>
						<ol style={{ paddingLeft: '7.2rem' }}>
							<li>
								<Typography>
									Join our{' '}
									<a style={{ color: theme.palette.text.primary }} href={'#'}>
										discord server
									</a>
								</Typography>
							</li>
							<li>
								<Typography>
									Follow the guides in the channel #gamedao-beta-invite
								</Typography>
							</li>
						</ol>
					</Box>
				</Paper>
			</Stack>

			{!connected && (
				<Stack
					component={Paper}
					padding={4}
					direction="row"
					spacing={4}
					alignItems="center"
					justifyContent="space-between"
				>
					<Typography>
						<strong>All done?</strong> Let’s get started by connecting your wallet!
					</Typography>
					<Button variant="contained" onClick={handleConnect}>
						Connect Wallet
					</Button>
				</Stack>
			)}
		</Stack>
	)
}
