import PostAuthor from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostsExcerpt = ({postId}) => {
  const post = useSelector(state => selectPostById(state, postId))
  return (
    <article>
    <h4>{post.title}</h4>
    <p className ="excerpt">{post.body.substring(0,75)}...</p>
    <p className="postCredit">
      <Link to ={`post/${post.id}`}>View Post </Link>
        <PostAuthor userId={post.userId}/>
        <TimeAgo timeStamp={post.date}/>
    </p>
    <p><ReactionButton post ={post}/></p>
</article>
  )
}

export default PostsExcerpt