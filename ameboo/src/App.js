import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { EditPost } from "./features/posts/EditPost";
import UserPage from "./features/users/UserPage";
import UsersList from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<Layout/>}>
        <Route index element ={<PostsList/>}/>
        <Route path ="post">
          <Route index element = {<AddPostForm/>}/>
          <Route path =":postId" element ={<SinglePostPage/>}/>
          <Route path ="edit/:postId" element ={<EditPost/>}/>
        </Route>
        <Route path = "user">
          <Route index element ={<UsersList/>}/>
          <Route path = ":userId" element ={<UserPage/>}/>
        </Route>

        <Route path ="*" element = {<Navigate to ="/" replace/>}/>
      </Route>
    </Routes>
  //  <main className="App">
  //   <AddPostForm/>
  //   <PostsList/>
  //  </main>
  );
}

export default App;
