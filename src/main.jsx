import {
    Html,
    OrbitControls,
    MeshReflectorMaterial
} from "@react-three/drei";
import React from "react";
import {DoubleSide} from "three";




export default function Main()
{
    return <>
        <OrbitControls makeDefault/>

        <directionalLight position={[1, 2, 3]} intensity={4.5}/>
        <ambientLight intensity={1.5}/>


        <mesh>
            <planeGeometry/>
            <Html transform position-z={0.2} scale={0.1} castShadow // Make HTML cast a shadow
                  receiveShadow // Make HTML receive shadows
                  material={<meshPhysicalMaterial side={DoubleSide} opacity={0.1} reflectivity={1} />}  >
                <iframe
                    src="https://www.retrogames.cc/embed/10062-street-fighter-iii-3rd-strike%3A-fight-for-the-future-usa-990608.html"
                    width="600" height="450" frameBorder="no" allowFullScreen="true" webkitallowfullscreen="true"
                    mozallowfullscreen="true" scrolling="no"></iframe>
            </Html>

        </mesh>

        //floor
        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry/>
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={80}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#050505"
                metalness={0.5}
                mirror={0.75}/>
        </mesh>

    </>
}