import clsx from "clsx";
import { PhotoIcon } from '@heroicons/react/24/solid'
import useSWRMutation from "swr/mutation";
import PostLayout from "./PostLayout";
import { SpinnerPage } from './Spinner.jsx'
import { toast } from "react-toastify";
import { uploadPostMutation } from "../swr/fetchFrame";

const UploadDocx = ({ mdx, setMdx, html }) => {

  const { trigger: uploadDoc, isMutating } = useSWRMutation(`http://localhost:5000/api/post/upload`, uploadPostMutation);
  
  const uploadFileHandler = async (e) => { 
    const formData = new FormData();
    formData.append('docx', e.target.files[0]);
    try { 
      const res = await uploadDoc(formData);
      const regex1 = /(https:\/\/bibohealth.com)\/(phat-trien|cham-soc-tre|dinh-duong-2|dinh-duong)\/(be-khoe|be-benh|so-cap-cuu|an-dam|dinh-duong-hang-ngay|thuc-pham-bo-sung|so-sinh-nhu-nhi|day-thi|di-hoc|rang-sua)\/([\w-]+)\/(\d{2})\/(\d{4})\/(?=\))/gi;
      const regex2 = /(!\[.*?\])\((.+)\)/
      const replaceURL = res.replace(regex1, "https://bacsichobeyeu.com/posts/$4");
      const replaceImgTag = replaceURL.replace(regex2, '$1()');
      
      setMdx(replaceImgTag);
      toast.success('File uploaded');
    } catch (err) { 
      toast.error(err?.info || err.error)
    }
  }


  return (
    <div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 p-4">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-teal-500"
                    >
                      <span>Upload a .docx file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" 
                        onChange={(e) => uploadFileHandler(e)}
                      />
                    </label>
              
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-full">
          <label htmlFor="html" className="block text-sm font-medium leading-6 text-gray-900">
            MDX content
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
            value={mdx || ''}
            onChange={(e) => setMdx(e.target.value)}
          />
        </div>

        <div className="col-span-full">
          <p className="block text-sm font-medium leading-6 text-gray-900">Preview content</p>
          <div
          className={clsx(
            'mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
            'py-1.5',
            'bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
          )}>
          <PostLayout>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </PostLayout>
          </div>
        </div>
        
      </div>

      {isMutating && <SpinnerPage />}
      
    </div>
  )
}

export default UploadDocx;