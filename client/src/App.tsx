import './App.css'
import Headers from '@src/layout/Headers'
import { Routes, Route } from 'react-router-dom'
import Home from '@src/components/Home'
import Login from '@src/components/Login'
import Chats from '@src/components/Chats'
import Signup from '@src/components/Signup'
import NotFound from '@src/components/NotFound'
import { Box } from '@mui/material'

function App() {
  return (
    <main>
      <Box component={'section'} sx={{
        //  position: 'fixed', height: '60px', width: '100%', zIndex: 1
         }} >
        <Headers></Headers>
      </Box>
      <Box component={'section'} sx={{ height: "calc(100% - 60px)", zIndex: -1 }} >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<Chats />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Box>
    </main>
  )
}

export default App
