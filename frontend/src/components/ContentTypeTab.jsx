import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import clsx from "clsx";
import PostLayout from "./PostLayout";

const data = [
  {
    label: "MDX",
    value: "mdx"
  },  
  {
    label: "HTML",
    value: "html"
  },
  {
    label: "Text",
    value: "text"
  }
];
 
const ContentTypeTab = ({ mdx, html, setMdx, setHtml }) => {
  const [activeTab, setActiveTab] = React.useState("mdx");
  
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-full"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-gray-900" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="w-full">
        
        <TabPanel value={'mdx'}>
          <div className="col-span-full">
            <label htmlFor="mdx" className="block text-sm font-medium leading-6 text-gray-900 my-4">
              MDX content
            </label>
            <textarea
              id="mdx"
              name="mdx"
              className={clsx(
                'w-full h-[100vh]',
                'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                'py-1.5 pl-4',
                'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
              )}
              value={mdx || ''}
              onChange={(e) => setMdx(e.target.value)}
            />
          </div>
        </TabPanel>
        <TabPanel value={'html'}>
          <div className="col-span-full">
            <label htmlFor="html" className="block text-sm font-medium leading-6 text-gray-900 my-4">
              HTML content
            </label>
            <textarea
              id="html"
              name="html"
              className={clsx(
                'w-full h-[100vh]',
                'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
                'py-1.5 pl-4',
                'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
              )}
              value={html || ''}
              onChange={(e) => setHtml(e.target.value)}
            />
          </div>
        </TabPanel>
        <TabPanel value={'text'}>
          <div className={clsx(
            'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
            'py-1.5',
            'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
          )}>
            <PostLayout>
              <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </PostLayout>
          </div>  
        </TabPanel>
      
      </TabsBody>
    </Tabs>
  );
}

export default ContentTypeTab;