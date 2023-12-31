import { useState } from 'react'
import { Tab } from '@headlessui/react'
import MediaList from '../components/MediaList'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const MediaScreen = () => {
  let [categories] = useState(['Media gallery', 'Add media'])
  

  return (
    <div className="w-full">
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
            <MediaList />
          </Tab.Panel>
          
          <Tab.Panel>
           
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      
    </div>
  )
}

export default MediaScreen;