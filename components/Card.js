import Link from 'next/link'
import styles from './Card.module.css'
import { useRouter } from 'next/router';


const PUBLIC_FORDER = process.env.NEXT_PUBLIC_PUBLIC_FORDER

const Card = ({prompts, item, handleSetPrompts, parent}) => {

  const router = useRouter();

  const handleAddData = () => {
    const newItem = { id: `item-${item.id}`, content: item.prompt, Emphasis: 0}
    // data配列にnewDataが含まれているかチェック
    const isDuplicate = prompts.some(item => item.id === newItem.id);
    if (!isDuplicate) {
      handleSetPrompts(
        [...prompts, newItem]
      );
    } else {
      console.log("Duplicate data: ", newItem);
      alert("すでに追加されています");
      // 別の処理
    }
    // console.log(newItem);
    // console.log([...prompts, newItem]);
  }

  return (
    <>
      <div class={styles.item_container}>
        <div class={styles.item_wrapper}>
          <div class={styles.card}>
            <div class={styles.img_container}>
              <img class={styles.card_img} src={item.img ? PUBLIC_FORDER + item.img : PUBLIC_FORDER + "noavatar.png"} />
              {/* <img class={styles.card_img} src="/noavatar.png" alt="" /> */}
            </div>
            <div class={styles.card_content}>
              <p class={styles.card_prompt}>{item.prompt}</p>
              <p class={styles.card_description}>{item.description}</p>
            </div>
          </div>
          <div class={styles.card_title}>
            {parent === "random" ? <div>{item.cluster}</div> : <></>}
            {router.pathname == "/generate" ?
              <button
              class={styles.card_edit_btn}
              type="button"
              onClick={() => handleAddData()}
              >
                追加
              </button>
              :
              <Link href="/crud/edit/[id]" as={`/crud/edit/${item.id}`}>
              <button class={styles.card_edit_btn}>編集</button>
              </Link>
            }

          </div>
        </div>
      </div>

    </>
  );
}

export default Card;
