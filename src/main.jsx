import {MeshReflectorMaterial, OrbitControls} from "@react-three/drei";
import React, {useState} from "react";
import Floor from "./floor.jsx";
import IFrameContent from "./IFrameContent.jsx";


export default function Main()
{
    const [iframeRef, setIframeRef] = useState(null);

    return <>
        <OrbitControls makeDefault/>

        <directionalLight position={[1, 2, 3]} intensity={4.5}/>
        <ambientLight intensity={1.5}/>

        //floor
        <Floor />
        <IFrameContent onLoad={() => setIframeRef(iframeRef)}/>
    </>
}