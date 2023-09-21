import clsx from 'clsx'

const PostLayout = ({ children }) => {

  return (
    <>      
      <div className={clsx(
        'mt-10 mx-auto',
        'prose prose-base', 
        'prose-a:text-teal-400 prose-a:hover:text-bold_blue',
        'prose-headings:text-gray-800 prose-h3:text-base',
        'prose-blockquote:bg-purple-50 prose-blockquote:p-4 prose-blockquote:rounded-md', 
        'prose-img:rounded-2xl prose-img:mt-10 prose-img:mb-0 prose-img:mx-auto',
        'max-w-[80%]'
      )}>{children}</div>
    </>
  )
}

export default PostLayout;