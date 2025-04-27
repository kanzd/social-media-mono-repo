import React, { useState, useRef } from 'react'
import './PostShare.css';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction';



const PostShare = () => {

    const loading = useSelector((state) => state.postReducer.uploading)
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const [video, setVideo] = useState(null);
    const imageRef = useRef();
    const videoRef = useRef();
    const dispatch = useDispatch();
    const desc = useRef();
    const { user } = useSelector((state) => state.authReducer.authData);
    const serverPublic = 'https://social-media-mono-repo.onrender.com/images/';


    const onImageChange = (event) => {
        event.preventDefault()
        // debugger;
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImageName(img.name)
            setImage(img);
        }
    }
    const onVideoChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let vid = event.target.files[0];
            setVideo(vid);
        }
    };



    const reset = () => {
        setImage(null);
        setVideo(null);
        imageRef.current.value=''
        videoRef.current.value=''
        desc.current.value = ""
        
    }




    const handleSubmit = (e) => {
        e.preventDefault();

        // const newPost = {
        //     userId: user._id,
        //     desc: desc.current.value,
        // }
        const data = new FormData();
        data.append("userId", user._id);
        data.append("desc", desc.current.value);
        if (image) {
            
            const filename = Date.now() + image.name;
            data.append("name", filename);
            data.append("file", image);
            data.append("type", 'image');
            

            // newPost.image = filename;

            // try {
            //     dispatch(uploadImage(data))
            // } catch (error) {
            //     console.log(error)
            // }
        }
        if (video) {
            const filename = Date.now() + video.name;
            data.append("name", filename);
            data.append("file", video);
            data.append("type", 'video');
            // newPost.video = filename;

            // try {
            //     dispatch(uploadImage(data));
            // } catch (error) {
            //     console.log(error);
            // }
        }
        dispatch(uploadPost(data))
        reset()
    }

    return (
        <div className="PostShare">
            <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} alt="" />

            <div>
                <input type="text" placeholder='Write a caption...' required ref={desc} />

                <div className="postOptions">

                    <div className="option" 
                        onClick={() => imageRef.current.click()}
                    >
                        <PhotoOutlinedIcon />
                        Photo
                    </div>

                    <div className="option" onClick={() => videoRef.current.click()} >
                        <PlayCircleOutlineIcon />
                        Video
                    </div>
                    {/* <div className="option" style={{ color: "var(--location)" }}>
                        <LocationOnOutlinedIcon />
                        Location
                    </div>
                    <div className="option" style={{ color: "var(--shedule)" }}>
                        <CalendarMonthOutlinedIcon />
                        Shedule
                    </div> */}

                    <button style={{height: '50px',width:'120px'}} className='button ps-button' onClick={handleSubmit} disabled={loading}>
                        {loading ? "uploading..." : "Share"}
                    </button>

                    <div style={{ display: "none" }}>
                        <input
                            type="file"
                            name='myImage'
                            // value={imageName}
                            ref={imageRef}
                            onChange={onImageChange}
                        />
                          <input type="file" name="myVideo"  ref={videoRef} onChange={onVideoChange} />
                    </div>
                </div>


                {image && (
                    <div className="previewImage">
                        <CloseOutlinedIcon onClick={() => {setImage(null)

                             imageRef.current.value=''
                        }} />
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                )}
 {video && (
                    <div className="previewVideo">
                        <CloseOutlinedIcon onClick={() => setVideo(null)} />
                        <video controls>
                            <source src={URL.createObjectURL(video)} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostShare
