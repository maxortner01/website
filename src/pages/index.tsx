import Image from 'next/image';

import Head from 'next/head';
import Chart, { ChartDataSets } from "chart.js";
import md from 'markdown-it';
import Link from 'next/link';

import fs from 'fs';
import matter, { language } from 'gray-matter';
import { Post, PostFrame } from './posts';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import hljs from 'highlight.js';

function GitHubStatusBad()
{
  return (
    <p className='text-gray-500 text-[80%] text-center'><i>My cool graphics aren&apos;t showing because GitHub is complaining about too many requests right now... For now, just <Link className='underline' href="https://www.github.com/maxortner01">check out my GitHub page.</Link></i></p>
  )
}

function Project({ title, link, date, desc, perc=100 }: any)
{
  return (
    <Link href={link}>
    <div className={'select-none cursor-pointer p-2 hover:bg-sky-100 text-[' + perc.toString() + '%]'}>
      <div className='flex flex-row'>
        <h1 className='flex-grow font-bold text-sky-500'>{title}</h1>
        <h2 className='text-gray-500 font-light'>{date}</h2>
      </div>
      <p className={'text-gray-500 text-[' + (perc - 15).toString() + '%]'}>{desc}</p>
    </div>
    </Link>
  )
}

function Repo({ repo }: any)
{
  return (
    <Link href={repo.html_url}>
    <div className='p-2 hover:bg-sky-100'>
      <div className='text-[90%] text-gray-600 font-medium'>{repo.name}</div>
      <div className='text-[85%] text-gray-400'>{repo.description}</div>
    </div>
    </Link>
  )
}

function Repos({ repos }: any)
{
  return (
    <>
    <h1>Pinned Repos</h1>
    <div className='flex flex-col divide-y-[1px] border-t-[1px]'>
    {
      repos.map((r: any) => <Repo key={r.name} repo={r} />)
    }
    </div>
    </>
  )
}

/*
function GitHub({ repos }: any)
{
  const [code, setCode] = useState(0);
  const [github, setGitHub]: any = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>
  {
    const fetchData = async () => {
      const final_data: any = {};
      const data = await fetch("https://api.github.com/users/maxortner01");

      setCode(data.status);
      const user_repos = await fetch("https://api.github.com/users/maxortner01/repos");

      const repos_json = await user_repos.json();
      const repos_list = repos_json.filter((repo: any) => repos.includes(repo.name)).sort((i: any, j: any) => repos.indexOf(i.name) > repos.indexOf(j.name));

      final_data["user"] = await data.json();
      final_data["repos"] = repos_list

      setGitHub(final_data);
      setLoading(false);
    }

    fetchData().catch(console.error);
  }, [repos])

  return (
    <>
    {
      loading && !code?<>Loading</>:
      code == 200?(
      <div className='rounded-2xl p-4 border shadow-md bg-sky-50'>
        <h1 className='font-bold text-2xl'>Github Profile</h1>
        <hr className='mb-2' />
        <Link href={github.user.html_url}>
        <div className='flex flex-row space-x-4 hover:bg-sky-100 p-2 rounded-lg'>
          <div className='flex-grow'>
            <div className='text-[110%]'>
              <span className='text-sky-500 font-medium pr-2 text-[90%]'>{github.user.name}</span>
              <span className='text-gray-400 font-light text-[85%]'>{github.user.login}</span>
            </div>
            <p className='text-[85%] text-gray-500'>
              {github.user.bio}
            </p>
          </div>
          <div className='rounded-full overflow-hidden border-2 border-sky-400 shadow-md h-full'>
            <Image src={github.user.avatar_url} width={95} height={95} alt='' />
          </div>
        </div>
        </Link>
        <Repos repos={github.repos} />
      </div>):<div className='m-auto rounded-lg border p-2 shadow-md'><GitHubStatusBad/></div>
    }
    </>
  )
}

function PieChart({ data }: any)
{
  useEffect(() => 
  {
    const myChart = new Chart("myChart", {
      type: "doughnut",
      data: {
        labels: Object.keys(data).sort((i, j) => {
          if (data[i] < data[j]) return 1;
          else return -1;
        }),
        datasets: [{
          data: (Object.values(data) as number[]).sort((i, j) => {
            if (i < j) return 1;
            else return -1;
          }),
          backgroundColor: [
            'rgb(11, 36, 71)',
            'rgb(25, 55, 109)',
            'rgb(87, 108, 188)',
            'rgb(95, 170, 200)',
            'rgb(140, 190, 212)',
            'rgb(165, 215, 232)'
          ]
        }]
      },
      options: {
        legend: {
           display: false
        }
      }
    });
  }, [data]);

  return (<div>
    <canvas height={"200px"} id="myChart"></canvas>
    </div>
  );
}

function LanguageBreakdown()
{
  const [code, setCode] = useState(0);
  const [langs, setLangs]: any = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() =>
  {
    const fetchData = async () => {
      const user_repos = await fetch("https://api.github.com/users/maxortner01/repos");
      setCode(user_repos.status);
      const repos_json = await user_repos.json();

      const exclude = ["HTML", "TeX", "CSS", "Makefile", "Shell", "TypeScript", "JavaScript"]
      const languages: any = {}
      const language_urls = repos_json.map((i: any) => i.languages_url);
      for (var i = 0; i < language_urls.length; i++)
      {
        const lang = await fetch(language_urls[i]);
        const lang_res = await lang.json();

        for (const [key, value] of Object.entries(lang_res))
        {
          if (exclude.includes(key)) continue;

          if (Object.keys(languages).includes(key))
            languages[key] += value;
          else
            languages[key] = value;
        }
      }

      setLangs(languages);
      setLoading(false);
    }

    fetchData().catch(console.error);
  }, [])

  return (
  <div className='w-3/4 m-auto p-4 max-w-[1200px] overflow-x-scroll'>
  {
    loading&&!code?<>Loading</>:
    code == 200?(
    <div className='flex flex-row'>
      <div><PieChart data={langs} /></div>
      <div className='ml-20'>
        <h1 className='font-bold text-2xl'>Code Breakdown</h1>
        <table>
          <tbody>
          {
            Object.keys(langs).sort((i: string, j: string) => {
              if (langs[i] < langs[j]) return 1;
              else return -1;
            }).map((lang: string) => {
              const ratio = Math.sqrt(langs[lang] / langs["C++"])
              var width = (ratio * 500.0).toFixed(0).toString();
              //width = width.substring(0, width.length - 1);
              //const classname = 'w-[' + width + '0px] bg-sky-600 inline-block';

              return (<tr key={lang}>
                <td className='text-right text-[80%] font-mono pr-2'>{lang}</td>
                <td>
                  <div style={{width: width + 'px'}} className="bg-gradient-to-r from-sky-500 to-sky-300 rounded-sm inline-block">&nbsp;</div>
                </td>
              </tr>);
            })
          }
          </tbody>
        </table>
      </div>
    </div>):<GitHubStatusBad/>
  }
  </div>
  );
}*/

