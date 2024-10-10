import PostAuthor from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import ReactionButton from "./ReactionButton";

const PostsExcerpt = ({post}) => {
  return (
    <article>
    <h3>{post.title}</h3>
    <p>{post.body.substring(0,75)}</p>
    <p className="postCredit">
        <PostAuthor userId={post.userId}/>
        <TimeAgo timeStamp={post.date}/>
    </p>
    <p><ReactionButton post ={post}/></p>
</article>
  )
}

export default PostsExcerpt