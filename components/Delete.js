import axios from 'axios';
import Router from 'next/router';


const text2imgUrl = process.env.NEXT_PUBLIC_TEXT2IMG_URL;


function Delete({ id }) {
  const handleClick = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(id);
    }
  };

  const deleteItem = async (id) => {

    try {
      await axios.get(`${text2imgUrl}/image/${id}`);
      console.log('image delete');
      await axios.delete(`${text2imgUrl}/delete/${id}`);
      console.log('id data delete');
      Router.replace('/crud/read');
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <button type="button" onClick={handleClick}>
      削除
    </button>
  );
}

export default Delete;