//user info: https://api.github.com/users/maxortner01
// language info at repo.languages_url
//list of repos: https://api.github.com/users/maxortner01/repos
//language breakdown of repo: https://api.github.com/repos/maxortner01/cpp2d/languages

/*
function Showy({ code }) {
  return (
  <div className='lg:grid lg:grid-cols-5'>
    <div className='lg:col-span-2 p-4 flex flex-col'>
      <div className='flex-grow'/>
      <Image alt='' src="/page.png" width={450} height={450} className='m-auto' />
      <div className='flex-grow'/>
    </div>
    <div className='lg:col-span-2 p-4 flex flex-col'>
      <div className='flex-grow'/>
      <div className='rounded-lg shadow-inner bg-gray-50 p-2 text-[70%] overflow-scroll scrollbar-hide'>
        <div dangerouslySetInnerHTML={{ __html: md().render(code[0].test1) }} />
      </div>
      <div className='flex-grow'/>
    </div>
    <div id="info-block" className='p-4 flex flex-col space-y-4'>
      <div className='transition duration-1000 delay-[150ms] translate-x-10 opacity-0'>
        <h1 className='font-medium text-gray-600'>The Goal</h1>
        <p className='text-[80%] text-gray-500'>For this project, I am shooting for two layers: A library containing pure graphics functionality and a separate library for engine overhead.</p>
      </div>
      <div className='transition duration-1000 delay-[300ms] translate-x-10 opacity-0'>
        <h1 className='font-medium text-gray-600'>ECS</h1>
        <p className='text-[80%] text-gray-500'>Using <Link className='underline font-light' href="https://github.com/skypjack/entt">ENTT</Link>, a memory efficient and fast entity-component system is integrated directly into the engine. As is shown in this example, the user can create their own system and push it into the scene. Then the application takes care of sorting the systems and calling their update functions.</p>
      </div>
      <div className='transition duration-1000 delay-[450ms] translate-x-10 opacity-0'>
        <h1 className='font-medium text-gray-600'>Next Steps</h1>
        <p className='text-[80%] text-gray-500'>In order to take control of any kind of engine-side memory handling, I plan to write the windowing all in the library. On top of this, to prioritize performance and control, the graphics API will be implemented with Vulkan.</p>
      </div>
    </div>
  </div>)
}*/

