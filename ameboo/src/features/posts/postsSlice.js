import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import {sub} from 'date-fns'
import axios from 'axios'

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'


const postsAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})
const initialState= postsAdapter.getInitialState({
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
    const response = await axios.get(POST_URL)
    return response.data
})


export const addNewPost = createAsyncThunk('posts/addNewPosts', async (initialPost)=>{
    const response = await axios.post(POST_URL, initialPost)
    return response.data
})

export const updatePost = createAsyncThunk('posts/update', async(initialPost) =>{
    const {id} = initialPost;
    try {
        const response = await axios.put(`${POST_URL}/${id}`, initialPost)
        return response.data
    } catch (error) {
        // return error.message
        return initialPost //only for testing redux
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) =>{
    const {id} = initialPost
    try {
        const response = await axios.delete(`${POST_URL}/${id}`)
        if(response?.status === 200) return initialPost
        return `${response?.status}: ${response?.statusText}`
    } catch (error) {
        return error.message
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        reactionAdded(state, action){
            const {postId, reaction} = action.payload
            const existingPost = state.entities[postId]
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },
  
    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, (state, action)=>{
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) =>{
                state.status = 'succeeded'
                //adding date and reaction
                let min =1;
                const loadedPosts = action.payload.map(post =>{
                    post.date = sub(new Date(), {minutes: min++}).toISOString()
                    post.reactions ={
                        thumpsUp: 0,
                        heart: 0,
                        wow: 0,
                        happy: 0,
                        sad:0
                    }
                    return post
                })
                // state.posts = state.posts.concat(loadedPosts)
                // state.posts = loadedPosts
                postsAdapter.upsertMany(state, loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) =>{
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action)=>{


                
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions ={
                    thumpsUp: 0,
                    heart: 0,
                    wow: 0,
                    happy: 0,
                    sad:0
                }
                postsAdapter.addOne(state,action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action)=>{
                if(!action.payload?.id){
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return
                }
                // const {id} =action.payload
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                // const posts = state.posts.filter(post => post.id !==id)
                // state.posts = [...posts, action.payload]
                postsAdapter.upsertOne(state, action.payload)
            })
            .addCase(deletePost.fulfilled, (state,action)=>{
                if(!action.payload?.id){
                    console.log('Could not complete delete')
                    console.log(action.payload)
                    return
                }
                const {id} = action.payload
                // const posts = state.posts.filter(post => post.id !== id)
                // state.posts =posts
                postsAdapter.removeOne(state, id)
            })
    }
})
// export const selectAllPosts = (state) => state.posts.posts

// getSelectors creates his selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)


export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error

// export const selectPostById = (state, postId)=> state.posts.posts.find(post =>post.id === postId)

export const selectPostByUser = createSelector(
    [selectAllPosts, (state, userId) =>userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)


export const {increaseCount, reactionAdded} = postsSlice.actions


export default postsSlice.reducer