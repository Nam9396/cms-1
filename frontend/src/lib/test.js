import React, { useState, useEffect } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';

const msalConfig = {
  auth: {
    clientId: '1a4cd420-a0e6-4717-aafd-60f85ca664f4',
    authority: 'https://login.microsoftonline.com/cb9d5516-5a59-439f-947a-0564889aacc9',
    redirectUri: 'http://localhost:3001/auth',
  },
};

const msalRequest = { scopes: [] };

const msalClient = new PublicClientApplication(msalConfig);
await msalClient.initialize();

const AuthComponent = () => {
  const [userAccount, setUserAccount] = useState(null);
  const msal = useMsal();

  useEffect(() => {
    const account = sessionStorage.getItem('msalAccount');
    if (account) {
      setUserAccount(account);
    }
  }, []);

  const signIn = async () => {
    try {
      const authResult = await msalClient.loginPopup(msalRequest);
      sessionStorage.setItem('msalAccount', authResult.account.username);
      setUserAccount(authResult.account.username);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const getToken = async () => {
    if (!userAccount) {
      throw new Error('User info cleared from session. Please sign out and sign in again.');
    }
    try {
      const silentRequest = {
        scopes: msalRequest.scopes,
        account: msalClient.getAccountByUsername(userAccount),
      };
      const silentResult = await msalClient.acquireTokenSilent(silentRequest);
      return silentResult.accessToken;
    } catch (silentError) {
      if (silentError instanceof msal.InteractionRequiredAuthError) {
        try {
          const interactiveResult = await msalClient.acquireTokenPopup(msalRequest);
          return interactiveResult.accessToken;
        } catch (interactiveError) {
          console.error('Error getting token interactively:', interactiveError);
        }
      } else {
        console.error('Error getting token silently:', silentError);
      }
    }
  };

  return (
    <div>
      {userAccount ? (
        <div>
          <p>Welcome, {userAccount}!</p>
          <button onClick={getToken}>Get Token</button>
        </div>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </div>
  );
};

export default AuthComponent;
