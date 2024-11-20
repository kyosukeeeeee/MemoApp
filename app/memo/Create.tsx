import { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db, auth } from '../../config'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import KeyboardSafeView from '../../components/KeyboardAvoidingView'

const handlePress = (bodyText: string): void => {
    if(auth.currentUser === null) return
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
    
    addDoc(ref, {
        bodyText, //bodyText: bodyText
        updatedAt: Timestamp.fromDate(new Date())
    })
    .then((docRef) => {
        console.log('success', docRef.id)
        router.back()
    })
    .catch((error) => {
        console.log(error)
    })
}


const Create = (): JSX.Element => {
    const [bodyText, setBodyText] = useState('')
    return (
        <KeyboardSafeView style={styles.container}>
            <View style={styles.inputConrainer}>
                <TextInput 
                    style={styles.input} 
                    multiline 
                    value={bodyText}
                    onChangeText={(text) => setBodyText(text)}
                    autoFocus
                />
            </View>
            <CircleButton onPress={() => { handlePress(bodyText) }}>
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
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24
    }
})

export default Create