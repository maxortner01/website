import Link from 'next/link';
import Head from 'next/head';
//<div><a href="/"><div className="transition text-right px-5 py-20 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">Max Ortner</div></a></div>
export default function Layout({ children }) {
  return (
    <div className="flex">
    <div className='w-64 h-screen overflow-hidden shadow-[inset_-3px_0px_10px_1px_rgba(0,0,0,0.1)] items-center'>
      <div className='flex flex-col h-screen'>
      <a href="/"><div className="transistion duration-75 text-right px-5 py-20 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3 hover:font-extrabold">Max Ortner</div></a>
        <div className='grow flex flex-col-reverse pb-5'>
        <a href="https://arxiv.org/search/?query=Max+Ortner&searchtype=all&source=header"><div className="transistion duration-75 p-3 text-right px-5 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">arxiv</div></a>
        <a href="https://github.com/maxortner01"><div className="transistion duration-75 p-3 text-right px-5 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">GitHub</div></a>
        <a href="/resume.pdf"><div className="transistion duration-75 p-3 text-right px-5 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">Resume</div></a>
        <a href="/posts"><div className="transistion duration-75 p-3 text-right px-5 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">Blog</div></a>
        </div>
        <div className="pb-5 text-xs text-center text-gray-200"><i>Copyright © 2023 Max Ortner</i></div>
      </div>
    </div>
    <div className='flex-1 h-screen overflow-auto'>
        {children}
    </div>
    </div>
  );
}