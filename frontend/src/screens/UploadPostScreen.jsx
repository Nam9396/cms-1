import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { gql, useLazyQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import { SpinnerPage } from '../components/Spinner'
import useSWRMutation from 'swr/mutation'
import { BASE_URL, POST_URL } from '../constant'
import { mutationPostFetcher } from '../swr/fetchFrame'

const UploadPostScreen = () => {
  const [ queryContent, setQueryContent ] = useState(`
  query NewQuery {
    posts(first: 1) {
      nodes {
        title(format: RENDERED)
      }
    }
  }
  `);
  const [ result, setResult ] = useState([]);

  const query = gql`
    ${queryContent}
  `
  const [ trigger, { data, loading } ] = useLazyQuery(query)
  const { trigger: addPosts, isMutating } = useSWRMutation(`${BASE_URL}/${POST_URL}/add-post`, mutationPostFetcher)
  
  const addPostMeta = async() => {
    try { 
      const res = await addPosts(result);
      toast.success(res)
    } catch(err) { 
      toast.error(err?.info || err?.error)
    }
  }
  
  useEffect(() => {
    if (queryContent) {
      trigger();
      setResult(data?.posts?.nodes.map((post) =>({
        title: post?.title,
        slug: post?.slug,
        serpTitle: post?.title + " | bacsichobeyeu", 
        url: "https://bacsichobeyeu.com/posts" + post?.slug,
        featureImg: post?.featuredImage?.node?.mediaItemUrl,
        description: post?.seo?.description,
        keyword: post?.seo?.focusKeywords?.join(", "),
        category: post?.categories?.nodes[0]?.ancestors?.nodes[0]?.name,
        tag: post?.categories?.nodes[0]?.name,
        modePublish: "draft"
      })))
    }
  }, [ queryContent, trigger, data ])


  return (
    <>
      {/* form section  */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 '>
        <div className='col-span-1'>
          <label htmlFor="query" className="block text-sm font-medium leading-6 text-gray-900 my-4">
            WP GraphQL query
          </label>
          <textarea
            id="query"
            name="query"
            className={clsx(
            'w-full h-[100vh]',
            'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
            'py-1.5 pl-4',
            'text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
            )}
            value={queryContent || ""}
            onChange={(e) => setQueryContent(e.target.value)}
          />
        </div>

        <div className='col-span-1'>
          <label htmlFor="data" className="block text-sm font-medium leading-6 text-gray-900 my-4">
            Post data 
          </label>
          <textarea
            id="data"
            name="data"
            className={clsx(
            'w-full h-[100vh]',
            'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
            'py-1.5 pl-4',
            'text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
            )}
            value={JSON.stringify(result, null, 2) || ''} 
          />
        </div>
      </div>

      {/* button section */}
      <div className='w-full mt-10'>
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={addPostMeta}
        >
          Add post meta
        </button>
      </div>

      {(loading || isMutating) && <SpinnerPage />}
    </>
  )
}

export default UploadPostScreen;