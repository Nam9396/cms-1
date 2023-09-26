const clientId = '1a4cd420-a0e6-4717-aafd-60f85ca664f4';
const clientSecret = 'UFG8Q~jr8krBiJTjdWKvDAcmAQC_OkQDg-ldlare';

const authUrl = 'https://login.microsoftonline.com/cb9d5516-5a59-439f-947a-0564889aacc9/oauth2/token';
const apiUrl = 'https://graph.microsoft.com/v1.0/me/drive/root/children';

const getToken = async () => {
  const postData = `client_id=${clientId}&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default&client_secret=${clientSecret}&grant_type=client_credentials`;

  try {
    const res = await fetch(authUrl, {
      method: "POST", 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(postData)
    })

    // return res.data.access_token;
    return res;
  } catch (error) {
    console.error('Error getting access token:', error.message);
    throw error;
  }
};

const testFunction = async (req, res) => {
  try {
    const accessToken = await getToken();
    const res = await fetch(apiUrl, {
      method: "GET", 
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    const files = res.data.value;
    res.json(files);
  } catch (error) {
    console.error('Error accessing OneDrive:', error.message);
    res.status(500).send('Error accessing OneDrive');
  }
};




export { 
  testFunction,
}


