import React from 'react';
import {MeshReflectorMaterial} from '@react-three/drei';

function Floor() {

  return (
      <mesh rotation-x={-Math.PI / 2} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} />
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
  );
}

export default Floor;