"use client"
// Home.tsximport React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import MyCard from "./components/github-card/github-card";
import MyNewCard from "./components/my-card/my-card";
import { Button, ChakraProvider, Input, Stack, Select,Flex, flexbox, Center } from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function Home() {
  const myCardRef = useRef<HTMLDivElement>(null);
  const [githubUsername, setGithubUsername] = useState("");
  const [userInput, setUserInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("Minimalistic");
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  // let typingTimer: NodeJS.Timeout;

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  };

  const fetchData = (username: string) => {
    // Perform your API request here with the GitHub username
    console.log(`Fetching data for ${username}`);
  };

  const handleDownload = () => {
    if (myCardRef.current) {
      const targetElement = myCardRef.current as HTMLElement;
      toPng(targetElement)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = githubUsername+".png";
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

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
//   const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUserInput(e.target.value);
//   };

  const renderSelectedCard = () => {
    switch (selectedOption) {
      case "Minimalistic":
        // setGithubUsername(userInput)
        return <MyCard ref={myCardRef} dataUser={githubUsername} dataTheme="white" authToken={githubToken} />;
      case "Minimalistic(dark)":
        return <MyCard ref={myCardRef} dataUser={githubUsername} dataTheme="dark" authToken={githubToken} />;
      case "Futuristic":
        return <MyNewCard ref={myCardRef} dataUser={githubUsername} dataTheme="white" authToken={githubToken} />;
      default:
        return null;
    }
  };
  const handleSubmit = () => {
    setGithubUsername(userInput);
  };

  return (
    
    <ChakraProvider>
      <Stack spacing={4} align="center" style={{ margin: "10px", width :"100%" }}>
        <Flex align="center">
          <Input
            placeholder="Enter GitHub Username"
            value={userInput}
            style={{ width: "70%" }}
            onChange={handleUsernameChange}
          />
          <Button onClick={handleSubmit} colorScheme="blue" style={{marginLeft: "5%"}}>
            Submit
          </Button>
        </Flex>
    
            <Center>
                <div style={{width:"100%"}}>
          <Select value={selectedOption} onChange={handleOptionChange} style={{ width: "100%" }}>
            <option value="Minimalistic">Minimalistic</option>
            <option value="Minimalistic(dark)">Minimalistic(dark)</option>
            <option value="Futuristic">Futuristic</option>
          </Select>
          </div>
          </Center>
        {githubUsername && renderSelectedCard()}
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
