import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthentication } from "../../../actions/authAction";
import { logOut } from "../../../actions/authAction";
import "./Nav.scss";
import { getChannelInfo } from "../../../actions/videoAction";

//Material UI
import Paper from '@mui/material/Paper';
import { Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
const Nav = () => {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredchannels, setFilteredChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch]);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm) {
      const filtered = users.data.filter((user) =>
        user?.channelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.aboutChannel.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredChannels(filtered);
    } else {
      setFilteredChannels(users.data);
    }
  };
  const openModal = (channel) => {
    setFilteredChannels('');
    setSelectedChannel(channel);
    setSearchTerm('');
    setIsModalOpen(true);
    // setOpen(true);
  };

  const handleLoginChannel = (id) => {
    dispatch(getChannelInfo(id))
    navigate("/channelbox")
    setIsModalOpen(false);
  };

  const logOutPage = () => {
    dispatch(logOut());
  };

  return (
    <header className="navbar">
      <div
        className="navbar-brand"
        onClick={() => {
          navigate("/");
        }}
      >
        <h2 className="logo">
          <i className="fa fa-asterisk"></i>&nbsp;
          <span className="nav-text">SNOWBUNS</span>
        </h2>
      </div>

      <nav className={`navigation ${isMobile ? "active" : ""}`}>
        <Link to="/" className="nav-item">
          {/* <FaHome className="nav-icon" /> */}
          <span className="nav-text">Home</span>
        </Link>
        <Link to="/premium" className="nav-item">
          {/* <FaCrown className="nav-icon" /> */}
          <span className="nav-text">Premium</span>
        </Link>
        <Link to="/donations" className="nav-item">
          {/* <FaHeart className="nav-icon" /> */}
          <span className="nav-text">Donations</span>
        </Link>
        <Link to="/subscriptions" className="nav-item">
          {/* <MdSubscriptions className="nav-icon" /> */}
          <span className="nav-text">Subscriptions</span>
        </Link>
      </nav>
      {token &&
        <div className="search-bar">
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 300,
              backgroundColor: '#2f3136', // Dark background similar to Discord
              borderRadius: '8px', // Rounded corners
              border: '1px solid #40444b', // Subtle border
              '&:hover': {
                backgroundColor: '#36393f', // Slightly lighter on hover
              },
              '&:focus-within': {
                borderColor: '#7289da', // Highlight border on focus
              },
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: 'white' }}
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Channels..."
            />
            <IconButton type="button" sx={{ p: '10px', color: '#b9bbbe' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>

          {/* channel-list style */}

          {filteredchannels.length > 0 && (
            <ul className="channel-list">
              {filteredchannels.map(channel => (
                <li key={channel.id} onClick={() => openModal(channel)}>
                  {channel.channelName}
                </li>
              ))}
            </ul>
          )}
        </div>
      }

      {/* Modal */}
      {isModalOpen && selectedChannel && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={`data:image/png;base64, ${selectedChannel.bannerImage}`}
              alt={selectedChannel.channelName}
              style={{ position: "relative", borderRadius: "10%" }}
              width={250}
              height={100}
            />
            <hr />
            <Card sx={{ maxWidth: 345, margin: '16px', backgroundColor: '#2f3136', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ color: '#dcddde', fontWeight: 'bold' }}>
                  {selectedChannel.channelName}
                </Typography>
                <Typography variant="body2" sx={{ color: '#b9bbbe', marginTop: '8px' }}>
                  {selectedChannel.aboutChannel}
                </Typography>
              </CardContent>
            </Card>
            <div className="button-container">
              <Button variant="contained" onClick={() => handleLoginChannel(selectedChannel._id)}>Join</Button>
              <Button variant="contained" onClick={() => setIsModalOpen(false)} >Close</Button>
            </div>
          </div>
        </div>
      )}

      <div className="auth-nav">
        {!isAuthenticated ? (
          <Link to="/login" className="login-button">
            <FaUserCircle className="nav-icon" />
            <span className="nav-text">Login</span>
          </Link>
        ) : (
          <Link to="/" className="login-button" onClick={logOutPage}>
            <FaSignOutAlt className="nav-icon" />
            <span className="nav-text">LogOut</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Nav;
