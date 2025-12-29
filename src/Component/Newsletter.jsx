import React, { useState } from 'react'
import './Newsletter.css'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <section className="newsletter">
      <div className="wrap">
        <h3>Join our newsletter</h3>
        <p>Get exclusive drops and private previews — no spam.</p>
        <form className="nl-form" onSubmit={handleSubmit}>
          <input placeholder="Email address" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <button type="submit">{subscribed ? 'Subscribed' : 'Subscribe'}</button>
        </form>
        {subscribed && <p className="success">Thanks — check your inbox for a welcome note.</p>}
      </div>
    </section>
  )
}

export default Newsletter
