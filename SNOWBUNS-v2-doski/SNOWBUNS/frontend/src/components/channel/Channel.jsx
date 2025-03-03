import React, { useEffect, useState } from "react";
import Review from "./Review";
import "./Channel.scss";
import { useDispatch, useSelector } from "react-redux";
import { getChannelInfo } from "../../actions/videoAction";
import { channelUpdate } from "../../actions/authAction";

const Channel = () => {
  const info = useSelector((state) => state.video.info);
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();
  const [data, setData] = useState({
    channelName: info[0]?.user?.channelName,
    aboutChannel: info[0]?.user?.aboutChannel,
    subscriptionPrice: "",
    subscriptionType: "monthly",
    country: "Hong Kong",
  });
  const [bannerImage, setBannerImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if(e.target.id==="banner-upload") setBannerImage(file);
    if(e.target.id==="profile-upload") setProfileImage(file);
  };

  const handleCustomizeSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bannerImage", bannerImage);
    formData.append("profileImage", profileImage);
    formData.append("channelName", data?.channelName);
    formData.append("aboutChannel", data?.aboutChannel);
    formData.append("subscriptionPrice", data?.subscriptionPrice);
    formData.append("subscriptionType", data?.subscriptionType);
    formData.append("country", data?.country);
    dispatch(channelUpdate(formData))
    console.log(formData);
  };

  useEffect(() => {
    dispatch(getChannelInfo(id));
  }, [dispatch, id]);
 
  return (
    <div className="main-container">
      <div className="section customize-channel">
        <h2>My Channel</h2>
        <form onSubmit={handleCustomizeSubmit}>
          <label htmlFor="banner-upload" className="banner-label">
            Upload Banner
          </label>
          <input
            type="file"
            id="banner-upload"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "bannerImage")}
          />

          <label htmlFor="profile-upload" className="profile-label">
            Profile Picture
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "profileImage")}
          />

          <input
            type="text"
            placeholder="Channel Name"
            name="channelName"
            value={data.channelName}
            onChange={handleInputChange}
            required
          />
          <textarea
            placeholder="About Your Channel"
            name="aboutChannel"
            value={data.aboutChannel}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="subscription-price">Subscription Price</label>
          <input
            type="number"
            id="subscription-price"
            name="subscriptionPrice"
            value={data.subscriptionPrice}
            onChange={handleInputChange}
            placeholder="Enter price"
            min="1"
            step="0.01"
            required
          />

          <label htmlFor="subscription-type">Subscription Type</label>
          <select
            id="subscription-type"
            name="subscriptionType"
            value={data.subscriptionType}
            onChange={handleInputChange}
            required
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>

          <label htmlFor="country">Select Country</label>
          <select
            id="country"
            name="country"
            value={data.country}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select your country
            </option>
            {/* Add country options here */}
          </select>

          <button type="submit">Save</button>
        </form>
      </div>
      <Review />
    </div>
  );
};

export default Channel;
