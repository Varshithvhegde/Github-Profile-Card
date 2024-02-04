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
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (cardRef.current) {
        console.log("====================================");
        console.log("CardRef Present");
        console.log("====================================");

        toPng(cardRef.current)
          .then((dataUrl) => {
            // Create a local image file
            const blob = dataURLtoBlob(dataUrl);
            const url = URL.createObjectURL(blob);

            // Set the local image file URL to imageURL state
            setImageURL(url);
          })
          .catch((error) => {
            console.error("Error generating image:", error);
          });
      } else {
        console.log("====================================");
        console.log("No CardRef");
        console.log("====================================");
      }
    }, 2000);

    // Cleanup function to clear the timeout in case the component unmounts
    return () => clearTimeout(timeoutId);
  }, [randomComponent,cardRef]);

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

  // Convert data URL to Blob
  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };


  return (
    <>
      {/* <Head> */}
        <title>{`${params.userName}'s Profile`}</title>
        <meta property="og:title" content={`${params.userName}'s Profile`} />
        <meta property="og:description" content="Fondler" />
        <meta property="og:url" content={`https://yourwebsite.com/user/${params.userName}`} />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="" />
      {/* </Head> */}

      {randomComponent}
      {imageURL && <img src={imageURL} alt="GitHub Card" />}
    </>
  );
}
