import Head from 'next/head'
import Link from 'next/link';

export default function Posts() {
  return (
    <div>
      <div className="prose prose-p:text-justify mx-auto">
      <div className="p-20">
      <h1 className="text-center">Welcome to my website.</h1>
      <div className="text-center"><i>I am a mathematician, physicist, and computer scientist.</i></div>
      <p>I'm currently an undergraduate student of theoretical physics who loves to write about what he does. Usually, when I'm learning new things (or new approaches to things) I will write posts on the <a href="/posts">blog</a> page.</p>
      <p>The bar on the bottom left is how you navigate. If there's anything here you'd like to tell me about, email me at <a href="mailto:contact@maxortner.com">contact@maxortner.com.</a></p>
      <p>My <Link href="/resume.pdf">resume</Link> has all of my academic history as well has my talks and conferences.</p>
      </div>
      </div>
    </div>
  );
}