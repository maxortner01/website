import Head from 'next/head'
import { Inter } from '@next/font/google'

import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ posts }: any) {
  const router = useRouter()
  var tags: String[] = [];
  if (router.query["tag"] != undefined)
    tags = (router.query["tag"] as string).split(",");

  var final_posts = [];
  for (var post in posts)
  {
    if (posts[post].slug.includes(".")) continue;
    final_posts.push(posts[post]);
  }

  var filteredposts = final_posts;
  
  if (filteredposts.length > 0)
  {
    if (tags == null || tags == undefined) tags = [];
    else 
    {
      if (tags[0] == "") tags.pop()
      filteredposts = filteredposts.filter((post: any) => {
        return tags.every(val => post.frontmatter.tags.includes(val));
      });
    }
  }
  else
  {
    return (<div>
      <div className="prose prose-p:text-justify mx-auto">
      <div className="p-20">
      <h1 className="text-center">No posts.</h1>
      <div className="text-center">There aren&apos;t any posts with tags: <i>{tags.join(', ')}</i>.</div>
      </div>
      </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-slate-200 divide-y">
      {filteredposts.map(({ slug, frontmatter }: any) => (
        <div
          key={slug}
          className='transition px-10  hover:bg-gray-100'
        >
            <Link href={`/posts/${slug}`}>
              <h1 className="font-bold text-xl pt-4">{frontmatter.title}</h1>
              <p className="text-gray-300 text-sm">{
                new Date(frontmatter.date).toLocaleString('default', { month: 'long', day: "numeric", year: "numeric" })
              }</p>
              <p className="py-2 pb-3">{frontmatter.metaDesc}</p>
            </Link>
              <div className="flex flex-row pb-4"> 
                {frontmatter.tags.filter((tag: any) => { return tags.includes(tag); }).map((tag: any) => (
                  <div className="mr-4 " key={tag}><Link href={"/posts?tag=" + tags.filter(t => t != tag).join(",")} className="p-1 bg-amber-500 rounded text-sm text-white">{tag}</Link></div>
                ))}
                {frontmatter.tags.filter((tag: any) => { return !tags.includes(tag); }).map((tag: any) => (
                  <div className="mr-4 " key={tag}><Link href={"/posts?tag=" + tags.concat([tag.replace(" ", "%20")]).join(',')} className="p-1 bg-slate-300 rounded text-sm text-white">{tag}</Link></div>
                ))}
              </div>
        </div>
      ))}
    </div>
  );
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