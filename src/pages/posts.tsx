import Head from 'next/head'
import { Inter } from '@next/font/google'

import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ posts }) {
  const router = useRouter()
  var tags = router.query["tag"];


  var filteredposts = posts
  if (tags == null) tags = [];
  else
  {
    tags = tags.split(",");
    if (tags[0] == "") tags.pop()
    filteredposts = posts.filter(post => {
      return tags.every(val => post.frontmatter.tags.includes(val));
    });
  }

  if (filteredposts.length == 0)
  {
    return (<div>
      <div className="prose prose-p:text-justify mx-auto">
      <div className="p-20">
      <h1 className="text-center">No posts.</h1>
      <div className="text-center">There aren't any posts with tags: <i>{tags.join(', ')}</i>.</div>
      </div>
      </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-slate-200 divide-y py-5">
      {filteredposts.map(({ slug, frontmatter }) => (
        <div
          key={slug}
          className='transition px-10  hover:bg-gray-100'
        >
            <a href={`/posts/${slug}`}>
              <h1 className="font-bold text-xl pt-4">{frontmatter.title}</h1>
              <p className="text-gray-300 text-sm">{
                new Date(frontmatter.date).toLocaleString('default', { month: 'long', day: "numeric", year: "numeric" })
              }</p>
              <p className="py-2 pb-3">{frontmatter.metaDesc}</p>
            </a>
              <div className="flex flex-row pb-4"> 
                {frontmatter.tags.filter(tag => { return tags.includes(tag); }).map((tag, i) => (
                  <div className="mr-4 "><a href={"/posts?tag=" + tags.filter(t => t != tag).join(",")} className="p-1 bg-amber-500 rounded text-sm text-white">{tag}</a></div>
                ))}
                {frontmatter.tags.filter(tag => { return !tags.includes(tag); }).map((tag, i) => (
                  <div className="mr-4 "><a href={"/posts?tag=" + tags.concat([tag.replace(" ", "%20")]).join(',')} className="p-1 bg-slate-300 rounded text-sm text-white">{tag}</a></div>
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

    var distancea = Math.abs(new Date().valueOf() - date1.valueOf());
    var distanceb = Math.abs(new Date().valueOf() - date2.valueOf());
    return distancea - distanceb;
  });
  return {
    props: {
      posts,
    },
  };
}