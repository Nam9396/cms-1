import { Link, useNavigate } from 'react-router-dom'
import { IoOpenOutline } from 'react-icons/io5'
import { FiEdit } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import { SpinnerPage } from '../components/Spinner'
import { BASE_URL, POST_URL } from '../constant.js'
import useSWR from 'swr'
import { mutationDeleteFetcher, queryFetcher } from '../swr/fetchFrame'
import useSWRMutation from 'swr/mutation'
import { toast } from 'react-toastify'
import Modal from '../components/Modal'
import { useState } from 'react'

const PostListScreen = () => {
  const navigate = useNavigate();
  const [ alertDisplay, setAlertDisplay ] = useState(false);
  const [ postSlug, setPostSlug ] = useState('');
  const { data, isLoading, mutate: reFectchPost } = useSWR(`${BASE_URL}/${POST_URL}/all`, queryFetcher);
  const { trigger, isMutating } = useSWRMutation(`${BASE_URL}/${POST_URL}`, mutationDeleteFetcher);

  const editPost = (postSlug) => { 
    sessionStorage.setItem('slug', postSlug);
    navigate('/edit-post');
  };

  const previewPost = (postSlug) => { 
    sessionStorage.setItem('slug', postSlug);
    navigate('/preview-post')
  }

  const deletePost = async(postSlug) => { 
    try { 
      await trigger(postSlug);
      toast.success('Post deleted');
      reFectchPost();
    } catch(err) { 
      toast.error(err?.info || err.error)
    }
  }

  const alertHandler = (postSlug) => { 
    setAlertDisplay(true);
    setPostSlug(postSlug);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* header section */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Posts</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to='/add-post'
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add post
          </Link>
        </div>
      </div>

      {/* table content section */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              {/* thead section */}
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Title
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Tag
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Publish date
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              {/* tbody section */}
              <tbody className="divide-y divide-gray-200 bg-white">
                {data?.map((post, index) => (
                  <tr key={index}>
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8 max-w-3xl">
                      {post?.title}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 max-w-md">{post?.category}</td>
                    <td className="px-3 py-4 text-sm text-gray-500 max-w-md">{post?.tag}</td>
                    <td className="px-3 py-4 text-sm text-gray-500 max-w-md">{new Date(post?.datePublish).toLocaleString()}</td>
                    <td className="min-w-lg relative py-4 pl-3 pr-4 text-base font-medium sm:pr-6 lg:pr-8 flex flex-row items-center gap-x-2 ">
                      <button className="font-semibold text-indigo-600 hover:text-teal-500"
                        onClick={() => editPost(post?.slug)}
                      >
                        <FiEdit />
                      </button>
                      <button className="font-semibold text-indigo-600 hover:text-teal-500"
                        onClick={() => previewPost(post?.slug)}
                      >
                        <IoOpenOutline />
                      </button>
                      <button className="font-semibold text-indigo-600 hover:text-teal-500"
                        onClick={() => alertHandler(post?.slug)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {(isLoading || isMutating) && <SpinnerPage />}
      {alertDisplay && <Modal 
        variant={'success'} 
        header="Are you sure?" 
        detail="Continuing will delete this post permanetly."
        name1={"Cancel"}
        fn1={() => setAlertDisplay(false)}
        name2={"Delete"}
        fn2={() => {deletePost(postSlug); setAlertDisplay(false)}}
      />}
      
    </div>
  )
}

export default PostListScreen;