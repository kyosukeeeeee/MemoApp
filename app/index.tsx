import { useEffect } from 'react'
import { Redirect, router } from 'expo-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config'


const Index = (): JSX.Element => {
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if(user !== null) {
				router.replace('memo/List')
			}
		})
	}, [])

	return <Redirect href='auth/Login' />
}

export default Index