"use client"
// Home.tsx
import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import MyCard from "./components/github-card/github-card";
import { Button, ChakraProvider, Input, Stack } from "@chakra-ui/react";

export default function Home() {
  const myCardRef = useRef<HTMLDivElement>(null);
  const [githubUsername, setGithubUsername] = useState("");
  const [userInput, setUserInput] = useState("");
  let typingTimer: NodeJS.Timeout;
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    clearTimeout(typingTimer);

    // Set a delay (e.g., 1000 milliseconds) before making the API request
    typingTimer = setTimeout(() => {
      setGithubUsername(e.target.value);
      fetchData(e.target.value);
    }, 2000);
  };

  const fetchData = (username: string) => {
    // Perform your API request here with the GitHub username
    console.log(`Fetching data for ${username}`);
  };
  const handleDownload = () => {
    if (myCardRef.current) {
      const targetElement = myCardRef.current as HTMLElement; // Asserting non-null
      toPng(targetElement)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "my-card.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      if (myCardRef.current) {
        const targetElement = myCardRef.current as HTMLElement; // Asserting non-null
        toPng(targetElement)
          .then((dataUrl) => {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              ctx?.drawImage(img, 0, 0);
  
              canvas.toBlob((blob) => {
                if (blob) {
                  const filesArray = [new File([blob], "my-card.png", { type: "image/png" })];
                  navigator.share({
                    title: "My GitHub Card",
                    files: filesArray,
                  });
                }
              }, "image/png");
            };
          })
          .catch((error) => {
            console.error("Error sharing image:", error);
          });
      }
    } else {
      alert("Web Share API is not supported in this browser");
    }
  };

  return (
    <ChakraProvider>
      <Stack spacing={4} align="center" style={{ margin: "10px" }}>
        <Input
          placeholder="Enter GitHub Username"
          value={userInput}
          style={{ width: "25%" }}
          onChange={handleUsernameChange}
        />
        <MyCard
          ref={myCardRef}
          dataUser={githubUsername}
          dataTheme="white"
          authToken={githubToken}
        />

        <Button onClick={handleDownload} colorScheme="blue">
          Download MyCard as Image
        </Button>
        <Button onClick={handleShare} colorScheme="green">
          Share MyCard
        </Button>
      </Stack>
    </ChakraProvider>
  );
}
