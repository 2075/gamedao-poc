import React from 'react'
import { Box } from '.'

export const ICON_MAPPING = {
	logo: `${process.env.PUBLIC_URL}/assets/gamedao_tangram.svg`,
	logoWhite: `${process.env.PUBLIC_URL}/assets/gamedao_tangram_white.svg`,
	campains: `${process.env.PUBLIC_URL}/assets/icon_campaigns.svg`,
	dashboard: `${process.env.PUBLIC_URL}/assets/icon_dashboard.svg`,
	documentation: `${process.env.PUBLIC_URL}/assets/icon_documentation.svg`,
	howitworks: `${process.env.PUBLIC_URL}/assets/icon_howitworks.svg`,
	organizations: `${process.env.PUBLIC_URL}/assets/icon_organizations.svg`,
	organizations2: `${process.env.PUBLIC_URL}/assets/icon_organizations_2.svg`,
	store: `${process.env.PUBLIC_URL}/assets/icon_store.svg`,
	tangram: `${process.env.PUBLIC_URL}/assets/icon_tangram.svg`,
	voting: `${process.env.PUBLIC_URL}/assets/icon_voting.svg`,
	wallet: `${process.env.PUBLIC_URL}/assets/icon_wallet.svg`,
	moon: `${process.env.PUBLIC_URL}/assets/icon_moon.svg`,
	sun: `${process.env.PUBLIC_URL}/assets/icon_sun.svg`,
	logout: `${process.env.PUBLIC_URL}/assets/icon_logout.svg`,
}

export function Icons({ src, alt, ...props }) {
	return <Box component={'img'} src={src} alt={alt || 'icon'} {...props} />
}
