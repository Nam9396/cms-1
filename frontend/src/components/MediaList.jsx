import React, { useState } from 'react';
import { gql, useQuery } from "@apollo/client";
import { SpinnerPage } from './Spinner';
import Modal from "./Modal";
import { toast } from 'react-toastify'
import clsx from 'clsx';

const getImagesQuery = gql`
query GET_PAGINATED_MEDIA(
  $after: String
) {
  mediaItems(first: 100, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      altText
      id
      sourceUrl(size: THUMBNAIL)
      mediaItemUrl
      title
    }
  }
}
`

const ClickToCopy = ({ buttonName, value }) => {
  
  const handleCopyClick = async () => {
    try {
      if (value) {
        await navigator.clipboard.writeText(value);
        toast.success(`${buttonName} is copied`)
      } else {
        toast.error(`${buttonName} has no value`)
      }
    } catch (error) {
      toast.error('Unable to copy: ', error);
    }
  };

  return (
    <button
      type="button"
      className="w-full rounded bg-white border-2 border-gray-200 px-2 py-1 text-xs font-semibold text-gray-300 shadow-sm hover:bg-indigo-500 hover:text-white"
      onClick={handleCopyClick}
    >
      {buttonName}
    </button>
  );
}

const ImageBox = ({ image }) => { 
  const [ tooltip, setTooltip ] = useState(false)

  return (
    <li key={image.id} className="relative flex flex-col text-center group" onMouseOver={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
      <div className="h-[150px] w-full overflow-hidden rounded-md">
        <img
          src={image.sourceUrl}
          alt={image.altText}
          className="h-full w-full object-cover group-hover:opacity-75"
        />
      </div>
      <div className="mt-1 grid grid-cols-2 gap-x-1">
        <ClickToCopy buttonName={'URL'} value={image.mediaItemUrl} />
        <ClickToCopy buttonName={'ALT'} value={image.altText} />
      </div>
      <div className={clsx(
        'p-2 bg-gray-100 text-gray-500 text-xs rounded-md ', 
        'absolute -top-10 left-0 z-10',
        tooltip ? "block" : "hidden" 
      )}>{image.mediaItemUrl}</div>
    </li>
  )
}



const MediaList = () => {
  const { data, loading, error, fetchMore } = useQuery(getImagesQuery);

  const loadMore = async(after) => { 
    try { 
      await fetchMore({
        variables: {
          after: after
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            mediaItems: {
              ...fetchMoreResult.mediaItems,
              nodes: [...prev.mediaItems.nodes, ...fetchMoreResult.mediaItems.nodes],
            },
          };
        },
      })
    } catch(err) { 
      toast.error(`Cannot fetch more items, errpr: ${err}`)
    }
  };
 

  return (
    <div className="py-16 sm:py-24 bg-white">
      <ul
        className="grid grid-cols-1 md:grid-cols-6 md:gap-x-4 md:gap-y-8 mx-auto w-full"
      >
        {data?.mediaItems?.nodes?.map((image) => (
          <ImageBox image={image} />
        ))}
      </ul>
      
      {data?.mediaItems?.pageInfo?.hasNextPage &&
      <div className='flex flex-row items-center justify-center mt-10'>
        <button
          type="button"
          className="w-fit rounded bg-indigo-500 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-200"
          onClick={() => loadMore(data?.mediaItems?.pageInfo?.endCursor)}
        >Load more</button>
      </div>}

      {loading && <SpinnerPage /> }

      {error && <Modal variant={'error'} />}
        
    </div>
  )
}

export default MediaList;