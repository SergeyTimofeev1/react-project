import { useRef, useState } from "react";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import './styles/app.css'
import MyButton from './components/UI/button/MyButton';
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";


function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'Js', body: 'Lorem ipsum dolor sit amet.'},
    {id: 2, title: 'Ts', body: 'Lorem ipsum dolor sit amet.'},
    {id: 3, title: 'Css', body: 'Lorem ipsum dolor sit amet.'},
  ]);
  

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

    
  return (
    <div className="App">
      <PostForm create={createPost}/>
      <PostList remove={removePost} posts={posts} title={'post list 1'}/>
     </div>
  );
}

export default App;