function NewShowy({ code }: any)
{
  return (
    <div className='xl:grid xl:grid-cols-6'>
      <div className='relative col-span-4 align-middle text-center'>
        <Image alt='' src="/GDI.png" className='m-auto' width={1000} height={800} />
      </div>
      <div className='col-span-2'>
        <div id="info-block" className='p-4 flex flex-col space-y-4'>
          <div className='transition duration-1000 delay-[150ms] translate-x-10 opacity-0'>
            <h1 className='font-medium text-gray-600'>Custom Memory Allocation</h1>
            <p className='text-[90%] text-gray-500'>In order to ensure maximum performance, the standard memory allocators are written in the framework. There is a layer of abstraction, shown in the image, where the allocation method can either be in RAM or on the GPU. This way, standard allocation techniques can easily be extended for use in graphics memory.</p>
          </div>
          <div className='transition duration-1000 delay-[300ms] translate-x-10 opacity-0'>
            <h1 className='font-medium text-gray-600'>Multithreading</h1>
            <p className='text-[90%] text-gray-500'>The framework is set up so that every frame can be processed concurrently. This is done by giving each frame ownership to its own command pool. This way, individual command buffer states are not tracked, and their concurrent recording can transpire.</p>
          </div>
          <div className='transition duration-1000 delay-[450ms] translate-x-10 opacity-0'>
            <h1 className='font-medium text-gray-600'>Next Steps</h1>
            <p className='text-[90%] text-gray-500'>The entire project is being created with the intention to maximize the processing power of the GPU. There will be as few bindings and as little allocations as can possibly happen. This way, performance is ensured.</p>
          </div>
        </div>
      </div>
      <div className='col-span-3 p-2'>
        <span className='font-medium text-[110%]'>Example Program</span>
        <div className='rounded-lg shadow-inner bg-gray-50 p-2 text-[80%] max-h-[500px] overflow-scroll' dangerouslySetInnerHTML={{ __html: md().render(code[0].test1) }} />
      </div>
      <div className='col-span-3'>
        <div className='p-4 pt-0 flex flex-col h-full'>
          <div className='flex-grow' />
          <Image alt='' src="/page.png" width={600} height={600} className='m-auto' />
          <div className='w-3/4 m-auto text-center text-gray-400 text-[85%]'><i>An example of the OpenGL implementation avaliable on the github page.</i></div>
          <div className='flex-grow' />
        </div>
      </div>
    </div>
  )
}

