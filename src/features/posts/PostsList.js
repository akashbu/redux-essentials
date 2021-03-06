import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import {selectAllPosts, fetchPosts, selectPostById} from './postsSlice'

let PostExcerpt = ({ postId }) => {
    const post = useSelector((state) => selectPostById(state, postId))
  
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <div>
          <PostAuthor userId={post.user} />
        </div>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <ReactionButtons post={post} />
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    )
  }

PostExcerpt=React.memo(PostExcerpt)

export const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)

    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(()=>{
        if(postStatus === 'idle'){
            dispatch(fetchPosts())
        }
    },[postStatus, dispatch])

    let content  

    if (postStatus === 'loading') {
        content = <div className="loader">Loading...</div>
      } else if (postStatus === 'succeeded') {
   
        content = posts.map(post => (
            <PostExcerpt key={post.id} postId={post.id} />
        ))

      } else if (postStatus === 'failed') {
        content = <div>{error}</div>
      }


    return (

        <section className='posts-list'>
            <h2>Posts</h2>
            {content}
        </section>
    )
}