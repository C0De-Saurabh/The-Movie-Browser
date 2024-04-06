import { PlayArrow } from '@mui/icons-material'
import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
  <h1 className="text-3xl font-bold">{title}</h1>
  <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
  <div className="my-4 md:m-0">
    <button className="bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl rounded-lg hover:bg-opacity-80 items-center">
      <PlayArrow className="mr-2 pb-1" />Play
    </button>
    <button className="inline-block mx-2 bg-white text-black p-4 px-12 text-xl rounded-lg hover:bg-opacity-80">
      More Info
    </button>
  </div>
</div>

  )
}

export default VideoTitle