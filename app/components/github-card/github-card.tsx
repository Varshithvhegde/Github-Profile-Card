"use client"
// github-card.tsx
import React, { useEffect, useState, forwardRef } from 'react';
import { nFormatter } from '@/app/utils';
import styles from './github-card.module.css';

interface User {
  login: string;
  name: string;
  html_url: string;
  bio?: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface Repository {
  name: string;
  html_url: string;
  stargazers_count: number;
}

interface MyCardProps {
  dataUser: string;
  dataTheme?: string;
  authToken?: string;
}

const MyCard: React.ForwardRefRenderFunction<HTMLDivElement, MyCardProps> = (
  { dataUser, dataTheme = 'white', authToken },
  ref
) => {
  const [user, setUser] = useState<User | null>(null);
  const [topStarredRepos, setTopStarredRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${dataUser}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const userData: User = await userResponse.json();
        setUser(userData);

        const reposResponse = await fetch(`https://api.github.com/users/${dataUser}/repos`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const reposData: Repository[] = await reposResponse.json();

        const sortedRepos = reposData.sort((a, b) => b.stargazers_count - a.stargazers_count);
        const topTwoRepos = sortedRepos.slice(0, 2);

        setTopStarredRepos(topTwoRepos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dataUser, authToken]);

  const createCard = (user: User, topStarredRepos: Repository[]) => {
    const cardClassName = `${styles.card} ${dataTheme === 'dark' ? styles.dark : ''}`;
    return (
      <div className={cardClassName} ref={ref}>
        <div className={styles.cover}></div>
        <div className={`${styles['card-wrapper']} ${dataTheme === 'dark' ? styles.dark : ''}`}>
          <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener">
            <img id={styles['github-logo']} src="https://i.ibb.co/frv5pB3/github-logo.png" alt="github-logo" />
          </a>
          <div className={styles['card-header']}>
            <div className={styles['card-img-wrapper']}><img src={`https://avatars.githubusercontent.com/${user.login}`} alt="avatar" /></div>
            <h1><a className={styles['card-title']} href={user.html_url} target="_blank" rel="noopener">{user.name}</a></h1>
            <div className={styles['card-responsename']}><a href={user.html_url} target="_blank" rel="noopener">@{user.login}</a></div>
            <p className={styles['card-desc']}>{user.bio ?? ''}</p>
            <div className={styles['card-footer']}>
              <div className={styles['footer-box']}>
                <div className={styles['box-wrapper']}>
                  <div className={styles['count']}>{nFormatter(user.followers)}</div>
                  <div className={styles['box-text']}>Followers</div>
                </div>
                <div className={styles['box-wrapper']}>
                  <div className={styles['count']}>{nFormatter(user.following)}</div>
                  <div className={styles['box-text']}>Following</div>
                </div>
                <div className={styles['box-wrapper']}>
                  <div className={styles['count']}>{nFormatter(user.public_repos)}</div>
                  <div className={styles['box-text']}>Repositories</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles['most-starred-repos']}>
            <h2>Top Starred Repositories:</h2>
            <ul>
              {topStarredRepos.map((repo) => (
                <li key={repo.name}>
                  <a href={repo.html_url} target="_blank" rel="noopener">
                    {repo.name} (Stars: {nFormatter(repo.stargazers_count)})
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    );
  };

  return <>{user && createCard(user, topStarredRepos)}</>;
};

export default React.forwardRef(MyCard);
