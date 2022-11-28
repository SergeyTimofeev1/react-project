import { useState, useEffect } from "react";
import PostList from "../components/PostList";
import '../styles/app.css'
import MyButton from '../components/UI/button/MyButton';
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import { usePosts } from "../hooks/usePosts";
import PostService from '../API/PostService';
import Loader from "../components/UI/loader/Loader";
import { useFetching } from '../hooks/useFetching';
import { getPagesCount } from '../utils/pages';
import Pagination from "../components/UI/pagination/pagination";

function Posts() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)


  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount, limit))
  })

  console.log(totalPages);

  useEffect(() => {
    fetchPosts(limit, page)
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
      <button onClick={fetchPosts}>Get posts</button>
      <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError &&
        <h1>Произошла ошибка {postError}</h1>
      }
      {isPostLoading
        ? <Loader />
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'post list 1'} />
      }
      <Pagination
        page={page}
        totalPages={totalPages}
        changePage={changePage}
      />
    </div>
  );
}

export default Posts;

