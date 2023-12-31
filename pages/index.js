import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/Home.module.css'


export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3060/api/text2img')
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}


export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <main>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <div className={styles.buttons}>
                <Link href="/generate">
                  <button className={styles.generate_page}>プロンプト作成ページへ</button>
                </Link>
                <Link href="/crud/read">
                  <button className={styles.edit_page}>データ編集ページへ</button>
                </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
