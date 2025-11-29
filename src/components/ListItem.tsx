import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import RightActions from './RightActions'

type Props = {
    title: string
    subtitle: string
    extra?: string
    onUpdate: () => void
    onDelete: () => void
}

export default function ListItem({ title, subtitle, extra, onUpdate, onDelete }: Props) {
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={() => <RightActions onUpdate={onUpdate} onDelete={onDelete} />}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{title}</Text>
                        <Text style={styles.itemSubtitle}>{subtitle}</Text>
                        {extra && <Text style={styles.itemExtra}>{extra}</Text>}
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: Dimensions.get('window').width - 10,
    },
    itemContent: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemSubtitle: {
        color: '#555',
        marginTop: 2,
    },
    itemExtra: {
        color: '#007AFF',
        fontSize: 12,
        marginTop: 4,
    },
})