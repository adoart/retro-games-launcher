import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshReflectorMaterial, Float, OrbitControls, Html } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import * as React from 'react'

function Frame({ position, rotation, scale, children }: {
    position: [number, number, number],
    rotation?: [number, number, number],
    scale?: [number, number, number],
    children?: React.ReactNode
}) {
    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHovered] = useState(false)

    useFrame((state) => {
        mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
        mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    })

    return (
        <mesh
            ref={mesh}
            position={position}
            rotation={rotation}
            scale={scale}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry args={[1, 1.5, 0.1]} />
            <meshStandardMaterial color={hovered ? "#ff0000" : "#ffffff"} metalness={0.5} roughness={0.2} />
            {children}
        </mesh>
    )
}

function Scene() {
    return (
        <Canvas shadows camera={{ position: [0, 3, 5], fov: 75 }}>
            <color attach="background" args={['#202020']} />
            <fog attach="fog" args={['#202020', 5, 20]} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
                <Frame position={[-2.5, 2, 0]} />
                <Frame position={[0, 2, 0]} rotation={[0, Math.PI / 6, 0]} scale={[2, 2, 1]}>
                    <Html transform position-z={0.2}
                          scale={0.1}
                          castShadow
                          receiveShadow>
                        <div style={{ width: '600px', height: '450px', pointerEvents: 'auto' }}>
                            <iframe
                                src="https://www.retrogames.cc/embed/10062-street-fighter-iii-3rd-strike%3A-fight-for-the-future-usa-990608.html"
                                width="600"
                                height="450"
                                frameBorder="no"
                                allowFullScreen={true}
                                scrolling="no"
                            />
                        </div>
                    </Html>
                </Frame>
                <Frame position={[2.5, 2, 0]} />
            </Float>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={2048}
                    mixBlur={1}
                    mixStrength={80}
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#101010"
                    metalness={0.5}
                 mirror={0.75}/>
            </mesh>

            <Environment preset="city" />
            <OrbitControls enablePan={true} enableZoom={true} />
        </Canvas>
    )
}

export default function V0Scene() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Scene />
        </div>
    )
}