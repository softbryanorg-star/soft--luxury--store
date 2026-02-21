import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

// Mannequin component
// Props:
// - modelPath: path to the GLB model in /public (e.g. '/models/mannequin.glb')
// - textureMap: object mapping mesh names to THREE.Texture (or image URL handled by parent)
// The component applies provided textures to named meshes and returns the model group.
export default function Mannequin({ modelPath = '/models/mannequin.glb', textureMap = {} , ...props }) {
  const group = useRef()
  const { scene } = useGLTF(modelPath)

  useEffect(() => {
    if (!scene) return
    // apply textures by mesh name
    scene.traverse((child) => {
      if (child.isMesh && child.name) {
        const key = child.name
        const tex = textureMap[key] || textureMap[key.toLowerCase()] || textureMap[key.replace(/\s/g, '')]
        if (tex) {
          // assign material map; parent should provide a loaded THREE.Texture
          try {
            child.material = child.material.clone()
            child.material.map = tex
            child.material.needsUpdate = true
          } catch (e) {
            // If anything fails, silently continue to avoid breaking parent UI
            // console.warn('Failed to apply texture', e)
          }
        }
        // ensure doubleSided or appropriate settings for garments
        if (child.material) {
          child.material.side = child.material.side
        }
      }
    })
  }, [scene, textureMap])

  // subtle idle rotation for presentation
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15
    }
  })

  return <primitive ref={group} object={scene} {...props} />
}

useGLTF.preload('/models/mannequin.glb')
