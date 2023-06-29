import styles from './Random.module.css';
import OpenData from '../components/OpenData'
import { useState, useEffect } from 'react'
import React from 'react';

function Random({data, handleSetPrompts, prompts}) {

  const uniqueData = [...new Set(data.map(item => item.cluster))];
  const [randomData, setRandomData] = useState([]);
  const [selects, setSelects] = useState([]);
  const parent = "random";

  const handleClick = (item) => {
    setSelects([...selects, item])
  }

  const handleRandom = () => {
    // 初期化
    const randomItems = [];
    // selectsの値を取り出してランダムに1つデータを取ってくる
    selects.map((select) => {
      const filteredArray = data.filter(item => item.cluster == select);
      filteredArray.sort(() => Math.random() - 0.5);
      const randomItem = filteredArray[0];
      // console.log()
      randomItems.push(randomItem);
    });
    setRandomData(randomItems)
  }

  const handleDelete = (item) => {
    const copiedArray = Array.from(selects);

    const condition = (element) => element === item;
    const index = copiedArray.findIndex(condition);

    if (index !== -1) {
      copiedArray.splice(index, 1);
      setSelects(copiedArray)
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.clusters}>
        {uniqueData.map((item, index) => (
          <button key={item.id} className={styles.cluster_button} onClick={() => handleClick(item)}>
            {item}
          </button>
        ))}
        </div>
        <div className={styles.select}>
          {selects[0] ? <></> : <div>グループをを選択してください</div>}
          <div className={styles.select_cluster}>
            {selects.map((item) =>(
              <div className={styles.select_item_content}>
                <div className={styles.select_item_wrapper}>
                  <div className={styles.select_item}>
                    <div className={styles.item_name}>{item}</div>
                    <button className={styles.delete_button} type="button" onClick={() => handleDelete(item)}>
                      delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
        <button className={styles.decision_button} type="button" onClick={() => handleRandom()}>実行</button>
        <div className={styles.datas}>
          <OpenData data={randomData} handleSetPrompts={handleSetPrompts} prompts={prompts} parent={parent} />
        </div>
      </div>
    </div>
  );
}

export default Random;
