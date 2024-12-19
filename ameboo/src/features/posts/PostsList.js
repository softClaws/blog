import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";


const PostsList = () => {
    const orderedPostIds = useSelector(selectPostIds)
    const postsStatus = useSelector(getPostsStatus)
    const postsError = useSelector(getPostsError)
    
    let content
    if(postsStatus === 'loading'){
        content = <p>"Loading ..." </p>
    }
    else if(postsStatus === 'succeeded'){
        // const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
        // content = orderedPosts.map(post => <PostsExcerpt key ={post.id} post = {post}/>)

        content = orderedPostIds.map(postId => <PostsExcerpt key ={postId} postId = {postId}/>)
    }else if(postsStatus === 'failed'){
        content = <p> {postsError}</p>
    }

  return (
    <>
    
        <section>
        <h3>Posts</h3>
                {content}
        </section>
   </>
  )
}

export default PostsList