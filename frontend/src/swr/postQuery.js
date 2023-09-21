import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { BASE_URL, POST_URL } from './constant.js';
import { mutationDeleteFetcher, mutationPostFetcher, mutationPutFetcher, queryFetcher } from './fetchFrame.js';

const CreatePost = () => { 
  const { trigger, isMutating, error } = useSWRMutation(`${BASE_URL}/${POST_URL}`, mutationPostFetcher);
  return { trigger, isMutating, error };
};

const GetAllPost = () => { 
  const { data, isLoading, error, mutate } = useSWR(`${BASE_URL}/${POST_URL}/all`, queryFetcher);
  return { data, isLoading, error, mutate };
}

const UpdatePost = () => { 
  const { trigger, isMutating, error } = useSWRMutation(`${BASE_URL}/${POST_URL}/edit`, mutationPutFetcher);
  return { trigger, isMutating, error };
};

const DeletePost = (id) => { 
  const { trigger, isMutating, error } = useSWRMutation(`${BASE_URL}/${POST_URL}`, mutationDeleteFetcher);
  return { trigger, isMutating, error };
};


export { 
  CreatePost,
  GetAllPost,
  UpdatePost,
  DeletePost,
}
