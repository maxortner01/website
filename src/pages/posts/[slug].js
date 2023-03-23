import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';
import Head from 'next/head';
import Script from 'next/script'

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

export default function PostPage({ frontmatter, content }) {
    return (
      <div className='prose prose-sm prose-p:text-justify prose-img:w-96 prose-img:m-auto w-3/4 mx-auto mt-10 mb-20'>
      <link rel="stylesheet" href="/equations.css"></link>

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
        <Script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></Script>
        <Script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></Script>
        <title>{frontmatter.title}</title>
        <h1 className="text-center">{frontmatter.title}</h1>
        <h4 className='text-gray-300'>{
            new Date(frontmatter.date).toLocaleString('default', { month: 'long', day: "numeric", year: "numeric" })
        }</h4>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </div>
    );
  }