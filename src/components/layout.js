import Link from 'next/link';
import { NewspaperIcon, DocumentIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

function NavBarButton({ children, text, directory, className })
{
  return (
    <div className={className + " flex flex-row select-none cursor-pointer hover:text-opacity-100 hover:text-sky-500 p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.1)]"}>
      <div>{children}</div>
      <div>{text}</div> 
    </div>
  )
}

export default function Layout({ children }) {
  return (
    <div className='font-sans-serif'>
    <div className='z-20 min-w-[500px] max-w-[200px] lg:min-w-[600px] flex flex-row border-2 border-sky-400 fixed top-4 left-[50%] -translate-x-[50%] backdrop-blur-sm bg-white/40 shadow-md text-lg rounded-lg overflow-hidden scrollbar-hide'>
        <Link className='min-w-[140px] flex-grow' href="/"><NavBarButton text={"Max Ortner"} className={"font-medium text-sky-500 mr-4"} /></Link>
        <div className='overflow-x-scroll flex flex-row space-x-4 m-auto scrollbar-hide'>
          <Link href="/posts"><NavBarButton text={"Posts"}   className={"font-light text-black text-opacity-60"}><NewspaperIcon className='w-6 pr-[3px] mt-[3px]' /></NavBarButton></Link>
          <Link href="/resume"><NavBarButton text={"Resume"} className={"font-light text-black text-opacity-60"}><DocumentIcon className='w-6 pr-[3px] mt-[3px]' /></NavBarButton></Link>
          <Link href="https://github.com/maxortner01">
            <NavBarButton text={"Github"} className={"font-light text-black text-opacity-60"}><CodeBracketIcon className='w-6 pr-[3px] mt-[3px]' /></NavBarButton>
          </Link>
        </div>
    </div>
    <div>
        {children}
    </div>
    </div>
  );
}