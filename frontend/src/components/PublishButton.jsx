import { clsx } from 'clsx'
import React from 'react'

const PublishButton = ({ modePublish, setModePublish }) => {
  return (
    <div className={clsx(
      'flex flex-col z-50',
      'sm:flex-row sm:justify-around sm:items-center',
      'sm:sticky sm:bottom-0 sm:right-0 sm:w-full',
      'rounded-md px-4 py-2 bg-gray-200 border-2 border-gray-200'
    )}>
      <fieldset>
        <div className={clsx(
          "mt-6 space-y-6",
          'flex flex-col',
          'sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:gap-x-8 sm:mt-0'
        )}>
          <div className="flex items-center gap-x-3">
            <input
              id="draft"
              name="modePublish"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              value="draft"
              checked={modePublish === 'draft'}
              onChange={(e) => setModePublish(e.target.value)}
            />
            <label htmlFor="draft" className="block text-sm font-medium leading-6 text-gray-900">
              Save as draft
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              id="live"
              name="modePublish"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              value="live"
              checked={modePublish === 'live'}
              onChange={(e) => setModePublish(e.target.value)}
            />
            <label htmlFor="live" className="block text-sm font-medium leading-6 text-gray-900">
              Publish
            </label>
          </div>
        </div>
      </fieldset>

      <button
        type="submit"
        className="mt-8 sm:mt-0 rounded-md bg-indigo-600 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >Save</button>
    </div>
  )
}

export default PublishButton