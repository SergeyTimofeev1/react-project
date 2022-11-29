import { useState, useEffect, useRef } from "react";
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
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()

  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
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
      <MySelect
        value={limit}
        onChange={(value) => { setLimit(value) }}
        defaultValue='Кол-во элементов на странице'
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Показать все' }
        ]}
      >

      </MySelect>
      {postError &&
        <h1>Произошла ошибка {postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'post list 1'} />
      <div ref={lastElement} ></div>
      {isPostLoading &&
        <Loader />
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

