"use client"
import React, { useEffect, useRef, useState } from 'react';
import { AiTwotoneStar, AiOutlineIssuesClose } from 'react-icons/ai';
import { BiGitPullRequest } from 'react-icons/bi';
import { GoRepo } from 'react-icons/go';
import { BsFillPeopleFill } from 'react-icons/bs';
import bg from '../../assets/design-tools.jpg';
import Tilt from 'react-parallax-tilt';
import 'tailwindcss/tailwind.css';
import  styles from './my-card.module.css'
interface LanguageData {
  [key: string]: number;  
}
interface Repository {
  language: string | null;
  stargazers_count : number | null;
  // other relevant properties
}

interface UserData {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface MyCardProps {
  dataUser: string;
  dataTheme?: string;
  authToken?: string;
}

const MyNewCard:  React.ForwardRefRenderFunction<HTMLDivElement, MyCardProps> = (
  { dataUser, dataTheme = 'white', authToken },
  ref
) => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [allLanguages, setAllLanguages] = useState<string[]>([]);
  const [percentage, setPercentage] = useState<any>();
  const [totalStars, setTotalStars] = useState<number>(0);
  const [userData , setUserData] = useState<UserData>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from GitHub API
        const userResponse = await fetch(`https://api.github.com/users/${dataUser}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const user: UserData = await userResponse.json();
        console.log('====================================');
        console.log(user, 'UserData');
        console.log('====================================');
        setUserData(user);
    
        // Fetch repository data from GitHub API with authentication
        const reposResponse = await fetch(`https://api.github.com/users/${dataUser}/repos?per_page=200`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const reposData: Repository[] = await reposResponse.json();
        const starsCount = reposData.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);
        setTotalStars(starsCount);
        console.log('====================================');
        console.log(reposData, 'Repo Data');
        console.log('====================================');
        // Extract language data from repositories
        const allLanguages = reposData.reduce<string[]>((acc, repo) => {
          if (repo.language) {
            acc.push(repo.language);
          }
          return acc;
        }, []);

        // Remove duplicates from language array
        const uniqueLanguages: string[] = [...new Set(allLanguages)];

        
        // Set state
        setAllLanguages(uniqueLanguages);
      
        setLanguages(uniqueLanguages.slice(0, 3));

       
        const languageCount: { [key: string]: number } = {};
        reposData.forEach((repo) => {
          if (repo.language) {
            languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
          }
        });

        const totalRepos = reposData.length;
        const languagePercentages = Object.keys(languageCount).reduce((result, language) => {
          const percentage = (languageCount[language] / totalRepos) * 100;
          result[language] = percentage.toFixed(2) + '%';
          return result;
        }, {} as { [key: string]: string });
        setPercentage(languagePercentages);
        // Log language percentages
        console.log('====================================');
        console.log(languagePercentages, 'Language Percentages');
        console.log('====================================');
         // Calculate percentage
        // const sum = uniqueLanguages.reduce((total, language) => total + (languagePercentages. || 0), 0);
        // setPercentage(sum);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dataUser]);

  useEffect(() => {
    console.log('====================================');
    console.log(allLanguages,"Languages");
    console.log('====================================');
    console.log('====================================');
    console.log(percentage,"Percentage");
    console.log('====================================');
  }, [allLanguages]);

  const slider = useRef<HTMLDivElement>(null);
  let mouseDown = false;
  let startX: number, scrollLeft: number;

  let startDragging = function (e: React.MouseEvent<HTMLDivElement>) {
    mouseDown = true;
    startX = e.pageX - (slider.current?.offsetLeft || 0);
    scrollLeft = slider.current?.scrollLeft || 0;
  };

  const stopDragging = () => {
    mouseDown = false;
  };

  function mouseMoveEvent(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    if (!mouseDown) {
      return;
    }
    const x = e.pageX - (slider.current?.offsetLeft || 0);
    const scroll = x - startX;
    slider.current!.scrollLeft = scrollLeft - scroll;
  }

