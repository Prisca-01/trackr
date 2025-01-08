// UNUSED
// This file is not used in the project. It was created to test the Google OAuth2 authentication.
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = "7388384668-r09pn26637vgi271oddgpbb3guh9i6m3.apps.googleusercontent.com";

function GoogleSignIn() {
  const onSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    fetch('http://localhost:5175/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('User authenticated:', data);
      })
      .catch(error => console.error('Error:', error));
  };

  const onFailure = (error) => {
    console.log('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onFailure}
        scope="email profile openid"
        uxMode="popup"
        redirectUri="http://localhost:5175/oauth2callback"
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleSignIn;
