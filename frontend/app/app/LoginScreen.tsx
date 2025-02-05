import { Text, View, StyleSheet, Image, Button } from 'react-native';
export default function LoginScreen() {
    return (
        <View style={styles.container} >
            <Text style={styles.title}>Login</Text>
            <Button title="Login" onPress={()=>{}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});