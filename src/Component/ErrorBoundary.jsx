import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // log for debugging
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught', error, info)
  }

  render() {
    if (this.state.hasError) {
      const message = this.props.message || 'An error occurred while loading the 3D viewer.'
      return (
        <div style={{ padding: 16, borderRadius: 8, background: '#fff8f0', color: '#333' }}>
          <strong>{message}</strong>
          <div style={{ marginTop: 8 }}>{this.state.error?.message}</div>
        </div>
      )
    }
    return this.props.children
  }
}
