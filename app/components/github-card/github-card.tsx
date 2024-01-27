"use client"
import React, { useEffect, useState } from 'react';
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

interface MyCardProps {
  dataUser: string;
  dataTheme?: string;
}

const MyCard: React.FC<MyCardProps> = ({ dataUser, dataTheme = 'dark' }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`https://api.github.com/users/${dataUser}`, {
          method: 'GET',
        });
        const result: User = await data.json();
        setUser(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dataUser]);

  const createCard = (user: User) => {
    return (
      <div className={styles.card}>
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
        </div>
      </div>
    );
  };

  return (
    <div className={`${styles['github-card']} ${dataTheme}`}>
      {user && createCard(user)}
    </div>
  );
};

export default MyCard;
