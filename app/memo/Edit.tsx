import { View, TextInput, Alert, StyleSheet } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { auth, db } from '../../config'
import KeyboardSafeView from '../../components/KeyboardAvoidingView'

const handlePress = (id: string, bodyText: string): void => {
    if(auth.currentUser === null) return
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    setDoc(ref, {
        bodyText,
        updatedAt: Timestamp.fromDate(new Date())
    })
    .then(() => {
        router.back()
    })
    .catch((error) => {
        console.log(error)
        Alert.alert('更新に失敗しました。')
    })
}
const Edit = (): JSX.Element => {
    const id = String(useLocalSearchParams().id)
    const [bodyText, setBodyText] = useState('')

    useEffect(() => {
        if(auth.currentUser === null) return
        const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
        getDoc(ref)
            .then((docRef) => {
                const remoteBodyText = docRef.data()?.bodyText
                setBodyText(remoteBodyText)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <KeyboardSafeView style={styles.container}>
            <View style={styles.inputConrainer}>
                <TextInput 
                    style={styles.input} 
                    multiline 
                    value={bodyText} 
                    onChangeText={(text) => { setBodyText(text) }}
                    autoFocus
                />
            </View>
            <CircleButton onPress={() => { handlePress(id, bodyText) }}>
                <Icon name='check' size={40} color='#FFFFFF' />
            </CircleButton>
        </KeyboardSafeView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    inputConrainer: {
        flex: 1
    },
    input: {
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24
    }
})

export default Edit