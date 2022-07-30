import { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import axios from 'axios'
import './settings.css'
import { UpdateFailure, UpdateStart, UpdateSuccess } from '../../context/Actions'

const Settings = () => {
    const { user, dispatch } = useContext(Context)
    const [file, setFile] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [passoword, setPassword] = useState("")
    const PF = "http://localhost:5000/uploads/"


    const handleSubmit = async(e) =>{
        e.preventDefault()
        dispatch(UpdateStart())
        const updatedUser = {
            userId: user._id,
            username, 
            email, 
            passoword
        }
        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append('name', filename)
            data.append('file', file)
            updatedUser.profilePicture = filename
            try {
                await axios.post('/upload', data)
            } catch (error) {}
        }        
        try {
            const res = await axios.put(`/users/${user._id}`, updatedUser)
            setSuccess(true)
            dispatch(UpdateSuccess(res.data))
        } catch (error) {
            dispatch(UpdateFailure())
        }
    }

  return (
    <div className="settings">
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update your Account</span>
                <span className="settingsDeleteTitle">Delete Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
                <label>Profile Picture</label>
                <div className="settingsPP">
                    <img src={file ? URL.createObjectURL(file) : PF + user.profilePicture} alt="profile" />
                    <label htmlFor="fileInput">
                    <i className="settingsPPIcon fa-solid fa-circle-user"></i>
                    </label>
                    <input type="file" id='fileInput' style={{display:"none"}} onChange={(e)=> setFile(e.target.files[0])}/>
                </div>
                <label>Username</label>
                <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)}/>
                <label>Email</label>
                <input type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" onChange={e=>setPassword(e.target.value)}/>
                <button className="settingsSubmit" type='submit'>Update</button>
                {success && <span className='settingsSuccess'>Profile has been updated</span>}
            </form>
        </div>
        <Sidebar/>
    </div>
  )
}

export default Settings