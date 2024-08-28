import {Html, MeshTransmissionMaterial, PerspectiveCamera} from '@react-three/drei';
import React, {useRef, useEffect} from 'react';
import {CanvasTexture, Color, DoubleSide} from 'three';

const IFrameContent = ({onLoad}) => {
    const iFrameRef = useRef();

    useEffect(() => {
        const handleLoad = () => {
            onLoad(iFrameRef.current);
        };

        if (iFrameRef.current) {
            iFrameRef.current.addEventListener('load', handleLoad);
        }

        // Clean up event listener when the component is unmounted
        return () => {
            if (iFrameRef.current) {
                iFrameRef.current.removeEventListener('load', handleLoad);
            }
        };
    }, [onLoad]);

    const planeRef = useRef();
    const iframeCanvasRef = useRef(document.createElement('canvas'));
    const iframeContextRef = useRef();

    useEffect(() => {
        if (!iFrameRef) return;

        const iframe = iFrameRef.current?.firstElementChild;
        if (!iframe) return;

        const canvas = iframeCanvasRef.current;
        canvas.width = iframe.width;
        canvas.height = iframe.height;
        iframeContextRef.current = canvas.getContext('2d');

        const updateIframeTexture = () => {
            try {
                iframeContextRef.current.drawImage(iframe.contentWindow.document.body, 0, 0, canvas.width, canvas.height);
                const texture = new CanvasTexture(canvas);

                if (planeRef.current) {
                    planeRef.current.material.map = texture;
                    planeRef.current.material.map.needsUpdate = true;
                }
            } catch (error) {
                console.error('Error capturing iframe content', error);
            }
        };
        iframe.addEventListener('load', updateIframeTexture);

        const interval = setInterval(updateIframeTexture, 1000 / 30); // Update at 30 FPS

        return () => clearInterval(interval);
    }, [iFrameRef]);

    return (
            <mesh ref={planeRef}>
                <planeGeometry/>
                {/*<MeshTransmissionMaterial side={DoubleSide} buffer={iFrameRef.current} />*/}
                <Html
                    ref={iFrameRef}
                    transform
                    position-z={0.2}
                    scale={0.1}
                    castShadow
                    receiveShadow
                >
                    <iframe
                        src="https://www.retrogames.cc/embed/10062-street-fighter-iii-3rd-strike%3A-fight-for-the-future-usa-990608.html"
                        width="600" height="450" frameBorder="no" allowFullScreen="true" webkitallowfullscreen="true"
                        mozallowfullscreen="true" scrolling="no"></iframe>
                </Html>
            </mesh>
            );
};

export default IFrameContent;