import Head from 'next/head'
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import { useRouter } from 'next/router'

export function Tag({ children, className="", perc=70 }: any)
{
  return (
    <div className={'p-[1%] pt-[0.25%] pb-[0.25%] rounded-md border border-sky-600 text-sky-600 text-[' + perc.toString() + '%] mb-1 select-none cursor-default ' + className}>
      {children}
    </div>
  )
}

export function PostFrame({ children, link, className = "" }: any)
{
  return (
    <a href={link} key={link}>
    <div className={'select-none cursor-pointer hover:bg-slate-100 p-2 ' + className}>
    {children}
    </div>
    </a>
  )
}

export function Post({ title, link, date, desc, tags, perc=100, tagperc=70 }: any)
{
  return (
    <PostFrame link={link}>
      <div className={'flex flex-row text-[' + perc.toString() + '%]'}>
        <h1 className='flex-grow font-medium text-gray-600'>{title}</h1>
        <h2 className='font-light text-sky-400'>{date}</h2>
      </div>
      <p className={'text-gray-400 text-[' + (perc - 15).toString() + '%] mb-1'}>{desc}</p>
      <div className='flex flex-row flex-wrap space-x-1'>
        {
          tags.map((tag: any) => {
            return <Tag key={tag} perc={tagperc}>{tag}</Tag>
          })
        }
      </div>
    </PostFrame>
  )
}

export default function Posts({ posts }: any) {
  posts = posts.filter(({slug}: any) => slug != ".DS_Store")

  return (
    <>
    <title>Max Ortner - Posts</title>
    <div className='mt-20 pt-10'>
    <div className='max-w-[900px] w-2/3 m-auto'>
    <h1 className='font-bold text-3xl text-center text-sky-500'>Posts</h1>
    <hr />
    {
      posts.map(({ slug, frontmatter }: any) => {
        return <Post key={slug} title={frontmatter.title} link={"/posts/" + slug} date={frontmatter.date} desc={frontmatter.metaDesc} tags={frontmatter.tags} perc={150} tagperc={80} />
      })
    }
    </div>
    </div>
    </>
  )
}

export async function getStaticProps() {
  // Get all our posts
  const files = fs.readdirSync('./src/posts');

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`./src/posts/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);
    
    return {
      slug,
      frontmatter,
    };
  });

  posts.sort(function(a, b) {
    var date1 = new Date(a.frontmatter.date);
    var date2 = new Date(b.frontmatter.date);

    var distanceLink = Math.abs(new Date().valueOf() - date1.valueOf());
    var distanceb = Math.abs(new Date().valueOf() - date2.valueOf());
    return distanceLink - distanceb;
  });
  return {
    props: {
      posts,
    },
  };
}