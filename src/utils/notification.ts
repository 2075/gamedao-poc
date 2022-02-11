import { toast } from 'react-toastify'

export function createErrorNotification(error: string) {
	return toast.error(error)
}

export function createWarningNotification(warning: string) {
	return toast.warn(warning)
}

export function createSuccessNotification(message: string) {
	return toast.success(message)
}

export function createInfoNotification(message: string) {
	return toast.info(message)
}

export function createQuestNotification(message: string) {
	return toast.info(message, {
		icon: '📖',
		// Quest close time 15sec
		autoClose: 15000,
		// TODO: Replace mit quest icon
		// icon: ({theme, type}) =>  <img src="url"/>
	})
}

export async function createPromiseNotification(
	promise: Promise<any>,
	pendingMessage: string,
	successMessage: string,
	errorMessage: string,
) {
	return toast.promise(promise, {
		pending: pendingMessage,
		success: successMessage,
		error: errorMessage,
	})
}
