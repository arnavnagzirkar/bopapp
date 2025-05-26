// app/components/SpotifyLogin.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useSpotifyAuth from '../app/hooks/useSpotifyAuth';

const SpotifyLogin = () => {
    const { token, promptAsync, redirectUri } = useSpotifyAuth('b7a89c1b0811476ab453c60ae36497d9');

    return (
        <View style={styles.container}>
            <Text style={styles.uriLabel}>Redirect URI: {redirectUri}</Text>
            <Button title="Login with Spotify" onPress={() => promptAsync()} />
            {token && <Text>Token: {token}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    uriLabel: {
        marginBottom: 20,
        fontSize: 16,
    }
});

export default SpotifyLogin;
