import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji ={
    thumpsUp: '👍',
    heart: '❤️',
    wow: '😮',
    happy: '😄',
    sad:'😔'
}


const ReactionButton = ({post}) => {
    const dispatch = useDispatch()
    const reactionButton = Object.entries(reactionEmoji).map(([name, emoji])=>{
        const onReactClick =()=>dispatch(reactionAdded({postId: post.id, reaction: name}))
        return (
            <button
            key={name}
            type="button"
            className="reactionButton"
            onClick={onReactClick}
            >{emoji} {post.reactions[name]}</button>
          )

    })
    return <span>{reactionButton}</span>
 
}

export default ReactionButton