import React, { useEffect } from 'react'
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
import ScrollButton from '../../components/UI/ScrollButton/ScrollButton'
import SelectPlaylist from '../../components/RandomSongComponents/SelectPlaylist/SelectPlaylist'
import SpotifyStats from '../../components/StatsComponents/SpotifyStats/SpotifyStats'
import AutoScrollToTop from '../../components/UI/AutoScrollToTop/AutoScrollToTop'
import VideoPlayer from '../../components/UI/VideoPlayer/VideoPlayer'
import ConvertPlaylist from '../../components/ConversionComponents/ConvertPlaylist/ConvertPlaylist';
import ConvertSelection from '../../components/ConversionComponents/ConvertSelection/ConvertSelection';
import BackButton from '../../components/UI/BackButton/BackButton'

function App() {
  const user = useSelector((state) => state.user);


  const dispatch = useDispatch();
  const { getMyProfile } = bindActionCreators(actionCreators, dispatch)

  // cleanup ao sair do stats*, videoplayer*, randomsong <- só da um bizu
  // botão back <-
  // CSS BE(m não)

  useEffect(() => {
    user.loggedIn && getMyProfile()
  }, [])


  return (
    <div className="App">
      <Navbar />
      <BackButton />
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
                {/* trocar camelcase por hifen */}
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<CardsDiv />} />
                <Route path="/playlistSelect" element={<SelectPlaylist />} />
                <Route path="/convert-playlist" element={<ConvertPlaylist />} />
                <Route path="/convert-playlist/:id" element={<ConvertSelection />}/>
                <Route path="/randomSong/:id" element={user.selectedPlaylist != undefined ? <VideoPlayer /> : <Navigate to="/playlistSelect" />} />
                <Route path="/converted-playlist-display" element={user.convertSongs != undefined ? <VideoPlayer/> : <Navigate to="/convert-playlist"/>}/>


                <Route path="/videoplayer" element={user.selectedSong != undefined ? < VideoPlayer /> : <Navigate to="/mystats"/>} />
                <Route path="/mystats" element={<SpotifyStats />} />
              </>
              :
              <>
                <Route path="/auth/token/:token" element={<LoginSetUser />} />
              </>
            }
          </Routes>
        </AutoScrollToTop>
        <ScrollButton />
      </main>
      <Footer />
    </div>
  );
}

export default App;
