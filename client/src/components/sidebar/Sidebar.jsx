import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

const Sidebar = () => {
  const [cats, setCats] = useState([])
  useEffect (()=>{
    const getCats = async ()=>{
      const res = await axios.get('/categories')
      setCats(res.data)
    }
    getCats()
  },[])
  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
          <img src='https://images.unsplash.com/photo-1498568715259-5c1dc96aa8e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80' alt="profile"/>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae magnam voluptatem itaque impedit sequi</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebartList">
          {cats.map(c=>(
            <Link key={c._id} className='link' to={`/?cat=${c.name}`}>
             <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
     
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
            <i className="sidebarIcon fa-brands fa-square-facebook"></i>
            <i className="sidebarIcon fa-brands fa-square-twitter"></i>
            <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
            <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  )
}

export default Sidebar