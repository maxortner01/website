import Head from 'next/head'
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';

export default function Posts() {
  return (
    <div className="h-screen">
      <title>Max Ortner</title>
      <div className="prose prose-sm lg:prose-md prose-p:text-justify mx-auto h-screen">
      <div className="p-20">
      <h1 className="text-center">Welcome to my website.</h1>
      <div className="text-center"><i>I am a mathematician, physicist, and computer scientist.</i></div>
      <p>I&apos;m currently an undergraduate student of theoretical physics who loves to write about what he does. Usually, when I&apos;m learning new things (or new approaches to things) I will write posts on the <Link href="/posts">blog</Link> page.</p>
      <p>The bar on the bottom left is how you navigate. If there&apos;s anything here you&apos;d like to tell me about, email me at <Link href="mailto:contact@maxortner.com">contact@maxortner.com.</Link></p>
      <p>My <Link href="/resume.pdf">resume</Link> has all of my academic history as well as my talks and conferences.</p>
      <div><i>GitHub Contributions</i><a href="https://github.com/maxortner01"><img src="https://ghchart.rshah.org/maxortner01" alt="maxortner01's Github chart"/></a></div>
      </div>
      </div>
    </div>
  );
}