// app/hooks/useSpotifyAuth.ts
import * as AuthSession from 'expo-auth-session';
import { useEffect, useState } from 'react';

// Define a type for the hook's return value for better type checking and clarity
interface AuthHookReturnType {
  token: string | null;
  promptAsync: () => Promise<AuthSession.AuthSessionResult>;
  redirectUri: string;
}

const useSpotifyAuth = (clientId: string): AuthHookReturnType => {
  const [token, setToken] = useState<string | null>(null);

  // Automatically determine the correct redirect URI
  const redirectUri = AuthSession.makeRedirectUri();

  console.log("Redirect URI:", redirectUri);  // Print the redirect URI to the console

  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    clientId,
    scopes: ['user-read-email', 'playlist-read-private', 'streaming', 'user-modify-playback-state'],
    responseType: AuthSession.ResponseType.Token,
    usePKCE: false,
    redirectUri,
  }, discovery);

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  return { token, promptAsync, redirectUri }; // Return the redirectUri for debugging or display purposes
};

export default useSpotifyAuth;
