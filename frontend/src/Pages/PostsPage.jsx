import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PostCard from '../Components/PostCard';
// import FavCard from '../Components/PostCard';

export default function PostsPage() {
  const [ posts, setPosts ] = useState([]);
  const [ currUser, setCurrUser ] = useState({});
  const [ bulkAddButton, setBulkAddButton ] = useState(true);
  const { id } = useParams();

  const handleAddToDB = (e) => {
    setBulkAddButton(false);
    e.preventDefault();
    for(let i=0; i<posts.length; i++) {
      axios.post(`http://localhost:8080/posts/add`, posts[i])
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  }
  const fetchFunc = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(res => {
        // console.log(res);
        setPosts(res.data) ;
      })
      .catch(err => console.log(err))
  };
  const fetchUserFunc = () => {
    axios.get(`http://localhost:8080/users/${id}`)
      .then(res => {
        // console.log(res);
        setCurrUser(res.data.User[0]) ;
      })
      .catch(err => console.log(err))
  };
  const fetchPostsOfUser = () => {
    axios.get(`http://localhost:8080/posts/${id}`)
      .then(res => {
        console.log(res);
        if(res.data.Posts.length === 0) {
          setBulkAddButton(true);
        } else {
          setBulkAddButton(false);
        }
      })
      .catch(err => console.log(err))
  };
  const handleDownloadExelFile = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/excel/${id}`, { responseType: 'blob' }) // Set responseType to 'blob'
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data])); // Create blob from response data
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Posts.xlsx'); // Set filename for the downloaded file
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => console.log(err))
    }

  useEffect(() => {
    fetchFunc();
    fetchUserFunc();
    fetchPostsOfUser();
  }, []);
  return (
    <>
    <h2>All Posts of user {id}</h2>
    {
      bulkAddButton && <button onClick={(e)=> handleAddToDB(e)}>Bulk Add</button>
    }
    {
      !bulkAddButton && <button onClick={(e)=> handleDownloadExelFile(e)}>Download in Excel Format</button>
    }
    <div className="d-flex justify-content-around flex-wrap gap-3 px-5 mt-5 mb-5">
      {
        posts?.map((item)=>{
          return <PostCard key={item.id} item={item} currUser={currUser} />
        })
      }
    </div>
    </>
  )
}
