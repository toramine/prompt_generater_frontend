import React from 'react'
import Link from 'next/link'
import Card from './Card'
import styles from './OpenData.module.css'


// 配列が渡されてmap関数で展開する
const OpenData = ({data, handleSetPrompts, prompts, parent}) => {
  return (
    <>
      <div class={styles.container}>
        <div class={styles.wrapper}>
          {parent === "generate" ?
            <h3>一覧を表示({data[0] ? data[0].cluster : ""})</h3>
            :
            <></>
          }

          <div class={styles.item}>
              {data.map((item)=>{
                return(
                  <Card prompts={prompts} item={item} handleSetPrompts={handleSetPrompts} parent={parent} />
                  // <li key={item.id}>
                  //   <Card item={item} />
                  // </li>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default OpenData
