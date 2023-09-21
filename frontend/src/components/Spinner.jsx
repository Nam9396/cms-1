import clsx from "clsx";

export const SpinnerButton = () => {
  return ( 
    <div className={clsx(
      "flex flex-row justify-center items-center",
      "py-1 px-2 w-fit rounded-md",
      "bg-indigo-500"
    )}>
      <div
        class={clsx(
          "inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent", 
          "align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]", 
          "text-zinc-100",
          "mr-2"
        )}
        role="status">
      </div>
      <span class="text-zinc-100 text-xs">Loading...</span>
    </div>
  )
};

export const SpinnerPage = () => { 
  return (
    <div className={clsx(
      'flex flex-col justify-center items-center', 
      'fixed inset-0 bg-gray-300/30 transition-opacity'
    )}>
      <div className={clsx(
        "p-8 bg-white rounded-md z-10", 
        "py-10 px-20", 
        "absolute flex flex-col justify-center items-center"
      )}>
        <div
          class={clsx(
            "inline-block h-20 w-20 animate-spin rounded-full border-8 border-solid border-current border-r-transparent", 
            "align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]", 
            "text-indigo-500",
            "mr-2"
          )}
          role="status">
        </div>
        <div className="mt-8 text-indigo-500 text-md">Loading...</div>
      </div>
    </div>
  )
}

export const SpinnerBottom = () => { 
  return (
    <div className={clsx(
      'fixed z-20 bottom-0 right-1/2 translate-x-2/4', 
    )}>
      <div className={clsx(
        "flex flex-row justify-center items-center rounded-md mb-5",
        "w-full py-2 px-4",
        "md:py-2 md:px-8 md:w-fit",
        "bg-indigo-500"
      )}>
        <div
          class={clsx(
            "inline-block h-3 w-3 md:h-5 md:w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent", 
            "align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]", 
            "text-zinc-100",
            "mr-2 md:mr-4"
          )}
          role="status">
        </div>
        <span class="text-zinc-100 text-xs sm:text-sm font-semibold ">Đang thực hiện...</span>
      </div>
    </div>
  )
}