import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';
import Head from 'next/head';
import Script from 'next/script'
import Layout from '@/components/layout'
import { useEffect } from 'react';
import hljs from 'highlight.js';

export async function getStaticPaths() {
    // Retrieve all our slugs
    const files = fs.readdirSync('./src/posts');

    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace('.md', ''),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const fileName = fs.readFileSync(`./src/posts/${slug}.md`, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);
    
    return {
        props: {
        frontmatter,
        content,
        },
    };
}

function Post({ frontmatter, content })
{
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className='prose prose-md prose-p:text-justify prose-img:w-96 prose-img:m-auto prose-pre:bg-gray-50 prose-pre:border prose-pre:shadow-inner prose-pre:overflow-scroll mx-auto'>
    <Script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js" />
      <Script id="configure" dangerouslySetInnerHTML={{
      __html: `MathJax = {
          tex: {
            inlineMath: [['$', '$']]
          },
          svg: {
            fontCache: 'global'
          }
        };`,
    }}></Script>
      <Script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></Script>
      <title>{frontmatter.title}</title>
      <h1 className="text-center">{frontmatter.title}</h1>
      <h4 className='text-gray-300'>{
          new Date(frontmatter.date).toLocaleString('default', { month: 'long', day: "numeric", year: "numeric" })
      }</h4>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  )
}

export default function PostPage({ frontmatter, content }) {
  return (
    <div className='flex flex-row w-2/3 m-auto mt-20 pt-10 divide-x-2'>
      <div className='w-full'><Post frontmatter={frontmatter} content={content} /></div>
    </div>
  )
}