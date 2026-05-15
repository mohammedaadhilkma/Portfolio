import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`

function Particles({ count = 5000 }) {
  const points = useRef()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000)
      const y = THREE.MathUtils.randFloatSpread(2000)
      const z = THREE.MathUtils.randFloatSpread(2000)
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [count])

  useFrame((state) => {
    points.current.rotation.y += 0.001
    points.current.rotation.x += 0.0005
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        color="#00f2ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

const HeroBgAnimation = () => {
  return (
    <Container>
      <Canvas camera={{ position: [0, 0, 1000], fov: 75 }}>
        <Particles />
        <ambientLight intensity={0.5} />
      </Canvas>
    </Container>
  )
}

export default HeroBgAnimation