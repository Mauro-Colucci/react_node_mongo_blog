import './post.css'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  const PF = "http://localhost:5000/uploads/"
  return (
    <div className='post'>
      {post.photo && (
        <img className='postImage' src={PF + post.photo} alt={post.title} />
      )}      
        <div className="postInfo">
            <div className="postCats">
              {post.categories.map((c,i)=>(
                //check the category here, since c = post.categories and is not from the categories model
                <span key={c+i} className='postCat'>{c}</span>
              ))}
            </div>
            <Link to= {`/post/${post._id}`} className='link'>
              <span className="postTitle">
                {post.title}
              </span>
            </Link>
            <hr/>
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="postDesc">{post.desc}</p>
   
    </div>
  )
}

export default Post