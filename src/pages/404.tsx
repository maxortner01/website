import Link from 'next/link';

export default function Custom404() {
    return (<div>
      <div className="prose prose-p:text-justify mx-auto">
      <div className="p-20">
      <h1 className="text-center">404 - Page Not Found</h1>
      <div className="text-center">There&apos;s no page here. Go <Link href="/">home</Link>?</div>
      </div>
      </div>
      </div>
    )
  }