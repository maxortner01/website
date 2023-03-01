import Link from 'next/link';
import Head from 'next/head';
//<div><Link href="/"><div className="transition text-right px-5 py-20 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">Max Ortner</div></Link></div>
export default function Layout({ children }) {
  return (
    <div className="flex">
    <div className='w-64 h-screen overflow-hidden shadow-[inset_-3px_0px_10px_1px_rgba(0,0,0,0.1)] items-center'>
      <div className='flex flex-col h-screen'>
      <Link href="/"><div className="transistion duration-75 text-right px-5 py-20 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3 hover:font-extrabold">Max Ortner</div></Link>
        <div className='grow flex flex-col-reverse pb-5'>
        <Link href="https://arxiv.org/search/?query=Max+Ortner&searchtype=all&source=header"><div className="transistion duration-75 p-3 text-right px-5 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">arxiv</div></Link>
        <Link href="https://github.com/maxortner01"><div className="transistion duration-75 p-3 text-right px-5 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">GitHub</div></Link>
        <Link href="/resume.pdf"><div className="transistion duration-75 p-3 text-right px-5 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">Resume</div></Link>
        <Link href="/posts"><div className="transistion duration-75 p-3 text-right px-5 hover:bg-gradient-to-r from-transparent to-slate-200  hover:text-slate-700 hover:border-r-8 border-slate-400 hover:px-3">Blog</div></Link>
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