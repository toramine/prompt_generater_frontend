import Head from 'next/head'
import React from 'react'
import axios from 'axios'
import OpenData from '../components/OpenData'
import Cluster from '../components/Cluster'
import GeneratePrompt from '../components/GeneratePrompt'
import Random from '../components/Random'
import Link from 'next/link';
import styles from '../styles/Generate.module.css'
import { useState, useEffect } from 'react'
import { DragDropContext } from "react-beautiful-dnd";


const text2imgUrl = process.env.NEXT_PUBLIC_TEXT2IMG_URL;

Generate.getInitialProps = async () => {
  const res = await axios.get(text2imgUrl)
  const data = res.data
  return { data }
}

//dndの関数
function reorder(list, startIndex, endIndex) {
  const removed = list.splice(startIndex, 1)
  list.splice(endIndex, 0, removed[0])

  return list;
  }


export default function Generate(data) {

  const [selectCluser, setSelectCluster] = useState('facial expression');
  const [copyData, setCopyData] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [mode, setMode] = useState("セレクト");
  const parent = "generate";


  // dndの関数
  function onDragEnd (result) {
    if (!result.destination) {
         return;
    }
    const reorderedItems = reorder(
        prompts,
        result.source.index,
        result.destination.index
    );
    handleSetPrompts(reorderedItems);
  };

  function handleCopyButtonClick() {
    const data = prompts.map(item => item.content).join(', ');
    navigator.clipboard.writeText(data).then(() => {
        alert("コピーできました！");
        console.log('Data copied to clipboard');
    }, (err) => {
        console.error('Failed to copy data: ', err);
    });
  }

  const handleSelectCluster = (childData) => {
    setSelectCluster(childData);
  }

  const handleSetPrompts = (childData) => {
    setPrompts(childData);
  }

  const handleShowButtonClick = () => {
    setCopyData(prompts.map(item => item.content).join(', '));
  }

  const handleModeButtonClick = () => {
    mode === "セレクト" ?
    setMode("ランダム")
    : setMode("セレクト")
  }


  //selectClusterと同じ値を持つデータを取得し配列に格納する
  const clusterData = data.data.filter(item => item.cluster == selectCluser).map(item => item);

  useEffect(() => {
    if(data && Array.isArray(data.data)){
      //選択されたクラスターと同じクラスターを待つデータを取ってくる
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
            <div className={styles.output}>
              <div>{copyData}</div>
              <button className={styles.create_button} onClick={handleShowButtonClick}>Create</button>
              <button className={styles.create_button} onClick={handleCopyButtonClick}>Copy</button>
            </div>

            <div className={styles.generate_data}>
              <DragDropContext onDragEnd={onDragEnd}>
                <GeneratePrompt items={prompts} handleSetPrompts={handleSetPrompts}/>
              </DragDropContext>
            </div>
            <p className={styles.button_name}>切り替えボタン</p>
            <button className={styles.switching} onClick={handleModeButtonClick}>
              {mode === "セレクト" ? "to Random Mode" : "to Select Mode"}
            </button>
            {/* modeの値でここからしたが切り替わる */}
            {mode === "セレクト" ?
            <div class={styles.read_data}>
              <div class={styles.read_data_wrapper}>
                <div class={styles.left_content}>
                  <div class={styles.cluster}>
                    <Cluster data={data.data} selectCluster={handleSelectCluster} />
                  </div>
                </div>
                <div class={styles.right_content}>
                  <div className={styles.datas}>
                      <OpenData data={clusterData ? clusterData:[]} handleSetPrompts={handleSetPrompts} prompts={prompts} parent={parent} />
                  </div>
                </div>
              </div>
            </div>
            :
            <div className={styles.random}>
              <Random data={data.data} handleSetPrompts={handleSetPrompts} prompts={prompts}/>
            </div>
            }
          </div>
        </div>
      </main>
    </>
  )
}
