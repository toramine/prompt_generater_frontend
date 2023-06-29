import React from 'react'
import Link from 'next/link'
import styles from './Topbar.module.css'

const TopBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <Link href="/">
      <div className={styles.text}>トップページへ</div>
      </Link>
      </div>
    </div>
  )
}

export default TopBar
