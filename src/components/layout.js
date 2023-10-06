import Link from 'next/link';
import Script from 'next/script';

function NavBarButton({ children, text, directory, className })
{
    return (
        <div className={className + " flex flex-row select-none cursor-pointer hover:text-opacity-100 hover:text-sky-500 p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.1)]"}>
            <div>{text}</div> 
            <div>{children}</div>
        </div>
    )
}

export default function Layout({ children }) {
  return (
    <div className='font-sans-serif'>
    <div className='z-20 min-w-[365px] max-w-[200px] lg:min-w-[600px] flex flex-row border-2 border-sky-400 fixed top-4 left-[50%] -translate-x-[50%] backdrop-blur-sm bg-white/40 shadow-md text-lg rounded-lg overflow-hidden scrollbar-hide'>
        <Link className='min-w-[140px] flex-grow' href="/"><NavBarButton text={"Max Ortner"} className={"font-medium text-sky-500 mr-4"} /></Link>
        <div className='overflow-x-scroll flex flex-row space-x-4 m-auto scrollbar-hide'>
          <Link href="/posts"><NavBarButton text={"Posts"}   className={"font-light text-black text-opacity-60"} /></Link>
          <Link href="/resume"><NavBarButton text={"Resume"} className={"font-light text-black text-opacity-60"} /></Link>
          <Link href="https://github.com/maxortner01">
            <NavBarButton text={"Github"} className={"font-light text-black text-opacity-60"}>
              <span className="scale-75 translate-y-[2px] material-symbols-outlined">
                open_in_new
              </span>
            </NavBarButton>
          </Link>
        </div>
    </div>
    <div>
        {children}
    </div>
    </div>
  );

  /*
  return (
    <div className="lg:flex">
      <Script src="/mobile.js" />
    <div className='w-screen lg:w-64 lg:h-screen lg:overflow-hidden shadow-[inset_-3px_0px_10px_1px_rgba(0,0,0,0.1)] items-center'>
      <div id="collapse" className='flex flex-col lg:h-screen'>
      <Link href="/"><div className="transistion duration-75 text-center lg:text-right px-5 py-7 lg:py-20 hover:bg-gradient-to-r lg:from-transparent lg:to-slate-200  hover:text-slate-700 hover:border-r-8 lg:border-slate-400 hover:px-3 hover:font-extrabold">Max Ortner</div></Link>
        <div className='grow flex flex-col-reverse pb-5'>
        <Link href="https://arxiv.org/search/?query=Max+Ortner&searchtype=all&source=header"><div className="transistion duration-75 p-3 text-right px-5 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">arxiv</div></Link>
        <Link href="https://github.com/maxortner01"><div className="transistion duration-75 p-3 text-right px-5 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">GitHub</div></Link>
        <Link href="/resume"><div className="transistion duration-75 p-3 text-right px-5 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">Resume</div></Link>
        <Link href="/posts"><div className="transistion duration-75 p-3 text-right px-5 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">Blog</div></Link>
        </div>
        <div className="pb-5 text-xs text-center text-gray-200"><i>Copyright © 2023 Max Ortner</i></div>
      </div>
    </div>
    <div id="place" className='lg:flex-1 h-screen lg:overflow-auto'>
        {children}
    </div>
    </div>
  );*/
}