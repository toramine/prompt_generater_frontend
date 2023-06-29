import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router';
import styles from './Create.module.css'


const uploadUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;

// データを入力してPOSTメソッドて送る
const Create = ({url}) => {

  const [type, setType] = useState('text2img')
  const [cluster, setCluster] = useState('')
  const [prompt, setPrompt] = useState('')
  // const [img, setImg] = useState('')
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('')
  const [nsfw, setNsfw] = useState(false)


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    if (name === 'type') {
      setType(value)
    }  else if (name === 'cluster') {
      setCluster(value)
    } else if (name === 'prompt') {
      setPrompt(value)
    }  else if (name === 'description') {
      setDescription(value)
    } else if (name === 'nsfw') {
      setNsfw(checked)
    }

    // else if (name === 'img') {
    //   setImg(value)
    // }
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target;

    // 送信するデータ
    const data = {
      "type":form.elements.type.value,
      "cluster":form.elements.cluster.value,
      "prompt":form.elements.prompt.value,
      // "img":form.elements.img.value,
      "img": "",
      "description":form.elements.description.value,
      "nsfw":form.elements.nsfw.checked ? 1:0
    }

    if (file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);

      try {
        await axios.post(uploadUrl, formData);
      } catch (err) {
        console.log(err)
      }

      data.img = filename
    }

    console.log(data)


    // フォームの送信処理を記述する
    axios.post(`${url}/create`, data)
    .then(res => {
      console.log(res.data)
      Router.replace('/crud/read');
    })
    .catch(error => {
      console.log(error)
    })
  }


  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <p>タイプ（etc... text2img）</p>
          <input type="text" name="type" value={type} onChange={handleChange} required />
          <p>グループ分け（etc... hair, background）</p>
          <input type="text" name="cluster" value={cluster} onChange={handleChange} required />
          <p>入力プロンプト（etc... smile, long hair）</p>
          <input type="text" name="prompt" value={prompt} onChange={handleChange} required />
          <p>画像アップロード</p>
          <input type="file" accept=".png, .jpeg, .jpg" onChange={(e)=> setFile(e.target.files[0])} />
          {/* <input type="text" name="img" value={img} onChange={handleChange} /> */}
          <p>説明、詳細（etc... 普通の笑顔, 長い髪）</p>
          <input type="text" name="description" value={description} onChange={handleChange} />
          <p>nsfw（not safe for work ）</p>
          <input type="checkbox" name="nsfw" checked={nsfw} onChange={handleChange} />
          <div>
            <button type="submit">作成</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Create
