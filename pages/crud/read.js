import Head from 'next/head'
import React from 'react'
import axios from 'axios'
import OpenData from '../../components/OpenData'
import Cluster from '../../components/Cluster'
import Link from 'next/link';
import styles from '../../styles/Read.module.css'
import { useState, useEffect } from 'react'



const text2imgUrl = process.env.NEXT_PUBLIC_TEXT2IMG_URL;


Read.getInitialProps = async () => {
  const res = await axios.get(text2imgUrl)
  const data = res.data
  return { data }
}


export default function Read(data) {

  const [selectCluser, setSelectCluster] = useState('facial expression');
  const handleSelectCluster = (childData) => {
    setSelectCluster(childData);
    // const clusterData = data.filter(item => item.cluster == selectCluser).map(item => item.prompt);
    // console.log(childData);
  }

  const clusterData = data.data.filter(item => item.cluster == selectCluser).map(item => item);

  useEffect(() => {
    // trigger関数がtrueを返す場合だけ、副作用を実行
    if(data && Array.isArray(data.data)){
      const clusterData = data.data.filter(item => item.cluster == selectCluser).map(item => item);
      // console.log(clusterData);
    }else{
      console.error("data is not array or not exist")
    }
  }, [selectCluser]);

  return (
    <>
      <Head>
        <title>data crud page</title>
        <meta name="description" content="create, read, update, delete" />
      </Head>
      <main>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.search_data}>
              <p>検索フォームを作りたい</p>
              {/* <p>{selectCluser}</p> */}

            </div>
            <Link href="/crud/create">
              <div class={styles.create}>prompt作成ページへ</div>
            </Link>
            <div class={styles.read_data}>
              <div class={styles.read_data_wrapper}>
                <div class={styles.left_content}>
                  <div class={styles.cluster}>
                    <Cluster data={data.data} selectCluster={handleSelectCluster} />
                  </div>
                </div>
                <div class={styles.right_content}>
                  <div className={styles.datas}>
                      <OpenData data={clusterData ? clusterData:[]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
