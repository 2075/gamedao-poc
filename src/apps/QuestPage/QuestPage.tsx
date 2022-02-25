import { QuestItem } from './modules/questItem'
import './textOverride.css'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import useScrollPosition from '@react-hook/window-scroll'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { useRef, useMemo, useEffect, createRef, useState } from 'react'

import { Typography,  Box, Paper, Stack, useMediaQuery } from '../../components'
import { useQuestContext } from '../../context/Quest'
import { gateway } from '../lib/ipfs'

import { ipfsImageCIDs } from "./modules/ipfsImageCIDs"


function AnimatedImage(props){
	const imageNum = props.imageNum
	const [animated, setAnimated] = useState(false)

	let frame = ""

	if(animated){
		frame = ".1"
	}

	const path = "header"+imageNum+frame

	useEffect( () => {
		if(imageNum === "1" || imageNum === "2" || imageNum === "3"){
			return
		}
		const id = setInterval( () => {
			setAnimated(!animated)
		}, 1000)
		return () => clearInterval(id)
	})

	return <Box
		sx={{ 
			height: '60vh',
			backgroundImage: `url(${gateway}${ipfsImageCIDs[path]})`,
			backgroundPosition: "center",
			backgroundSize: "contain",
			backgroundRepeat: "no-repeat"
		}}
	/>
}
  
export function QuestPage() {
	const questState = useQuestContext()

	/*
	useEffect( () => {
		let myHover3D = new Hover3D(".questicon");
	}, [])
	*/

	/* sync parallax layer with scrollbars
	const pos = useScrollPosition(24)
	const parallax = useRef<IParallax>(null!)

	useEffect( () => {
		if(!parallax.current) return
		document.getElementById('parallax').onwheel = function(){ return false; }
		document.getElementById("parallax").scrollTo(0, pos)
	}, [pos])
	*/

	const isMobile = useMediaQuery('(max-width:1200px)');

	// this is quaest progress
	const headerQuestProgress = "4" // 2,3,4,5
	

	return (
	<>
		{/*<Parallax id={"parallax"} ref={parallax} style={{ width: "66vw", height: '300%', overflow: "hidden" }} pages={3}>
			<ParallaxLayer offset={1} style={{ pointerEvents: 'none' }}>
			</ParallaxLayer>

			<ParallaxLayer offset={1} speed={1.5} style={{ pointerEvents: 'none' }}>
				<img className="float" src={delorean} style={{ rotate: "26deg" , width: '33%', marginLeft: "50px" }} />
			</ParallaxLayer>
			
			<ParallaxLayer offset={3} speed={-0.5} style={{ pointerEvents: 'none' }}>
				
			</ParallaxLayer>

		</Parallax>*/}
		<Stack spacing={4}>
			<AnimatedImage imageNum={headerQuestProgress} />
			<Paper>
				<Stack padding={6} spacing={4}>
					<Typography className="quest-page__title-color">Headline</Typography>
					<Typography>
						We need your help! During our last update we lost our tangram key. Help us
						find the missing pieces to unlock the next chapter of GameDAO. By finding
						all pieces of the key and providing your valuable feedback GameDAO will be
						able to level up to the next version!
					</Typography>
				</Stack>
			</Paper>

			<Stack spacing={4} className="quest-page__container ">
				<QuestItem
					active={questState.hasQuest1Completed}
					first={true}
					activeImage={}
					title={'Quest #1'}
					description={'Connect your wallet and get your personal access key'}
					rtl={false}
				/>
				{ !isMobile && <div className="quest-page__divider--1" /> }
				<QuestItem
					active={questState.hasQuest2Completed}
					activeImage={}
					title={'Quest #2'}
					description={'Connect your wallet and get your personal access key'}
					rtl={true}
				/>
				{ !isMobile && <div className="quest-page__divider--2" /> }
				<QuestItem
					active={questState.hasQuest3Completed}
					activeImage={}
					title={'Quest #3'}
					description={'Connect your wallet and get your personal access key'}
					rtl={false}
				/>
				{ !isMobile && <div className="quest-page__divider--3" /> }
				<QuestItem
					active={questState.hasQuest4Completed}
					activeImage={}
					title={'Quest #4'}
					description={'Connect your wallet and get your personal access key'}
					rtl={true}
				/>
				{ !isMobile && <div className="quest-page__divider--4" /> }
				<QuestItem
					active={questState.hasQuest5Completed}
					activeImage={}
					title={'Quest #5'}
					description={'Connect your wallet and get your personal access key'}
					rtl={false}
				/>
				{ !isMobile && <div className="quest-page__divider--6" /> }
				<QuestItem
					active={questState.hasQuest6Completed}
					last={true}
					activeImage={}
					title={'Quest #6'}
					description={'Connect your wallet and get your personal access key'}
					rtl={true}
				/>
			</Stack>
		</Stack>
		</>
	)
}
