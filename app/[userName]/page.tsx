// "use client"
// Home.tsx
import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
// import MyCard from "./components/github-card/github-card";
import { Button, ChakraProvider, Input, Stack } from "@chakra-ui/react";
import MyCard from "../components/github-card/github-card";

export default function User({ params }: { params: { userName: string } }) {
    return (
        <>
        <title>{`Varshithvhegde's Profile`}</title>
        <meta property="og:title" content={`${params.userName}'s Profile`} />
        <meta property="og:description" content="Fondler" />
        <meta property="og:image" content="https://avatars.githubusercontent.com/Varshithvhegde" />
        <meta property="og:url" content={`URL to the user's profile page`} />
        <meta property="og:type" content="profile" />
        <MyCard dataUser={params.userName} authToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN} dataTheme="white" />
        </>
    );
  }
  