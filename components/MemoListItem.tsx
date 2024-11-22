import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Link } from 'expo-router'
import { deleteDoc, doc } from 'firebase/firestore'

import Icon from './Icon'
import { type Memo } from '../types/memo'
import { auth, db } from '../config'

interface Props {
    memo: Memo
}

const handlePress = (id: string): void => {
    if(auth.currentUser === null) return
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    Alert.alert('メモを削除します。','よろしいですか？',[
        {
            text: 'キャンセル'
        },
        {
            text: '削除する',
            onPress: () => {
                deleteDoc(ref)
                .catch(() => { Alert.alert('削除に失敗しました')})
            }
        }
    ])
}

const MemoListItem = ( props: Props ): JSX.Element | null => {
    const { id, bodyText, updatedAt } = props.memo
    if(bodyText === null || updatedAt === null) { return null }
    const dateString = updatedAt.toDate().toLocaleDateString('ja-JP')
    return (
        <Link 
            href={{ pathname: 'memo/Detail', params: {id: id}}}
            asChild
        >
            <TouchableOpacity style={styles.memoListItem}>
                <View>
                    <Text style={styles.memoListItemTitle} numberOfLines={1}>{bodyText}</Text>
                    <Text style={styles.memoListItemDate}>{dateString}</Text>
                </View>
                <TouchableOpacity onPress={() => { handlePress(id) }}>
                    <Icon name='delete' size={32} color='#B0B0B0' />
                </TouchableOpacity>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    memoListItem: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 19,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)'
    },
      memoListItemTitle: {
        fontSize: 16,
        lineHeight: 32
    },
      memoListItemDate: {
        fontSize: 12,
        lineHeight: 16,
        color: '#848484'
    }
})

export default MemoListItem