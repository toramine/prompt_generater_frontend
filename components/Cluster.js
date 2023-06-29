import styles from './Cluster.module.css'
import { useState, useEffect } from 'react'

function Cluster({data, selectCluster}) {

  const [cluster, setCluster] = useState([])

  const handleClick = (clickItem) => {
    selectCluster(clickItem);
  }

  useEffect(() => {
    const uniqueData = [...new Set(data.map(item => item.cluster))];
    setCluster(uniqueData);
    return () => {

    }
  }, []);


  return (
    <>
      <div class={styles.container}>
        <div class={styles.wrapper}>
          <h3 class={styles.h3}>グループを選択</h3>
          <div class={styles.items}>
            <div class={styles.item}>
              {cluster.map((item, index) => (
                  <button key={item.id} class={styles.button} onClick={() => handleClick(item)}>
                    {item}
                  </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cluster;
