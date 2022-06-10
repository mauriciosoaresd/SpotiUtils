import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../redux/actions/index"

import '../../assets/css/App.css'
import '../../assets/css/index.css';

import Navbar from '../../components/HomeComponents/Navbar/Navbar';
import LoginSetUser from '../../components/HomeComponents/LoginSetUser/LoginSetUser'
import Logout from '../../components/HomeComponents/Logout/Logout'
import LoginCard from '../../components/HomeComponents/LoginCard/LoginCard'
import CardsDiv from '../../components/HomeComponents/CardsDiv/CardsDiv'
import Footer from '../../components/UI/Footer/Footer'
import SpotifyStats from '../../components/StatsComponents/SpotifyStats/SpotifyStats'
import AutoScrollToTop from '../../components/UI/AutoScrollToTop/AutoScrollToTop'
import VideoPlayer from '../../components/UI/VideoPlayer/VideoPlayer'
import ConvertSelection from '../../components/ConversionComponents/ConvertSelection/ConvertSelection'
import PlaylistsPage from '../PlaylistsPage/PlaylistsPage'

// BOTTOM WHITE FIX 

function App() {
  const [ loading, setLoading ] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { getMyProfile } = bindActionCreators(actionCreators, dispatch)


  useEffect(() => {
    user.loggedIn && getMyProfile()
    setTimeout(() => setLoading(false), 5000);
  }, [])

  return (
    <div className="App">
      <Navbar />
      <main className="text-light" id="main">

        {user.loggedIn ?
          <></>
          :
          <>
            <LoginCard />
            <CardsDiv />
          </>
        }

        <AutoScrollToTop>
          <Routes>
            {user.loggedIn ?
              <>
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<CardsDiv />} />
                <Route path="/convert-playlists" element={<PlaylistsPage page={"conversion"} />} />
                <Route path="/random-playlists" element={<PlaylistsPage page={"random"} />} />
                <Route path="/convert-playlist/:id" element={<ConvertSelection />} />
                <Route path="/random-song/:id" element={user.selectedPlaylist != undefined ? <VideoPlayer /> : <Navigate to="/random-playlists" />} />
                <Route path="/converted-playlist-display" element={user.convertSongs != undefined ? <VideoPlayer /> : <Navigate to="/convert-playlists" />} />
                <Route path="/video-player" element={user.selectedSong != undefined ? < VideoPlayer /> : <Navigate to="/my-stats" />} />
                <Route path="/my-stats" element={<SpotifyStats />} />
              </>
              :
              <>
                <Route path="/auth/token/:token" element={<LoginSetUser />} />
              </>
            }
          </Routes>
        </AutoScrollToTop>
      </main>
      <Footer />
    </div>
  );
}

export default App;
