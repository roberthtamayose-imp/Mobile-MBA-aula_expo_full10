import React from "react";
import { Button, StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import Checkbox from "expo-checkbox";

import * as service from '../services/user.service';
import * as roleService from '../services/role.service';
import MyInput from '../components/MyInput';
import { User, Role } from "../model";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    let user: User | null = null
    const params = route.params as { user?: User }
    if (params && params.user) user = params.user

    const [name, setName] = React.useState(user ? user.name : '')
    const [username, setUsername] = React.useState(user ? user.username : '')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [roles, setRoles] = React.useState<Role[]>([])
    const [selectedRoles, setSelectedRoles] = React.useState<string[]>(user?.roles || [])

    React.useEffect(() => {
        navigation.setOptions({ title: user ? 'Editar Usuário' : 'Novo Usuário' })
        
        roleService.getList().then(data => {
            setRoles(data)
        })
    }, [])

    function toggleRole(roleName: string) {
        setSelectedRoles(prev => {
            if (prev.includes(roleName)) {
                return prev.filter(r => r !== roleName)
            } else {
                return [...prev, roleName]
            }
        })
    }

    function save() {
        if (name === '') {
            alert('Nome é requerido!');
            return;
        }
        if (user) {
            const editUser: User = { id: user.id, username, name, roles: selectedRoles }

            service.update(editUser).then(success => {
                navigation.goBack()
            }).catch(error => {
                console.error('Erro ao alterar o usuário: ', error)
            })

        } else {
            if (username === '') {
                alert('Login é requerido!');
                return;
            }
            if (password === '') {
                alert('Senha é requerida!');
                return;
            }
            if (password !== confirmPassword) {
                alert('Senhas não conferem!');
                return;
            }
        
            const newUser: User = { username, name, password, roles: selectedRoles }

            service.create(newUser).then(success => {
                navigation.goBack()
            }).catch(error => {
                console.error('Erro ao criar usuário: ', error)
            })
        }
    }

    return (
        <View style={styles.container}>
            <MyInput label="Login" value={username} onChangeText={setUsername} readOnly={!!user} />
            <MyInput label="Nome" value={name} onChangeText={setName} />

            { !user && (
                <>
                    <MyInput label="Senha" onChangeText={setPassword} secureTextEntry />
                    <MyInput label="Confirmar Senha" onChangeText={setConfirmPassword} secureTextEntry />
                </>
            ) }

            <View style={styles.rolesContainer}>
                <Text style={styles.rolesLabel}>Roles:</Text>
                <View style={styles.rolesWrapper}>
                    {roles.map(role => (
                        <Pressable 
                            key={role.id} 
                            style={styles.checkboxRow}
                            onPress={() => toggleRole(role.name)}
                        >
                            <Checkbox
                                value={selectedRoles.includes(role.name)}
                                onValueChange={() => toggleRole(role.name)}
                                color={selectedRoles.includes(role.name) ? '#007AFF' : undefined}
                            />
                            <Text style={styles.checkboxLabel}>{role.name}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Salvar" onPress={save} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        width: '60%',
        marginTop: 20,
    },
    rolesContainer: {
        width: '80%',
        marginBottom: 20,
    },
    rolesLabel: {
        marginBottom: 8,
        fontWeight: 'bold',
    },
    rolesWrapper: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#000',
        padding: 10,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    checkboxLabel: {
        marginLeft: 10,
        fontSize: 16,
    },
});