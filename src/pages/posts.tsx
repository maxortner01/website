import Head from 'next/head'
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

function LoadPage()
{
  var container = document.getElementById("container");
  console.log(container);

  if (container)
  {
    var children = Array.from(container.children);
    children.forEach((child) => child.classList.replace("translate-y-6", "translate-y-0"));
    children.forEach((child) => child.classList.replace("opacity-0", "opacity-100"));
    children.forEach((child) => child.classList.remove("transition"));
  }
}

export function Tag({ name, selected_tags, className="", perc=70 }: any)
{
  const router = useRouter();
  var hover_red = "";
  if (selected_tags.includes(name))
  {
    hover_red = "hover:bg-red-50 hover:text-red-400 hover:border-red-400";
  }

  return (
    <div 
      onClick={() => {
        if (selected_tags.includes(name))
          selected_tags = selected_tags.filter((tag: string) => tag != name);
        else
          selected_tags.push(name);
        router.push({ 
          pathname: '/posts', 
          query: { ...router.query, tags: selected_tags.join(",") } }, 
          undefined, 
          {}
        );
      }}
      className={hover_red + ' p-[1%] pt-[0.25%] hover:bg-sky-100 cursor-pointer pb-[0.25%] rounded-md border border-sky-600 text-sky-600 text-[' + perc.toString() + '%] mb-1 select-none cursor-default ' + className + (selected_tags.includes(name)?" bg-sky-100":" ")}>
        {name}
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

export function Post({ title, link, date, desc, tags, selected_tags, perc=100, tagperc=70 }: any)
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
          tags.sort((tag1: string, tag2: string) => {
            if (selected_tags.includes(tag1)) return -1
            else return 1;
            
          }).map((tag: any) => {
            return <Tag key={tag} name={tag} selected_tags={selected_tags} perc={tagperc} />
          })
        }
      </div>
    </PostFrame>
  )
}

function Tags({ tags }: any)
{
  const router = useRouter();

  return (
    <div className='rounded-lg m-2 border bg-sky-50 shadow-md p-4'>
      <h1 className='font-medium text-[105%] text-gray-600'>Selected Tags</h1>
      <div className='flex flex-row flex-wrap space-x-2'>
      {
        tags.map((tag: string, index: number) => {
          return <div 
                    onClick={() => {
                      tags = tags.filter((t: string) => t != tag);
                      router.push({ 
                        pathname: '/posts', 
                        query: { ...router.query, tags: tags.join(",") } }, 
                        undefined, 
                        {}
                      );
                    }} 
                    className={(index == 0?"ml-2":"") + " mb-2 rounded-lg border-sky-500 border text-sky-500 p-[3px] pb-[2px] pt-[2px] text-[90%] bg-sky-50 hover:bg-red-100 hover:text-red-500 hover:border-red-500 cursor-pointer" }
                    key={index}>
                      {tag}
                  </div>
        })
      }
      </div>
    </div>
  )
}

export default function Posts({ posts, resume }: any) {
  const [search, setSearch] = useState("");

  posts = posts.filter(({slug}: any) => slug != ".DS_Store")

  const router = useRouter();

  const tag_string: any = (router.query.tags == undefined?"":router.query["tags"]);
  const tags: any = (tag_string == ""?[]:tag_string.split(","));

  if (tags.length > 0)
  {
    posts = posts.filter((post: any) => {
      return tags.every((val: any) => post.frontmatter.tags.includes(val));
    });
  }

  if (search.length > 0)
  {
    posts = posts.filter((post: any) => {
      return post.frontmatter.title.toLowerCase().includes(search);
    });
  }

  useEffect(() => {
    //LoadPage();
  }, []);

  var now: any = new Date();
  var start: any = new Date(now.getFullYear(), 0, 0);
  var diff: any = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  var quote = resume.quotes[day % (resume.quotes.length)];

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
                When I&apos;m excited about a new concept, or come up with something I like, I will share it here.
              </p>
              <p>
                Read something you want to ask me about? <a className='underline text-sky-500 font-medium' href="mailto:contact@maxortner.com">Contact me!</a>
              </p>
            </div>
            <div className='rounded-lg border shadow-md bg-sky-50 m-2 p-4'>
              <h1 className='text-[105%] text-gray-600 font-medium text-center'>Quote of the Day</h1>
              <p className='text-[90%] text-gray-500'>
                &quot;{quote.quote}&quot;
              </p>
              <div className='text-[80%] text-gray-500 font-light text-right'>
                {
                  quote.lines.map((line: string, index: number) => {
                    return <p key={index}>{line}</p>
                  })
                }
              </div>
            </div>
            {
              tags.length > 0 ?
              <Tags tags={tags} /> :
              <></>
            }
          </div>
          <div className='lg:col-span-2'>
            <div className='lg:flex lg:flex-row'>
              <h1 className='lg:flex-grow font-bold text-3xl text-sky-500 lg:mt-0 mt-6'>Posts</h1>
              <div className='flex flex-row space-x-2 group-focus:border-b-2'>
                <span className="scale-70 material-symbols-outlined text-gray-400">search</span>
                <div className='lg:-translate-y-[1px]'><input placeholder='Search' className='outline-none text-[105%] focus:border-b-2 text-gray-500 pb-[1px]' value={search} onChange={(e: any) => setSearch(e.target.value)}/></div>
              </div>
            </div>
            <hr />
            <div id="container">
            {
              posts.length>0?(posts.map(({ slug, frontmatter }: any, index: number) => {
                const animation_classname = "transition translate-y-6 opacity-0"
                return (
                  <div key={slug} className={" duration-1000 delay-[" + (100 + index * 300).toFixed(0) + "ms]"}>
                    <Post selected_tags={tags} title={frontmatter.title} link={"/posts/" + slug} date={frontmatter.date} desc={frontmatter.metaDesc} tags={frontmatter.tags} perc={150} tagperc={80} />
                  </div>);
              })):<p className='text-xl text-gray-600 text-center p-8'>There aren&apos;t any posts... <Link className='text-sky-400 font-medium' href="/posts">Clear the filter?</Link></p>
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