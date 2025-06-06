import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { uploadImage } from '../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';




function ProfileModal({ modalOpened, setModalOpened, data }) {

  const theme = useMantineTheme();

  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    // let UserData = formData;
    const data = new FormData();
    // const fileName = Date.now() + coverImage.name;
    
    data.append("password", password);
    Object.keys(formData).forEach((value,index)=>{
      data.append(value,formData[value])
    })
    // data.append("_id", formData._id);
    // let files = {}
    if (profileImage) {
      data.append('profilePicture',profileImage)
      // files.profilePicture = 
      // UserData.profilePicture = fileName;

      // try {
      //   dispatch(uploadImage(data))
      // } catch (error) {
      //   console.log(error);
      // }
    }
    if (coverImage) {
      data.append('coverPicture',coverImage)
      // files.coverPicture = coverImage
     
      // UserData.coverPicture = fileName;

      // try {
      //   dispatch(uploadImage(data))
      // } catch (error) {
      //   console.log(error);
      // }
    }

    // data.append("files", files);
    dispatch(updateUser(param.id, data));
    setModalOpened(false);
  }



  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="55%"
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >


        <form className='infoForm' >

          <h3>Update Your info</h3>

          <div>
            <input type="text" placeholder='Name' className='infoInput' name="name"
              onChange={handleChange} value={formData.name} />
          </div>

          <div>
            <input type="text" placeholder='Works At' className='infoInput' name="worksAt"
              onChange={handleChange} value={formData.worksAt} />
          </div>

          <div>
            <input type="text" placeholder='Lives in' className='infoInput' name="livesin"
              onChange={handleChange} value={formData.livesin} />
            <input type="text" placeholder='Country' className='infoInput' name="country"
              onChange={handleChange} value={formData.country} />
          </div>

          <div>
            <input type="text" placeholder='RelationShip Status' className='infoInput' name="relationship"
              onChange={handleChange} value={formData.relationship} />
          </div>

          <div>
            <h5>Profile Image</h5>
            <input type="file" name='profileImage' onChange={onImageChange} />
            <h5>Cover Image</h5>
            <input type="file" name='coverImage' onChange={onImageChange} />
          </div>

          <button className='button infoButton' onClick={handleSubmit}>Update</button>
        </form>


      </Modal>

    </>
  );
}


export default ProfileModal