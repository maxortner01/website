import Head from 'next/head'
import Link from 'next/link';
import Script from 'next/script';

export default function Posts() {
  return (
    <div className="h-screen">
      <Script src="https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.js"/>
      <Script src="https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.dom.js"/>
      <Script src="/test.js"/>
      <div className="prose prose-p:text-justify mx-auto h-screen">
      <div className="p-20">
      <h1 className="text-center">Welcome to my website.</h1>
      <div className="text-center"><i>I am a mathematician, physicist, and computer scientist.</i></div>
      <p>I&apos;m currently an undergraduate student of theoretical physics who loves to write about what he does. Usually, when I&apos;m learning new things (or new approaches to things) I will write posts on the <Link href="/posts">blog</Link> page.</p>
      <p>The bar on the bottom left is how you navigate. If there&apos;s anything here you&apos;d like to tell me about, email me at <Link href="mailto:contact@maxortner.com">contact@maxortner.com.</Link></p>
      <p>My <Link href="/resume.pdf">resume</Link> has all of my academic history as well has my talks and conferences.</p>
      </div>
      </div>
    </div>
  );
}