import { View, Text, StyleSheet } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'

import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import LogOutButton from '../../components/LogOutButton'

const handlePress = (): void => {
    router.push('/memo/Create')
}

const List = (): JSX.Element => {

	const navigation = useNavigation()

	useEffect(() => {
		navigation.setOptions({
			headerRight: ():JSX.Element => {
				return <LogOutButton />
			}
		})
	}, [])

	return (
		<View style={styles.container}>
			<View>
				<MemoListItem />
				<MemoListItem />
				<MemoListItem />
			</View>
			<CircleButton onPress={handlePress}>
				<Icon name='plus' size={40} color='#FFFFFF' />
			</CircleButton>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF'
	}
})

export default List