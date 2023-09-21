import React from "react"
import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import ReactDOMServer from "react-dom/server"
import { useEffect } from "react"
import ContentTypeTab from "./ContentTypeTab"


const PostContent = ({ mdx, html, setMdx, setHtml }) => {
  
  const mdxToHtml = async(mdx) => {
    const code = String(await compile(mdx, { outputFormat: "function-body" }));
    const { default: Content } = await run(code, runtime);
    return ReactDOMServer.renderToStaticMarkup(React.createElement(Content));
  }

  useEffect(() => { 
    mdxToHtml(mdx).then((html) => setHtml(html))
  }, [mdx, setHtml])


  return (
    <div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10">
            {/* post content */}
            <ContentTypeTab 
              mdx={mdx} html={html}
              setMdx={setMdx} setHtml={setHtml}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostContent;