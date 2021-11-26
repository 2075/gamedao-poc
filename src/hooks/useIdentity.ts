import { ApiPromise } from '@polkadot/api'
import { useApiProvider } from '@substra-hooks/core'
import { useState, useEffect } from 'react'
import { useIsMountedRef } from './useIsMountedRef'
import { to } from 'await-to-js'
import { createErrorNotification } from 'src/utils/notification'
import { useDispatch, useSelector } from 'react-redux'
import { identityStateSelector, updateIdentityAction } from 'src/redux/duck/identity.duck'

type IdentityState = {
	identities: Object
}

const INITIAL_STATE: IdentityState = {
	identities: {},
}

async function queryAccountIdentity(apiProvider: ApiPromise, address: string): Promise<any> {
	const context = apiProvider.query.assets.account
	if (!context) return INITIAL_STATE

	const [error, data] = await to(apiProvider.query.identity.identityOf(address))

	if (error) {
		console.error(error)
		createErrorNotification('Error while querying the account identity')
		return INITIAL_STATE
	}

	return data
}

// Get Account Identity
export const useIdentity = (address: string) => {
	const identityState = useSelector(identityStateSelector)
	const dispatch = useDispatch()
	const apiProvider = useApiProvider()

	useEffect(() => {
		if (apiProvider && address && !(identityState ?? {})?.identities?.[address]) {
			queryAccountIdentity(apiProvider, address).then((identity) => {
				dispatch(
					updateIdentityAction({
						identities: { ...identityState.identities, [address]: identity },
					})
				)
			})
		}
	}, [address, apiProvider])

	return (identityState ?? {})?.identities?.[address]
}
