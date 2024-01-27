"use client"
// Home.tsx
import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import MyCard from './components/github-card/github-card';

export default function Home() {
  const myCardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (myCardRef.current) {
      toPng(myCardRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'my-card.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Error generating image:', error);
        });
    }
  };

  return (
    <main>
      <MyCard ref={myCardRef} dataUser="varshithvhegde" dataTheme="dark"/>

      <button onClick={handleDownload}>Download MyCard as Image</button>
    </main>
  );
}