  return (
    // <>
    <div className="text-white">
    <div className={styles.bg + " bg absolute h-screen w-screen"}></div>
    <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} gyroscope={true}>
      <div className={styles.cover + " cover rounded-2xl"} ref={ref}>
        <div className={styles.card_outer + " card_outer h-3/4 z-10 flex flex-col bg-gray-800 p-2"}>
          <div className="absolute right-[-5px] top-10 z-[-1] box-border w-52 overflow-hidden rounded-full border-t-4 border-l-4 border-amber-500 opacity-50">
            <img className="object-cover" src={userData ? userData.avatar_url : " "} alt="" />
          </div>
          <div className="my-1 flex items-center justify-start gap-2">
            <div className="w-8 overflow-hidden rounded-full">
              <img
                className="object-cover"
                src="https://avatars.githubusercontent.com/u/583231?v=4"
                alt="octocat"
              />
            </div>
            <a target="_blank" href={`https://github.com/${userData?.login}`}>
              <h1 className="text-lg font-bold">{`@${userData?.login}`}</h1>
            </a>
          </div>
            <div className="mt-auto">
              {/* <div className="flex gap-8">
                <div className="my-4 flex flex-col leading-3">
                  <div className="text-3xl font-bold"></div>
                  <div className="font-semibold"></div>
                </div>
                <div className="my-4 flex flex-col leading-3">
                  <div className="text-3xl font-bold"></div>
                  <div className="font-semibold"></div>
                </div>
              </div> */}
              <div className="my-4 flex w-full justify-between font-semibold">
                <div className="flex flex-col items-center justify-start gap-1 leading-3">
                  <div className="flex items-center gap-1">
                    <AiTwotoneStar /> Stars
                  </div>
                  <div>{totalStars}</div>
                </div>
                {/* <div className="flex flex-col items-center justify-start gap-1 leading-3">
                  <div className="flex items-center gap-1">
                    <BiGitPullRequest />
                    Pull Req
                  </div>
                  <div>{2000}</div>
                </div> */}

                {/* <div className="flex flex-col items-center justify-start gap-1 leading-3">
                  <div className="flex items-center gap-1">
                    <AiOutlineIssuesClose /> Issues
                  </div>
                  <div>{100}</div>
                </div> */}

                <div className="flex flex-col items-center justify-start gap-1 leading-3">
                  <div className="flex items-center gap-1">
                    <GoRepo />
                    Repos
                  </div>
                  <div>{userData?.public_repos}</div>
                </div>
              </div>
              <div className="my-4 flex justify-between">
                <div className="flex items-center justify-center gap-1 font-bold">
                  <div>Followers:</div>
                  <BsFillPeopleFill />
                  <div>{userData?.followers}</div>
                </div>
                <div className="flex items-center justify-center gap-1 font-bold">
                  <div>Following:</div>
                  <BsFillPeopleFill />
                  <div>{userData?.following}</div>
                </div>
              </div>
              <div>
                {languages.map((language, index) => {
                  const percentageValue = parseFloat(percentage[language]) || 0;
                  return (
                    <>
                      <div className="my-2 leading-4">
                        <div style={{padding:"1px"}}>{language}</div>
                        {/* <progress
                          className={styles.progress}
                          id="progress"
                          value={percentageValue}
                          max={100}
                        ></progress> */}
                        <div className={styles.progress}>
        <div
          className={styles.progressbar}
          style={{ width: `${percentageValue}%` }}
        ></div>
      </div>
                      </div>
                    </>
                  )
                })}
              </div>
              {/* <div
                className={styles.genre+""+"genre mb-2"}
                ref={slider}
                onMouseDown={startDragging}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                onMouseMove={mouseMoveEvent}
              >
                {allLanguages.map((language, index) => (
                  <p
                    key={index}
                    className={styles.genre_item+" "+"genre_item my-1 mr-2 rounded-full bg-gray-700 bg-opacity-80 py-1 px-3 text-sm text-white"}
                  >
                    {language}
                  </p>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </Tilt>
      {/* </> */}
    </div>
  );
};

// export async function getServerSideProps(context: any) {
//   const { username } = context.query;
//   const res = await fetch(`https://api.github.com/users/${username}`);
//   const data: UserData = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default React.forwardRef(MyNewCard);
