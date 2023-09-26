import { PublicClientApplication } from '@azure/msal-browser';
import { Client  } from '@microsoft/microsoft-graph-client';
import * as msal from '@azure/msal-browser';

// secret: FT28Q~9ZgL24A5KAEXuEeOujM0vqTVJe3Ha3waMH

const msalConfig = {
  auth: {
    clientId: '1a4cd420-a0e6-4717-aafd-60f85ca664f4',
    authority: 'https://login.microsoftonline.com/cb9d5516-5a59-439f-947a-0564889aacc9',
    redirectUri: 'http://localhost:3001/auth',
  },
};

const msalRequest = { scopes: [] };
function ensureScope (scope) {
    if (!msalRequest.scopes.some((s) => s.toLowerCase() === scope.toLowerCase())) {
        msalRequest.scopes.push(scope);
    }
}

const msalClient = new PublicClientApplication(msalConfig);
await msalClient.initialize();

const signIn = async () => {
  try {
    const authResult = await msalClient.loginPopup(msalRequest);
    sessionStorage.setItem('msalAccount', authResult.account.username);
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

const getToken = async () => {
  if (!sessionStorage.getItem('msalAccount')) {
    throw new Error('User info cleared from session. Please sign out and sign in again.');
  }
  try {
    const silentRequest = {
      scopes: msalRequest.scopes,
      account: msalClient.getAccountByUsername(sessionStorage.getItem('msalAccount')),
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

const authProvider = {
  getAccessToken: async () => {
    // Call getToken in auth.js
    return await getToken();
  }
};
// Initialize the Graph client
const graphClient = Client.initWithMiddleware({ authProvider });

async function getUser() {
    ensureScope('Files.ReadWrite.All');
    return await graphClient
        .api('/me/drive/root:/pediatric/da liễu/Ghi chú bệnh da ở trẻ em.docx')
        .select('id,name,@microsoft.graph.downloadUrl')
        .get();
}

export { 
 signIn, 
 getToken, 
 getUser
}