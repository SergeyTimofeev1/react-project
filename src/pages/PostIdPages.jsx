import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/loader/Loader';

const PostIdPages = () => {

  const params = useParams()
  const [post, setPost] = useState({});
  const [comments, setComents] = useState([]);

  const [fetchPostById, isloading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })
  const [fetchCommentsById, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsById(id)
    setComents(response.data)
  })

  useEffect(() => {
    fetchPostById(params.id)
    fetchCommentsById(params.id)
  }, []);

  return (
    <div>
      <h1>Пост № {params.id}</h1>
      {isloading
        ? <Loader />
        : <div>{post.id} {post.title}</div>
      }
      <h1>Комментарии:</h1>
      {isComLoading
        ? <Loader />
        : <div>
          {comments.map(com =>
            <div key={com.id} style={{ marginTop: '1rem' }}>
              <h5>{com.email}</h5>
              <div>{com.body}</div>
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default PostIdPages;
