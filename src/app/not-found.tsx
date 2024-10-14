import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <Link href="/">На главную</Link>
    </div>
  );
}

// "use client";

// import styles from "@/components/Track/Track.module.css";
// import signing from "@/app/signin/signIn.module.css";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Navigation from "@/components/Navigation/Navigation";
// import Searchbar from "@/components/Search/Search";
// import Sidebar from "@/components/Sidebar/Sidebar";
// import Bar from "@/components/Bar/Bar";

// export default function NotFound() {
//   const router = useRouter();

//   return (
//     <div className="wrapper">
//       <div className="container">
//       <main className={`${styles.mainContainer} ${styles.showError}`}>
//           <Navigation />

//           <div className={styles.main}>
//             <Searchbar />
//           </div>

//           <div className={styles.error}>
//             <h1>404</h1>
//             <div className={styles.subtitle}>
//               <h2>Страница не найдена</h2>
//               <Image
//                 src="/img/crying.png"
//                 alt="crying"
//                 width={52}
//                 height={52}
//               />
//             </div>
//             <p>
//               Возможно, она была удалена
//               <br />
//               или перенесена на другой адрес
//             </p>
//             <button
//               className={signing.modalEnter}
//               onClick={() => router.push("../")}
//             >
//               Вернуться на главную
//             </button>
//           </div>

//           <Sidebar />
//         </main>

//         <Bar />
//         <footer className="footer" />
//       </div>
//     </div>
//   );
// }