import Link from 'next/link';

export default function Custom404() {
    return (
      <div className="prose prose-p:text-justify mx-auto">
      <div className="py-40">
      <h1 className="text-center text-sky-500">404 - Page Not Found</h1>
      <div className="text-center">There&apos;s no page here. Go <Link className='text-sky-500' href="/">home</Link>?</div>
      </div>
      </div>
    )
  }