import React from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import * as roleService from '../services/role.service'
import ListItem from '../components/ListItem'
import { Role } from '../model'

export default function RolesPage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [roles, setRoles] = React.useState<Array<Role>>([])

    function fetchRoles() {
        roleService.getList().then(data => setRoles(data))
    }

    React.useEffect(() => {
        navigation.addListener('focus', fetchRoles)

        navigation.setOptions({
            title: 'Roles',
            headerRight: () => <Button title='Add' onPress={() => navigation.navigate('role')} />
        })
    }, [])

    function update(role: Role) {
        navigation.navigate('role', { role })
    }

    function remove(role: Role) {
        roleService.remove(role.id!).then(deleted => {
            if (deleted) fetchRoles()
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listagem de Roles</Text>
            <Text>{roles.length} roles cadastradas.</Text>

            <View>
                <FlatList
                    data={roles}
                    keyExtractor={role => role.id!.toString()}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.name}
                            subtitle={item.description || ''}
                            onUpdate={() => update(item)}
                            onDelete={() => remove(item)}
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
})

