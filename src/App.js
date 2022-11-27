import { useMemo, useRef, useState } from "react";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import './styles/app.css'
import MyButton from './components/UI/button/MyButton';
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from './components/UI/select/MySelect';
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import { usePosts } from "./hooks/usePosts";


function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'Js', body: 'A.Lorem ipsum dolor sit amet.'},
    {id: 2, title: 'Ts', body: 'B.Lorem ipsum dolor sit amet.'},
    {id: 3, title: 'Css', body: 'C.Lorem ipsum dolor sit amet.'},
  ]);

  const [filter, setFilter] = useState({sort: '', query:''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts,filter.sort,filter.query)

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'post list 1'}/>
     </div>
  );
}

export default App;

