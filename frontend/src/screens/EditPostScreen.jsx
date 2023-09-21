import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import MetaData from '../components/MetaInput'
import PostContent from '../components/PostContent'
import UploadDocx from '../components/UploadDoc'
import PublishButton from '../components/PublishButton'
import { toast } from 'react-toastify'
import { SpinnerPage } from '../components/Spinner'
import { BASE_URL, POST_URL } from '../constant.js'
import { mutationPutFetcher, queryFetcher } from '../swr/fetchFrame.js'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { createPostURL, createSERPtitle, createSlug } from '../utils/createMetaData'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function EditPostScreen() {
  let [categories] = useState(['Meta data', 'Post content', 'Upload .docx file'])
  const [ title, setTitle ] = useState('');
  const [ slug, setSlug ] = useState('');
  const [ serpTitle, setSerpTitle ] = useState('');
  const [ url, setUrl ] = useState('');
  const [ featureImg, setFeatureImg ] = useState('');
  const [ keyword, setKeyword ] = useState('');
  const [ preview, setPreview ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ typeContent, setTypeContent ] = useState('');
  const [ tag, setTag ] = useState('');
  const [ order, setOrder ] = useState('');
  const [ mdx, setMdx ] = useState('');
  const [ html, setHtml ] = useState('');
  const [ imgURL, setImgURL ] = useState('');
  const [ modePublish, setModePublish ] = useState('live');
  const [ modeFetch, setModeFetch ] = useState('always');

  // get post by slug for initial data
  const { data, isLoading } = useSWR(`${BASE_URL}/${POST_URL}/edit/${sessionStorage.getItem('slug')}`, queryFetcher);
  // put data for updating post
  const { trigger, isMutating } = useSWRMutation(`${BASE_URL}/${POST_URL}/edit/${sessionStorage.getItem('slug')}`, mutationPutFetcher)

  useEffect(() => {
    if (data) { 
      setTitle(data?.title);
      setSlug(data?.slug);
      setSerpTitle(data?.serpTitle);
      setUrl(data?.url);
      setFeatureImg(data?.featureImg);
      setKeyword(data?.keyword);
      setDescription(data?.description);
      setPreview(data?.preview);
      setCategory(data?.category);
      setTypeContent(data?.typeContent);
      setTag(data?.tag);
      setAuthor(data?.author);
      setOrder(data?.order);
      setMdx(data?.content);
      setModePublish(data?.modePublish);
      setModeFetch(data?.modeFetch);
    } 
  }, [data])

  useEffect(() => {
    setSlug(createSlug(title));
    setSerpTitle(createSERPtitle(title));
    setUrl(createPostURL(title));
  }, [setSlug, setSerpTitle, setUrl, title])

  const submitHandler = async(e) => { 
    e.preventDefault();
    const data = {
      title: title, 
      slug: slug,
      serpTitle: serpTitle, 
      url: url,
      featureImg: featureImg,
      imgURL: imgURL, 
      keyword: keyword, 
      preview: preview, 
      description: description, 
      author: author, 
      category: category, 
      typeContent: typeContent, 
      tag: tag, 
      order: order,
      content: mdx, 
      modeFetch: modeFetch,
      modePublish: modePublish
    };
    try {
      await trigger(data)
      toast.success('Post updated!');
    } catch (err) {
      toast.error(err?.info || err?.error);
      console.log(err);
    }
  }

  return (
    <form className="w-full" onSubmit={submitHandler}>
      <Tab.Group>
        <Tab.List className="w-full flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
          
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <MetaData 
              title={title} setTitle={setTitle}
              slug={slug} setSlug={setSlug}
              serpTitle={serpTitle} setSerpTitle={setSerpTitle}
              url={url} setUrl={setUrl}
              featureImg={featureImg} setFeatureImg={setFeatureImg}
              keyword={keyword} setKeyword={setKeyword}
              preview={preview} setPreview={setPreview}
              description={description} setDescription={setDescription}
              author={author} setAuthor={setAuthor}
              category={category} setCategory={setCategory}
              typeContent={typeContent} setTypeContent={setTypeContent}
              tag={tag} setTag={setTag}
              order={order} setOrder={setOrder}
              modeFetch={modeFetch} setModeFetch={setModeFetch}
            />
          </Tab.Panel>
          <Tab.Panel>
            <PostContent
              mdx={mdx} setMdx={setMdx}
              html={html} setHtml={setHtml}
            />
          </Tab.Panel>
          <Tab.Panel>
            <UploadDocx
              imgURL={imgURL} setImgURL={setImgURL} 
              mdx={mdx} setMdx={setMdx}  
              html={html}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      
      <PublishButton modePublish={modePublish} setModePublish={setModePublish} />

      {(isLoading || isMutating) && <SpinnerPage />}
      
    </form>
  )
}