export default function Index({ posts, resume, code }: any) {
  posts = posts.filter((i: any) => i.slug != ".DS_Store");

  useEffect(() => {
    hljs.highlightAll();

    document.getElementById("centerobj")?.classList.replace("translate-y-20", "translate-y-0");
    document.getElementById("centerobj")?.classList.replace("opacity-0", "opacity-100");
    
    var children = [];
    
    var cards = document.getElementById("cards");

    if (cards)
    {
      children = Array.from(cards.children);
      children.forEach((child) => child.classList.replace("translate-y-6", "translate-y-0"));
      children.forEach((child) => child.classList.replace("opacity-0", "opacity-100"));
    }

    var info = document.getElementById("info-block")

    if (info){
      children = Array.from(info.children);
      children.forEach((child) => child.classList.remove("translate-x-10", "opacity-0"));
    }
  }, [])

  //Currently I am <span className='font-medium text-gray-600'><i>{resume.status}</i></span>.
  
  return (
    <div>
      <Head>
        <title>Max Ortner</title>
      </Head>
      <Script id="chart-script"
      src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js">
      </Script>
      <Script id="highlight-script" src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></Script>
      
      <div className='bg-slate-200 pt-40 pb-40 bg-cover bg-[url("/background.png")]'>
      <div className='w-2/3 m-auto'>
      <div id="centerobj" className='max-w-[700px] min-w-[300px] transition-all duration-[2000ms] flex flex-col lg:flex-row w-3/4 m-auto rounded-3xl border-2 border-sky-500 p-6 bg-white/40 backdrop-blur-lg shadow-lg select-none cursor-default translate-y-20 opacity-0'>
        <div className='flex-grow pt-4'>
          <h1 className='font-bold text-center lg:text-left text-3xl text-white'><p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)]">Welcome to my Website.</p></h1>
          <h2 className='font-light text-center lg:text-left text-sky-200'><p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]"><i>I am a <span className='font-medium'>computer scientist</span>, <span className="font-medium">mathematician</span>, and <span className="font-medium">physicist</span></i></p></h2>
          <div className='font-light text-center lg:text-left text-sky-300 text-[80%] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]'>who thrives on challenging problems and serving an important cause with creativity through my work.</div>
        </div>
        <div className='flex flex-row pt-2'>
          <div className='flex-grow'/>
        <Image alt='' className="rounded-full border-sky-500 border-2 shadow-md" src="/image3.png" width={100} height={100}/>
          <div className='flex-grow'/>
        </div>
      </div>
      </div>
      </div>
      
      <div id="cards" className='w-3/4 m-auto p-4 flex-col space-y-4 lg:grid lg:grid-cols-3 gap-8 max-w-[1200px]'>
        <div className='transition duration-1000 delay-[100ms] translate-y-6 opacity-0 col-span-3'>
          <p className='font-bold text-gray-700 text-lg text-center mb-2'>About me</p>
          <p className='text-[97%] text-gray-700 text-center'>My formal training is as a physicist and mathematician. When it comes to those subjects I have a deep interest in differential geometry, quantum field theory, and new theories of cosmology. I have years of experience as a computer scientist, and am currently working with those skills at the Los Alamos National Lab. I am a self-motivated learner and am passionate about problem-solving.</p>
        </div>
        <div className='transition duration-1000 delay-[100ms] translate-y-6 opacity-0'>
          <h1 className='text-[97%] text-gray-700 font-medium'>Motivation and Drive</h1>
          <p className='text-[90%] text-gray-600'>I am self-motivated and passionate about problem solving and learning in general. There is a certain satisfaction that comes with making performant software, and this satisfaction has driven my learning for years.</p>
        </div>
        <div className='transition duration-1000 delay-[400ms] translate-y-6 opacity-0'>
          <h1 className='text-[97%] text-gray-700 font-medium'>Mathematics and Physics</h1>
          <p className='text-[90%] text-gray-600'>Aside from my passion for low level engine systems and graphics programming, I have an extensive education and knowledge of many different levels of mathematics <span className='text-[75%] italic text-gray-400 hover:text-gray-600'>(calculus, differential equations, variational calculus, group theory, differential geometry)</span> and its application to problems in physics <span className='text-[75%] italic text-gray-400 hover:text-gray-600'>(gauge theory, general relativity, quantum mechanics)</span>.</p>
        </div>
        <div className='transition duration-1000 delay-[550ms] translate-y-6 opacity-0'>
          <h1 className='text-[97%] text-gray-700 font-medium'>My Direction</h1>
          <p className='text-[90%] text-gray-600'>I am ready to use my many aquired skills in a constructive and creative environment. If there&apos;s one thing that characterizes my learning, it is persitence. I believe that persitence is the true key to unlocking profound understanding.</p>
        </div>
      </div>

      <div className='border-t-[1px]'>
        <div className='w-5/6 m-auto max-w-[1600px]'>
          <h1 className='text-[125%] p-2 font-bold text-gray-600 text-center'>Last Active Project: <Link href="https://www.github.com/maxortner01/cpp2d"><span className='font-medium text-sky-400 underline'>cpp2d</span></Link></h1>
          <div className='w-3/4 m-auto mb-4'><p className='ml-2 text-gray-500 text-[90%] text-center'>I have been involved in graphics programming for almost a decade now, initially starting in Java with OpenGL and slowly moving into C++, which I&apos;ve stayed for the last seven years or so. This passion for graphics has since strengthened and culminated into a passion for performat low-level computing systems. This project utilizes the <span className='font-medium text-gray-600'>Vulkan api, custom memory management, and a lightweight user API</span>. I think there is a key balance that should be struck between a nice user-friendly API and highly performat graphics systems. <Link className='underline text-sky-400' href="/posts?tags=cpp2d">Check out the devlogs!</Link></p></div>
          <NewShowy code={code} />
        </div>
      </div>


      <div className='border-t-[1px]'>
      <div className='w-3/4 m-auto z-20 max-w-[1200px]'>
      <div className='space-y-4 lg:grid lg:grid-cols-2 mt-4 mb-4 gap-2'>
        <div className='p-4 lg:col-span-2'>
          <h1 className='font-bold text-2xl'>Latest Posts</h1>
          <hr/>
          {
            posts.slice(0, 3).map(({slug, frontmatter}: any) => {
              return <Post key={frontmatter.title} selected_tags={[]} link={"/posts/" + slug} title={frontmatter.title} date={frontmatter.date} desc={frontmatter.metaDesc} tags={frontmatter.tags} />
            })
          }
          <PostFrame link={"/posts"} className='text-center text-gray-500 hover:text-sky-500'>View more posts...</PostFrame>
        </div>
      </div>
      </div>
      </div>
      <div className="pb-5 text-xs text-center text-gray-200"><i>Copyright © 2023 Max Ortner</i></div>
    </div>
  );
  /*
      <div className='bg-slate-100 pt-2 pb-2'>
        <LanguageBreakdown />
      </div>
        <GitHub repos={resume.pinned_repos} />*/
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

  
  const code_files = fs.readdirSync('./src/code');
  const code = code_files.map((fileName) => {
    const readFile = fs.readFileSync(`./src/code/${fileName}`, 'utf-8');
    const { data: frontmatter, content } = matter(readFile);

    var info: any = {}
    info[fileName.split(".")[0]] = content;

    return info;
  });

  return {
    props: {
      posts,
      resume,
      code
    },
  };
}