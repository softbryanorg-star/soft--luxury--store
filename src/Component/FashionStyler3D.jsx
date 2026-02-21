import React, { Suspense, useMemo, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, useTexture } from '@react-three/drei'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import { Scene, Mesh, MeshStandardMaterial, CylinderGeometry, SphereGeometry, Group } from 'three'
import Mannequin from './Mannequin'
import ErrorBoundary from './ErrorBoundary'

// FashionStyler3D
// - Frontend-only 3D styler using react-three/fiber and drei
// - Expects `product` prop which may include texture references (image paths)
// - Minimal, modular, and optional. Mount inside a Dialog when requested.
export default function FashionStyler3D({ product, width = '100%', height = 480 }) {
  // product.textureMap can be an object mapping named meshes to image paths
  // e.g. { Shirt: '/src/assets/shirt-texture.jpg' }
  const textureEntries = product?.textureMap || {}

  // prepare keys & urls — actual texture hook must run inside Canvas
  const keys = Object.keys(textureEntries)
  const urls = keys.map((k) => textureEntries[k])

  // check whether the model exists before attempting to load it to avoid a network HTML response
  const [modelAvailable, setModelAvailable] = useState(null)
  const [placeholderUrl, setPlaceholderUrl] = useState(null)
  useEffect(() => {
    let mounted = true
    const modelPath = '/models/mannequin.glb'
    fetch(modelPath, { method: 'HEAD' })
      .then((res) => {
        if (!mounted) return
        setModelAvailable(res.ok)
      })
      .catch(() => {
        if (!mounted) return
        setModelAvailable(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  // when the model is missing, generate a tiny placeholder GLB in-memory and expose as a blob URL
  useEffect(() => {
    let cancelled = false
    let currentUrl = null
    if (modelAvailable === false && !placeholderUrl) {
      try {
        const scene = new Scene()
        const group = new Group()

        const bodyMat = new MeshStandardMaterial({ color: 0xdddddd })
        const headMat = new MeshStandardMaterial({ color: 0xf7e7dd })

        const body = new Mesh(new CylinderGeometry(0.45, 0.6, 1.2, 32), bodyMat)
        body.position.y = 0.4
        const head = new Mesh(new SphereGeometry(0.18, 32, 32), headMat)
        head.position.y = 0.95

        group.add(body)
        group.add(head)
        scene.add(group)

        const exporter = new GLTFExporter()
        exporter.parse(
          scene,
          function (result) {
            if (cancelled) return
            let arrayBuffer
            if (result instanceof ArrayBuffer) {
              arrayBuffer = result
            } else {
              // when not binary, try to stringify JSON and skip placeholder
              try {
                const str = JSON.stringify(result)
                arrayBuffer = new TextEncoder().encode(str).buffer
              } catch (e) {
                return
              }
            }
            const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' })
            currentUrl = URL.createObjectURL(blob)
            setPlaceholderUrl(currentUrl)
          },
          { binary: true }
        )
      } catch (e) {
        // ignore — fallback UI already exists
      }
    }
    return () => {
      cancelled = true
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl)
      }
    }
  }, [modelAvailable, placeholderUrl])

  // Inner component that runs inside the R3F context and can use hooks like useTexture
  function ModelWithTextures() {
    if (!urls || urls.length === 0) {
      return <Mannequin position={[0, -1.1, 0]} textureMap={{}} />
    }
    const textures = useTexture(urls)
    const textureMap = useMemo(() => {
      const map = {}
      keys.forEach((k, i) => {
        map[k] = textures[i]
      })
      return map
    }, [keys, textures])
    return <Mannequin position={[0, -1.1, 0]} textureMap={textureMap} />
  }

  // a small fallback primitive to render when the GLB is missing; keeps the canvas useful
  function FallbackModel() {
    return (
      <group position={[0, -1, 0]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.6, 1.2, 32]} />
          <meshStandardMaterial color={0xdddddd} metalness={0.1} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.95, 0]} castShadow>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color={0xf7e7dd} metalness={0.02} roughness={0.7} />
        </mesh>
      </group>
    )
  }

  return (
    <div style={{ width, height, borderRadius: 8, overflow: 'hidden' }}>
      {modelAvailable === null ? (
        <div style={{ width: '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>Checking 3D model availability...</div>
        </div>
      ) : modelAvailable === false ? (
        <div style={{ width: '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>3D model not found</div>
            <div style={{ fontSize: 13, color: '#555' }}>The 3D mannequin file is missing at <code>/models/mannequin.glb</code>. Please add the GLB to the project's <code>public/models</code> folder.</div>
          </div>
        </div>
      ) : (
        <ErrorBoundary message={'3D viewer failed'}>
          <Canvas camera={{ position: [0, 1.6, 3.2], fov: 40 }}>
                <Suspense fallback={<Html>Loading 3D...</Html>}>
                  {/* Lighting */}
                  <ambientLight intensity={0.8} />
                  <hemisphereLight skyColor={0xffffff} groundColor={0x888888} intensity={0.6} />
                  <directionalLight intensity={0.9} position={[5, 10, 7]} />

                  {/* Mannequin; textures applied via textureMap (loaded inside R3F context) */}
                  {modelAvailable ? <ModelWithTextures /> : <FallbackModel />}

                  {/* controls for orbiting the model */}
                  <OrbitControls enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2}
                    enableDamping={true} dampingFactor={0.05} />
                </Suspense>
          </Canvas>
        </ErrorBoundary>
      )}
    </div>
  )
}
