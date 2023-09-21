
const queryFetcher = async (url) => {
  const response = await fetch(url, {
    method: 'GET',  
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const result = await response.json()
  return result;
};

const mutationPostFetcher = async(url, { arg }) => { 
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }, 
    body: arg ? JSON.stringify(arg) : null,  
  });  
  if (!response.ok) { 
    const error = new Error('Fail to perform post mutation')
    error.info = await response.json()
    error.status = response.status
    throw error
  } else { 
    const result = await response.json();
    return result;
  }
};

const uploadPostMutation = async(url, { arg }) => { 
  const response = await fetch(url, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // }, 
    body: arg
    // body: arg
  });  
  if (!response.ok) { 
    const error = new Error('Fail to perform post mutation')
    error.info = await response.json()
    error.status = response.status
    throw error
  } else { 
    const result = await response.json();
    return result;
  }
};

const mutationPutFetcher = async(url, { arg }) => { 
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }, 
    body: arg ? JSON.stringify(arg) : null,  
  });  
  if (!response.ok) { 
    const error = new Error('Fail to perform post mutation')
    error.info = await response.json()
    error.status = response.status
    throw error
  } else { 
    const result = await response.json();
    return result;
  }
};
  
const mutationDeleteFetcher = async(url, { arg }) => { 
  const response = await fetch(url + '/' + arg, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json',
    },  
  });
  if (!response.ok) { 
    const error = new Error('Fail to perform delete mutation')
    error.info = await response.json()
    error.status = response.status
    throw error
  } else { 
    const result = await response.json();
    return result;
  }
}
  
export {
  queryFetcher,
  mutationPostFetcher,
  mutationPutFetcher,
  mutationDeleteFetcher,
  uploadPostMutation
}