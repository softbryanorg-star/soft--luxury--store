import React from 'react'
import './SocialsBar.css'
import InstagramIcon from '@mui/icons-material/Instagram'
import SvgIcon from '@mui/material/SvgIcon'

const TikTokIcon = (props)=> (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M16.5 7.5c-.2 0-.4 0-.6-.1-.7-.3-1.2-.8-1.6-1.4-.3-.5-.5-1-.6-1.6h2.8v4.6c0 2.3-1.9 4.2-4.2 4.2-.8 0-1.6-.2-2.3-.6v2.6c.7.3 1.5.5 2.3.5 3.3 0 6-2.7 6-6v-6h-0.5z" />
    <path d="M12 5.2v6.6c1 0 1.9-.3 2.7-.9V4.9h-2.7c-.1.1 0 .3 0 .3z" />
    <path d="M9.2 14.5c0-1.9 1.5-3.4 3.4-3.4V6.5h-1.2c-2.3 0-4.2 1.9-4.2 4.2 0 1.4.7 2.7 1.9 3.2v3.8h.1v-0.8c0-.6-.2-1.2-.2-1.9z" />
  </SvgIcon>
)

const SocialsBar = ()=>{
  return (
    <div className="socials-bar">
      <a href="https://www.instagram.com/softbryan" target="_blank" rel="noopener noreferrer" className="s" aria-label="Instagram">
        <InstagramIcon className="mui-icon" />
        <div className="label">Instagram</div>
      </a>

      <a href="https://www.tiktok.com/@softbryan" target="_blank" rel="noopener noreferrer" className="s" aria-label="TikTok">
        <TikTokIcon className="mui-icon" />
        <div className="label">TikTok</div>
      </a>
    </div>
  )
}

export default SocialsBar
