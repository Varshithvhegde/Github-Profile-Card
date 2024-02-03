import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Button, ChakraProvider, Input, Stack } from "@chakra-ui/react";
import MyCard from "../components/github-card/github-card";
import MyNewCard from "../components/my-card/my-card";

export default function User({ params }: { params: { userName: string } }) {
  const getRandomComponent = () => {
    const randomNumber = Math.floor(Math.random() * 3); // Generate a random number between 0 and 2

    switch (randomNumber) {
      case 0:
        return <MyCard dataUser={params.userName} authToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN} dataTheme="white" />;
      case 1:
        return <MyCard dataUser={params.userName} authToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN} dataTheme="dark" />;
      case 2:
        return <MyNewCard dataUser={params.userName} authToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN} dataTheme="white" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* <Head> */}
      <title>{`${params.userName}'s Profile`}</title>
      <meta property="og:title" content={`${params.userName}'s Profile`} />
      <meta property="og:description" content="Fondler" />
      <meta property="og:image" content="https://avatars.githubusercontent.com/Varshithvhegde" />
      <meta property="og:url" content="https://avatars.githubusercontent.com/Varshithvhegde" />
      <meta property="og:type" content="profile" />
      {/* </Head> */}
      {getRandomComponent()}
    </>
  );
}
