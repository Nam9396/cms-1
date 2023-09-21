import React, { useState } from 'react'
import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import ReactDOMServer from "react-dom/server"
import { useEffect } from "react"
import PostLayout from '../components/PostLayout'
import useSWR from 'swr';
import { queryFetcher } from '../swr/fetchFrame';
import { SpinnerPage } from '../components/Spinner'
import { BASE_URL, POST_URL } from '../constant'

const PreviewScreen = () => {
  const [ html, setHtml ] = useState('');
  const { data, isLoading } = useSWR(`${BASE_URL}/${POST_URL}/${sessionStorage.getItem('slug')}`, queryFetcher);

  const mdxToHtml = async(mdx) => {
    const code = String(await compile(mdx, { outputFormat: "function-body" }));
    const { default: Content } = await run(code, runtime);
    return ReactDOMServer.renderToStaticMarkup(React.createElement(Content));
  }

  useEffect(() => { 
    mdxToHtml(data?.content).then((html) => setHtml(html))
  }, [data])

  return (
    <>
      <PostLayout>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </PostLayout>
      {isLoading && <SpinnerPage />}
    </>
  )
}

export default PreviewScreen