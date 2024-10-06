import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import ReactionButton from "./ReactionButton";

const PostsList = () => {
    const posts = useSelector(selectAllPosts)
    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post =>(
        <article key = {post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0,75)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId}/>
                <TimeAgo timeStamp={post.date}/>
            </p>
            <p><ReactionButton post ={post}/></p>
        </article>
    ))

  return (
    <>
    
        <section>
        <h2>Posts</h2>
                {renderedPosts}
        </section>
   </>
  )
}

export default PostsList