import Update from '../../../components/Update'
import Delete from '../../../components/Delete'
import axios from 'axios';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';


const text2imgUrl = process.env.NEXT_PUBLIC_TEXT2IMG_URL;


Edit.getInitialProps = async (context) => {
  const { id } = context.query;
  const response = await axios.get(`${text2imgUrl}/${id}`);
  const data = response.data;
  console.log(data)
  return { data };
};


function Edit({data}) {

  return (
    <>
      <Head>
        <title>prompt edit</title>
        <meta name="description" content="prompt edit page" />
      </Head>
      <div>
        <div>Edit Page</div>
        {data.id}
        <Update data={data} />
        <Delete id={data.id} />
        <Link href="/crud/read">
          <div>一覧ページへ</div>
        </Link>

      </div>
    </>
  );
}

export default Edit;
