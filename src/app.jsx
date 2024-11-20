import {KeyboardControls} from "@react-three/drei";
import React, {useMemo} from "react";
import V0Scene from "./v0-scene.tsx";
import FetchContent from "./fetch-content.jsx";

export default function App() {
    FetchContent();

    const Controls = {
        insertCoin: 'insertCoin',
        start: 'start',
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right',
        A: 'A',
        B: 'B',
        X: 'X',
        Y: 'Y',
        L: 'L',
        L2: 'L2',
        R2: 'R2',
        L3: 'L3',
        R3: 'R3',
        LStickUp: 'LStickUp',
        LStickDown: 'LStickDown',
        LStickLeft: 'LStickLeft',
        LStickRight: 'LStickRight',
        RStickDown: 'RStickDown',
        RStickUp: 'RStickUp',
        RStickLeft: 'RStickLeft',
        RStickRight: 'RStickRight'
    };
    const map = useMemo(() => [
        {name: Controls.insertCoin, keys: ['ShiftKey', '1']},
        {name: Controls.start, keys: ['Enter', '2']},
        {name: Controls.up, keys: ['ArrowUp', 'KeyW']},
        {name: Controls.down, keys: ['ArrowDown', 'KeyS']},
        {name: Controls.left, keys: ['ArrowLeft', 'KeyA']},
        {name: Controls.right, keys: ['ArrowRight', 'KeyD']},
    ], []);

    return (<>
        <KeyboardControls map={map}>
            <V0Scene/>
            {/*<Canvas*/}
            {/*    camera={{*/}
            {/*        fov: 45,*/}
            {/*        near: 0.1,*/}
            {/*        far: 200,*/}
            {/*        position: [-4, 3, 6],*/}

            {/*    }}*/}
            {/*>*/}
            {/*    <Main/>*/}
            {/*</Canvas>*/}
        </KeyboardControls>
    </>)
}