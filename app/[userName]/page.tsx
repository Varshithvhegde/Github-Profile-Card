"use client"
// Home.tsx
import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
// import MyCard from "./components/github-card/github-card";
import { Button, ChakraProvider, Input, Stack } from "@chakra-ui/react";
import MyCard from "../components/github-card/github-card";
import { Head } from "next/document";
import { NextSeo } from "next-seo";
export default function User({ params }: { params: { userName: string } }) {
    return (
        <>
        {/* <Head> */}
        <NextSeo
        openGraph={{
          type: "website",
          title: "Varshithvhegde's Profile",
          description: "Fondler",
          images: [
            {
              url: "https://avatars.githubusercontent.com/Varshithvhegde",
              width: 320,
              height: 213,
              alt: "Varshithvhegde",
            },
          ],
        }}
      />
        <MyCard dataUser={params.userName} authToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN} dataTheme="white" />
        </>
    );
  }
  