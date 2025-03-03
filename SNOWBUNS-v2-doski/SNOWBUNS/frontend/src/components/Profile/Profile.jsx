import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getChannelInfo, uploadVideo } from "../../actions/videoAction";
import "./Profile.scss";
import Review from "../channel/Review";

const Profile = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");
  
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    dispatch(uploadVideo(formData));
  };
  
  useEffect(() => {
    dispatch(()=>getChannelInfo(id))
  }, [dispatch, id]);

  return (
    <div className="main-container">
      {/* Upload Content Section */}
      <div className="section upload-content">
        <h2>Upload Content</h2>
        <form onSubmit={handleUploadSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={data.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            placeholder="Description"
            name="description"
            value={data.description}
            onChange={handleInputChange}
            required
          />
          <div className="form-group">
            <label htmlFor="video" className="upload-label">
              <span>Select Video</span>
              <input
                type="file"
                id="video"
                accept="video/*"
                required
                onChange={handleVideoChange}
              />
            </label>
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>

      {/* Channel Preview Section */}
      <Review />
    </div>
  );
};

export default Profile;
