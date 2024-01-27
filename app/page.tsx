import Image from "next/image";
import styles from "./page.module.css";
import MyCard from "./components/github-card/github-card";
export default function Home() {
  return (
   <main>
       <MyCard dataUser="varshithvhegde" dataTheme="dark" />
    </main>
  );
}
