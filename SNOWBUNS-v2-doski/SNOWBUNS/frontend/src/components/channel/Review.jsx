import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseNum } from "../../actions/videoAction";
import { useNavigate } from "react-router-dom";
// import './style.scss'
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
const Review = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userid = localStorage.getItem("id")
  const info = useSelector((state) => state.video.info);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [walletModal, setWalletModal] = useState(false);

  const openVideo = (id, url, user) => {
    console.log(user);
    dispatch(increaseNum(id));
    if (userid === user) setSelectedVideo(url);
    else setWalletModal(true);
  }
  const handlePayment = () => {
    navigate("/wallet")
  }
  return (
    <div className="main-container">
      <div className="channel-preview-section section">
        {walletModal ? (
          <div>
            <p>Would you like to proceed with payment?</p>
            <button onClick={handlePayment}>Ok</button>
            <button onClick={() => setWalletModal(false)}>Cancel</button>
          </div>
        ) : (<></>)}
        <h2>Channel View</h2>
        <div className="channel-preview">
          <div className="channel-header">
            <Card sx={{ display: 'flex', flexDirection: 'column', width: 450, margin: 'auto', borderRadius: 2 }}>
              <img
                src={`data:image/png;base64, ${info[0]?.user?.bannerImage}`}
                alt={info[0]?.user.channelName}
                style={{
                  position: "relative",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                }}
              />
              <CardContent sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#2f3136', wordBreak: 'break-word' }}>
                {/* Profile Picture */}
                <Avatar
                  alt={info[0]?.user.aboutChannel}
                  src={`data:image/png;base64, ${info[0]?.user?.profileImage}`}
                  sx={{ position: "relative", top: -60, width: 70, height: 70, marginRight: 2 }}
                />
                {/* Channel Details */}
                <Box>
                  <Typography variant="h6" sx={{ display: 'flex', marginLeft: -10, marginTop: 5, color: '#f1f1f1' }}>
                    {info[0]?.user?.channelName}
                  </Typography>
                  {/* Channel Description */}
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: "center", marginLeft: -10, color: '#cacaca' }}>
                    {info[0]?.user.aboutChannel}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </div>
          <div className="channel-videos">
            {info?.length > 0 ? (
              info.map((item, index) => {
                return (
                  <div key={index} onClick={() => openVideo(item._id, item.url, item.user._id)} className="video-card" >
                    <div className="info">
                      <div className="thumbnail">
                        <h3>{item.title}</h3>
                        <img
                          src={`data:image/png;base64, ${item.thumbnail}`}
                          alt={item.description}
                          style={{ position: "relative", borderRadius: '20px' }}
                        />
                      </div>
                      <p>{item.views} views | {item.createdAt.slice(0, 10)}</p>
                    </div>
                  </div>
                )
              })
            ) : (
              <></>
            )}
          </div>
          {selectedVideo && (
            <div className="modal" onClick={() => setSelectedVideo(null)}>
              <div className="modal-content">
                <video controls muted>
                  <source src={selectedVideo} type="video/mp4" />
                  <track src="subtitles.vtt" kind="captions" label="English" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
