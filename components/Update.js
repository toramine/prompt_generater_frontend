import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router';


const text2imgUrl = process.env.NEXT_PUBLIC_TEXT2IMG_URL;
const uploadUrl = process.env.NEXT_PUBLIC_UPLOAD_URL;


// データを入力してPUTメソッドて送る
const Update = ({data}) => {

  const [type, setType] = useState(data.type)
  const [cluster, setCluster] = useState(data.cluster)
  const [prompt, setPrompt] = useState(data.prompt)
  // const [img, setImg] = useState(data.img)
  const [description, setDescription] = useState(data.description)
  const [nsfw, setNsfw] = useState(data.nsfw==1 ? true:false)
  const [file, setFile] = useState(data.img);
  const [newFile, setNewFile] = useState(false);


  const fileChange = (e) => {
    setFile(e.target.files[0])
    setNewFile(true)
  }
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    if (name === 'type') {
      setType(value)
    }  else if (name === 'cluster') {
      setCluster(value)
    } else if (name === 'prompt') {
      setPrompt(value)
    } else if (name === 'description') {
      setDescription(value)
    } else if (name === 'nsfw') {
      setNsfw(checked)
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("start");
    const form = event.target;


    // 送信するデータ
    const form_data = {
      "type":form.elements.type.value,
      "cluster":form.elements.cluster.value,
      "prompt":form.elements.prompt.value,
      "img": data.img ? data.img : "",
      "description":form.elements.description.value,
      "nsfw":form.elements.nsfw.checked ? 1:0
    }
    console.log(form_data);

    if (newFile) {
      await axios.get(`${text2imgUrl}/image/${data.id}`);
      console.log('image delete');
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);

      try {
        await axios.get(`${text2imgUrl}/image/${data.id}`);
        console.log('image delete');
        await axios.post(uploadUrl, formData);
      } catch (err) {
        console.log(err)
      }

      form_data.img = filename
    }

    // フォームの送信処理を記述する
    console.log(data.id)
    axios.put(`${text2imgUrl}/update/${data.id}`, form_data)
    .then(res => {
      console.log(res.data)
      Router.replace('/crud/read');
    })
    .catch(error => {
      console.log(error)
    })
  }

  console.log(data.img)
  return (
    <form onSubmit={handleSubmit}>
      <p>タイプ（etc... text2img）</p>
      <input type="text" name="type" value={type} onChange={handleChange} required />
      <p>グループ分け（etc... hair, background）</p>
      <input type="text" name="cluster" value={cluster} onChange={handleChange} required />
      <p>入力プロンプト（etc... smile, long hair）</p>
      <input type="text" name="prompt" value={prompt} onChange={handleChange} required />
      <p>画像アップロード</p>
      <p>{data.img}</p>
      <input type="file" id="file" accept=".png, .jpeg, .jpg" onChange={fileChange} />
      {/* <input type="text" name="img" value={img} onChange={handleChange} /> */}
      <p>説明、詳細（etc... 普通の笑顔, 長い髪）</p>
      <input type="text" name="description" value={description} onChange={handleChange} />
      <p>nsfw（not safe for work ）</p>
      <input type="checkbox" name="nsfw" checked={nsfw} onChange={handleChange} />
      <div>
        <button type="submit">編集</button>
      </div>
    </form>

  )
}

export default Update
