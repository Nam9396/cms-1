import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import MetaData from '../components/MetaInput'
import PostContent from '../components/PostContent'
import UploadDocx from '../components/UploadDoc'
import PublishButton from '../components/PublishButton'
import { toast } from 'react-toastify'
import { SpinnerBottom } from '../components/Spinner'
import { BASE_URL, POST_URL } from '../constant.js'
import { mutationPostFetcher } from '../swr/fetchFrame.js';
import useSWRMutation from 'swr/mutation'
import { createPostURL, createSERPtitle, createSlug } from '../utils/createMetaData'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function AddPostScreen() {
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
  const [ datePublish, setDatePublish ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ typeContent, setTypeContent ] = useState('');
  const [ tag, setTag ] = useState('');
  const [ order, setOrder ] = useState('');
  const [ mdx, setMdx ] = useState('');
  const [ html, setHtml ] = useState('');
  const [ imgURL, setImgURL ] = useState('');
  const [ modePublish, setModePublish ] = useState('live');
  const [ modeFetch, setModeFetch ] = useState('always');

  useEffect(() => {
    setSlug(createSlug(title));
    setSerpTitle(createSERPtitle(title));
    setUrl(createPostURL(title));
  }, [setSlug, setSerpTitle, setUrl, title])

  const { trigger, isMutating } = useSWRMutation(`${BASE_URL}/${POST_URL}`, mutationPostFetcher);

  const submitHandler = async(e) => { 
    e.preventDefault();
    const data = {
      title: title, 
      slug: slug,
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
      toast.success('Post created!');
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
              datePublish={datePublish} setDatePublish={setDatePublish}
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

      {isMutating && <SpinnerBottom />}
      
    </form>
  )
}
