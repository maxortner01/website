import Head from "next/head";
import Image from "next/image";

import fs from 'fs';
import { language } from "gray-matter";

function WorkCard({title, location, desc, date, className}: any)
{
    return(
        <div className={"mb-4 " + className}>
        <div className="flex flex-row mb-2 text-[95%]">
            <div className="w-2/3 text-justify">
                <h1>
                    <span className="font-bold">{title}</span>
                    <span className="text-gray-400"> {location}</span>
                </h1>
            </div>
            <div className="w-1/3 text-right text-sky-500">{date}</div>
        </div>
        <div className="text-[85%] text-gray-500">{desc}</div>
        </div>
    )
}

function SkillCell({ title, type, first=false }: any)
{
    return <div className={"rounded-md print:scale-[90%] border p-[2%] pt-[1%] pb-[1%] mb-1 " + (first?"ml-1 ":" ") + (type == "language"?"border-sky-600":"text-sky-900 border-sky-900")}>{title}</div>
}

function Education({ college, creditial, data }: any)
{
    return (<>
        <h2 className="text-gray-600 text-[80%] font-bold">{college}</h2>
        <h2 className="text-gray-500 text-[70%] mb-1"><i>{creditial}</i></h2>
        {
            data.map(({value, name}: any) => {
                return <h2 key={value} className="text-gray-500 text-[70%]">{name}: <span className="font-bold">{value}</span></h2>
            })
        }
    </>
    )
}

export default function Resume({ resume }: any)
{
    function onLoad()
    {
        var contain = document.getElementById("work-contain");
        var children = []

        if (contain){
            children = Array.from(contain.children);
            children.forEach((child) => child.classList.replace("translate-y-6", "translate-y-0"));
            children.forEach((child) => child.classList.replace("opacity-0", "opacity-100"));
        }

        contain = document.getElementById("work-contain2");

        if (contain){
            children = Array.from(contain.children);
            children.forEach((child) => child.classList.replace("translate-y-6", "translate-y-0"));
            children.forEach((child) => child.classList.replace("opacity-0", "opacity-100"));
        }
    }

    return (
        <>
        <title>Resume</title>
        <div onLoad={onLoad} className="lg:w-[66%] max-w-[950px] m-auto lg:flex lg:flex-row my-20 font-sans-serif print:w-[90%] cursor-default">
            <div className="m-4 lg:w-[66%] p-6">
                <div className="flex flex-row">
                    <div className="flex-grow mt-2">
                        <h1 className="text-[220%] print:text-[165%] font-extrabold">Max Ortner</h1>
                        <h2 className="text-[100%] print:text-[80%] text-gray-400"><i>Computer Scientist, Mathematics, Physicist</i></h2>
                    </div>
                    <div>
                        <Image alt="" className="rounded-full border-gray-600 border-2 shadow-lg" src="/image3.png" width={100} height={100}/>
                    </div>
                </div>

                <h3 className="text-[120%] font-bold mt-[3%] text-sky-500">Relevant Experience</h3>
                <hr className="pt-2 mb-2" />

                <div id="work-contain">
                {
                    resume.resume.workExperience.map((experience: any, index: number) => {
                        return <WorkCard
                                    key={experience.title}
                                    title={experience.title}
                                    location={experience.location}
                                    desc={experience.desc}
                                    date={experience.date}
                                    className={"trasition duration-1000 translate-y-6 opacity-0 delay-[" + ( index * 100).toString() + "ms]"}
                                />
                    })
                }
                </div>

                <h3 className="text-[120%] font-bold mt-[3%] text-sky-500">Notable Projects</h3>
                <hr className="pt-2 mb-2" />

                <div id="work-contain2">
                {
                    resume.projects.slice(0, 2).map((project: any, index: number) => {
                        return <WorkCard
                                    key = {project.title}
                                    title={<a className="underline" href={project.link}>{project.title}</a>}
                                    location={<></>}
                                    desc={project.desc}
                                    date={project.date}
                                    className={"trasition duration-1000 translate-y-6 opacity-0 delay-[" + ( 200 + index * 100).toString() + "ms]"}
                                />
                    })
                }
                </div>

            </div>
            <div className="m-4 lg:w-[33%] bg-sky-50 rounded-lg shadow-md border p-6">
                <h1 className="text-sky-500 text-[100%] print:text-[70%] font-extrabold">Contact</h1>
                <hr className="pt-2 mb-2" />
                <div className="flex flex-col text-gray-500 text-[80%] print:text-[50%]">
                    <div className="mt-2 mb-2">
                        {
                            resume.resume.contact.address.map((line: string) => <p key={line}>{line}</p>)
                        }
                    </div>
                    <div><a href={"mailto:" + resume.resume.contact.email}>{resume.resume.contact.email}</a></div>
                </div>

                <div className="m-[8%]" />

                <h1 className="text-sky-500 text-[100%] print:text-[70%] font-extrabold">Skills</h1>
                <hr className="pt-2 mb-2" />
                <p className="text-[80%] print:text-[60%] mb-[2%] font-bold"><i>Significant Experience</i></p>
                <div className="flex flex-row flex-wrap text-[80%] print:text-[50%] text-sky-500 space-x-1">
                    {
                        resume.resume.skills.filter((skill: any) => skill.level == "significant").map((skill: any, index: number) => {
                            return <SkillCell key={index} title={skill.name} type={skill.type} first={index == 0} />
                        })
                    }
                </div>
                <p className="text-[80%] print:text-[60%] mb-[2%] mt-[5%] font-bold"><i>Other Exposure</i></p>
                <div className="flex flex-row flex-wrap text-[80%] print:text-[50%] text-sky-500 space-x-1">
                    {
                        resume.resume.skills.filter((skill: any) => skill.level == "other").map((skill: any, index: number) => {
                            return <SkillCell key={index} title={skill.name} type={skill.type} first={index == 0} />
                        })
                    }
                </div>

                <div className="m-[8%]" />

                <h1 className="text-sky-500 text-[100%] print:text-[70%] font-extrabold">Education</h1>
                <hr className="pt-2 mb-2" />
                {
                    resume.resume.education.map((college: any) => {
                        return <Education key={college.title} college={college.title} creditial={college.creditial} data={college.data} />
                    })
                }

                <div className="m-[8%]" />

                <h1 className="text-sky-500 text-[100%] print:text-[70%] font-extrabold">Find me Online</h1>
                <hr className="pt-2 mb-2" />

                <div className="text-[75%] text-gray-500">
                <table className="table-fixed w-full">
                <tbody>
                    <tr>
                        <td >Github:</td>
                        <td className="underline"><a href="https://github.com/maxortner01">maxortner01</a></td>
                    </tr>
                    <tr>
                        <td>LinkedIn:</td>
                        <td className="underline"><a href="https://www.linkedin.com/in/max-ortner/">max-ortner</a></td>
                    </tr>
                    <tr>
                        <td>Website:</td>
                        <td className="underline"><a href="https://www.maxortner.com">maxortner.com</a></td>
                    </tr>
                </tbody>
                </table>
                </div>
            </div>
        </div>
        </>
    )
}

export async function getStaticProps() {

  const resume = JSON.parse(fs.readFileSync("./src/resume.json").toString());
  
  return {
    props: {
      resume
    },
  };
}