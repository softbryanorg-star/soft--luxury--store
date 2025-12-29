import React from 'react'
import './Partners.css'

const Partners = ()=>{
  const logos = ['/src/assets/acc1.jpeg','/src/assets/acc2.jpeg','/src/assets/acc3.jpeg','/src/assets/acc4.jpeg']
  return (
    <section className="partners">
      <div className="wrap">
        {logos.map((l,i)=>(<div key={i} className="logo" style={{backgroundImage:`url(${l})`}}/>))}
      </div>
    </section>
  )
}
export default Partners
