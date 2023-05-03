import Head from 'next/head'
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect } from 'react';

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
  var date_string: string = new Date(date).toLocaleDateString(undefined, { month:"long", day: "numeric", year: "numeric" }); 

  return (
    <PostFrame link={link}>
      <div className={'lg:flex lg:flex-row text-[' + perc.toString() + '%]'}>
        <h1 className='lg:flex-grow font-medium text-gray-600'>{title}</h1>
        <h2 className='font-light text-sky-400'>{date_string}</h2>
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

export default function Posts({ posts, resume }: any) {
  posts = posts.filter(({slug}: any) => slug != ".DS_Store")

  useEffect(() => {
    var container = document.getElementById("container");
    console.log(container);

    if (container)
    {
      var children = Array.from(container.children);
      children.forEach((child) => child.classList.replace("translate-y-6", "translate-y-0"));
      children.forEach((child) => child.classList.replace("opacity-0", "opacity-100"));
    }
  }, []);

  var now: any = new Date();
  var start: any = new Date(now.getFullYear(), 0, 0);
  var diff: any = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  var quote = resume.quotes[day % (resume.quotes.length)];
  console.log(quote);

  return (
    <div>
      <title>Max Ortner - Posts</title>
      <div className='mt-20 pt-10'>
        <div className='lg:grid lg:grid-cols-3 max-w-[1000px] w-2/3 m-auto gap-2'>
          <div className='flex flex-col space-y-4'>
            <div className='rounded-lg border shadow-md bg-sky-50 max-h-[300px] m-2 p-4 text-[85%] text-gray-600 flex flex-col space-y-4'>
              <p>
                <span className='font-medium'>I usually spend my time learning</span> new concepts in math or physics, or playing around with some of my development projects.
              </p>
              <p>
                When I'm excited about a new concept, or come up with something I like, I will share it here.
              </p>
              <p>
                Read something you want to ask me about? <a className='underline text-sky-500 font-medium' href="mailto:contact@maxortner.com">Contact me!</a>
              </p>
            </div>
            <div className='rounded-lg border shadow-md bg-sky-50 m-2 p-4'>
              <h1 className='text-[105%] text-gray-600 font-medium text-center'>Quote of the Day</h1>
              <p className='text-[90%] text-gray-500'>
                "{quote.quote}"
              </p>
              <div className='text-[80%] text-gray-500 font-light text-right'>
                {
                  quote.lines.map((line: string, index: number) => {
                    return <p key={index}>{line}</p>
                  })
                }
              </div>
            </div>
          </div>
          <div className='lg:col-span-2'>
            <h1 className='font-bold text-3xl text-center text-sky-500 lg:mt-0 mt-6'>Posts</h1>
            <hr />
            <div id="container">
            {
              posts.map(({ slug, frontmatter }: any, index: number) => {
                return (
                  <div key={slug} className={"transition duration-1000 delay-[" + (100 + index * 300).toFixed(0) + "ms] translate-y-6 opacity-0"}>
                    <Post title={frontmatter.title} link={"/posts/" + slug} date={frontmatter.date} desc={frontmatter.metaDesc} tags={frontmatter.tags} perc={150} tagperc={80} />
                  </div>);
              })
            }
            </div>
          </div>
        </div>
      </div>
    </div>
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

  const resume = JSON.parse(fs.readFileSync("./src/resume.json").toString());

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
      resume
    },
  };
}