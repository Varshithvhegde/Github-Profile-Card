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
        <MyCard dataUser={params.userName} authToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN} dataTheme="white" />
        
            {params.userName} hello
        </>
    );
  }
  