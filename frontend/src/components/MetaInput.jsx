import clsx from "clsx";


const MetaData = ({
  title, setTitle, 
  slug, setSlug,
  serpTitle, setSerpTitle,
  url, setUrl,
  featureImg, setFeatureImg,
  keyword, setKeyword,
  preview, setPreview, 
  description, setDescription, 
  author, setAuthor, 
  category, setCategory, 
  typeContent, setTypeContent, 
  tag, setTag, 
  order, setOrder,
  modeFetch, setModeFetch
}) => {
  return (
    <div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* title input */}
            <div className="col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Post title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className={clsx(
                  'w-full',
                  'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                 'py-1.5 pl-4',
                  'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                )}
                placeholder="Post title"
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {/* slug input */}
            <div className="col-span-4">
              <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">
                Slug url
              </label>
              <input
                type="text"
                name="slug"
                id="slug"
                className={clsx(
                  'w-full',
                  'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                 'py-1.5 pl-4',
                  'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                )}
                placeholder="Post slug"
                value={slug || ''}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            {/* serp title input */}
            <div className="col-span-4">
              <label htmlFor="serp-title" className="block text-sm font-medium leading-6 text-gray-900">
                SERP title
              </label>
              <input
                type="text"
                name="serp-title"
                id="serp-title"
                className={clsx(
                  'w-full',
                  'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                  'py-1.5 pl-4',
                  'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                )}
                placeholder="SERP title"
                value={serpTitle || ''}
                onChange={(e) => setSerpTitle(e.target.value)}
              />
            </div>
            {/* post url link */}
            <div className="col-span-4">
              <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
                Post url
              </label>
              <input
                type="text"
                name="url"
                id="url"
                className={clsx(
                  'w-full',
                  'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                  'py-1.5 pl-4',
                  'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                )}
                placeholder="Post URL"
                value={url || ''}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            {/* feature image */}
            <div className="col-span-4">
              <label htmlFor="feature-img" className="block text-sm font-medium leading-6 text-gray-900">
                Feature image url
              </label>
              <input
                type="text"
                name="feature-img"
                id="feature-img"
                className={clsx(
                  'w-full',
                  'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                  'py-1.5 pl-4',
                  'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                )}
                placeholder="Image URL"
                value={featureImg || ''}
                onChange={(e) => setFeatureImg(e.target.value)}
              />
            </div>
            {/* focus keyword */}
            <div className="col-span-4">
              <label htmlFor="keyword" className="block text-sm font-medium leading-6 text-gray-900">
                Focus keyword
              </label>
              <input
                type="text"
                name="keyword"
                id="keyword"
                className={clsx(
                  'w-full',
                  'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                  'py-1.5 pl-4',
                  'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                )}
                value={keyword || ''}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            {/* preview description */}
            <div className="col-span-6">
              <label htmlFor="preview" className="block text-sm font-medium leading-6 text-gray-900">
                Preview text
              </label>
              <textarea
                id="preview"
                name="preview"
                rows={3}
                className={clsx(
                  'w-full',
                  'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                  'py-1.5 pl-4',
                  'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                )}
                value={preview || ''}
                onChange={(e) => setPreview(e.target.value)}
             />
            </div>
            {/* seo description */}
            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                SEO description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className={clsx(
                  'w-full',
                  'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                  'py-1.5 pl-4',
                  'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                )}
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>      
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* author input */}
            <div className="sm:col-span-3">
              <label htmlFor="author" className="block text-sm font-medium leading-6 text-gray-900">
                Author
              </label>
              <input
                type="text"
                name="author"
                id="author"
                className={clsx(
                  'w-full',
                  'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                  'py-1.5 pl-4',
                  'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                )}
                value={author || ""}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            {/* Category */}
            <div className="sm:col-span-2">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                className={clsx(
                  'w-full',
                  'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                  'py-1.5 pl-4',
                  'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                )}
                value={category || ''}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            {/* type of content */}
            <div className="sm:col-span-2">
              <label htmlFor="typeContent" className="block text-sm font-medium leading-6 text-gray-900">
                Type of content
              </label>
              <input
                type="text"
                name="typeContent"
                id="typeContent"
                className={clsx(
                  'w-full',
                  'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                  'py-1.5 pl-4',
                  'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                )}
                value={typeContent || ""}
                onChange={(e) => setTypeContent(e.target.value)}
              />
            </div>
            {/* sub tag */}
            <div className="sm:col-span-1">
              <label htmlFor="tag" className="block text-sm font-medium leading-6 text-gray-900">
                Tag content
              </label>
              <input
                type="text"
                name="tag"
                id="tag"
                className={clsx(
                  'w-full',
                  'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                  'py-1.5 pl-4',
                  'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                )}
                value={tag || ''}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            {/* publish order */}
            <div className="sm:col-span-1">
              <label htmlFor="tag" className="block text-sm font-medium leading-6 text-gray-900">
                Publish order
              </label>
              <input
                type="number"
                name="order"
                id="order"
                className={clsx(
                  'w-full',
                  'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                  'py-1.5 pl-4',
                  'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
                )}
                value={order || ''}
                onChange={(e) => setOrder(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Order of priority</legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="always"
                    name="fetchMode"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    value="always"
                    checked={modeFetch === 'always'}
                    onChange={(e) => setModeFetch(e.target.value)}
                  />
                  <label htmlFor="always" className="block text-sm font-medium leading-6 text-gray-900">
                    Always
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="if-needed"
                    name="fetchMode"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    value="if needed"
                    checked={modeFetch === 'if needed'}
                    onChange={(e) => setModeFetch(e.target.value)}
                  />
                  <label htmlFor="if-needed" className="block text-sm font-medium leading-6 text-gray-900">
                    If needed
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetaData;