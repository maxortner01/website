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
          content
        },
    };
}

function Post({ frontmatter, content })
{
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const markdown_content = md().render(content);

  return (
    <div className='lg:h-screen lg:max-h-screen lg:overflow-scroll pt-[115px]'>
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
    <div className='prose prose-md prose-p:text-justify prose-img:w-96 prose-img:m-auto prose-pre:bg-gray-50 prose-pre:border prose-pre:shadow-inner prose-pre:overflow-scroll prose-pre:scrollbar-hide mx-auto'>
      <h1 className="text-center">{frontmatter.title}</h1>
      <div className='flex flex-row'>
        <div className='flex-grow'>
          <h4 className='text-gray-300'>{
              new Date(frontmatter.date).toLocaleString('default', { month: 'long', day: "numeric", year: "numeric" })
          }</h4>
        </div>
        <h4 className='text-gray-300 font-normal'>{"~" + Math.round(markdown_content.trim().split(/\s+/).length / 200.0) + " minute read"}</h4>
      </div>
      <div dangerouslySetInnerHTML={{ __html: markdown_content }} />
      <div className="pb-5 text-xs text-center text-gray-200"><i>Copyright © 2023 Max Ortner</i></div>
    </div>
    </div>
  )
}

export default function PostPage({ frontmatter, content }) {
  var heading = "";
  var last_heading = "";
  const sections = md().parse(content, {}).map((block) => {
    if (block.type == "heading_open")
      heading = block.tag;

    if (last_heading == "heading_open" && block.type == "inline")
    {
      var level = parseInt(heading.slice(1, heading.length));
      var name = block.content

      return {
        level, name
      };
    }
    last_heading = block.type;
  }).filter((s) => s != undefined);

  return (
    <div className='lg:h-screen lg:max-h-screen'>
      <div className='w-3/4 max-w-[1200px] m-auto lg:grid lg:grid-cols-4'>
        <div className='lg:col-span-1 p-4 pt-0'>
          <div className='pt-[115px] font-bold text-[135%] text-center lg:text-right text-sky-500'>Table of Contents</div>
          {
            sections.map(({ name, level }) => {
              const weight = ((level == 2)?"font-medium text-gray-700":"font-light  text-gray-400")
              const translate = "-" + ((level - 2) * 25 * 0).toFixed(0) + "px 0px"
              return <div 
                        key={name} 
                        className={weight + " text-[95%] text-center lg:text-right"}
                        style={{"translate": translate, "padding": "2px"}}
                        >
                          {name}
                      </div>
            })
          }
        </div>
        <div className='lg:col-span-3 lg:border-l-[1px]'>
          <Post frontmatter={frontmatter} content={content} />
        </div>
      </div>
    </div>
  )
}