"use client"
import React, { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import Head from "next/head";
import MyCard from "../components/github-card/github-card";
import MyNewCard from "../components/my-card/my-card";

export default function User({ params }: { params: { userName: string } }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [randomComponent, setRandomComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    setRandomComponent(getRandomComponent());
  }, [params.userName]);

  const getRandomComponent = () => {
    const randomNumber = Math.floor(Math.random() * 3);

    switch (randomNumber) {
      case 0:
        return <MyCard ref={cardRef} dataUser={params.userName} authToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN} dataTheme="white" />;
      case 1:
        return <MyCard ref={cardRef} dataUser={params.userName} authToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN} dataTheme="dark" />;
      case 2:
        return <MyNewCard ref={cardRef} dataUser={params.userName} authToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN} dataTheme="white" />;
      default:
        return null;
    }
  };

  const setOgImage = () => {
    if (cardRef.current) {
      toPng(cardRef.current)
        .then((dataUrl) => {
          const head = document.head || document.getElementsByTagName("head")[0];
          const ogImageTag = document.querySelector("meta[property='og:image']");

          if (ogImageTag) {
            ogImageTag.setAttribute("content", dataUrl);
          } else {
            const newOgImageTag = document.createElement("meta");
            newOgImageTag.setAttribute("property", "og:image");
            newOgImageTag.setAttribute("content", dataUrl);
            head.appendChild(newOgImageTag);
          }
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    }
  };

  useEffect(() => {
    setOgImage();
  }, [randomComponent]);

  return (
    <>
      <Head>
        <title>{`${params.userName}'s Profile`}</title>
        <meta property="og:title" content={`${params.userName}'s Profile`} />
        <meta property="og:description" content="Fondler" />
        <meta property="og:url" content={`https://yourwebsite.com/user/${params.userName}`} />
        <meta property="og:type" content="profile" />
      </Head>

      {randomComponent}
    </>
  );
}
