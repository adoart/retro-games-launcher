import {useKeyboardControls} from "@react-three/drei";
import React, {useEffect} from "react";
import {useFrame} from "@react-three/fiber";

function SubscribeToKeyboard() {
    const [sub, get] = useKeyboardControls()

    useEffect(() => {
        return sub(
            (state) => state.insertCoin,
            (pressed) => {
                console.log('pressed', pressed)
            }
        )
    }, [])

    const { up, down, left, right, start, insertCoin } = get()
    useFrame(() => {
        // Fetch fresh data from store
        const pressed = get().start
        if (pressed) {
            console.log('pressed', get().valueOf())
        }
        // console.log('pressed', pressed)
    })

}

export default function Categories() {

    SubscribeToKeyboard()

    return <>
    </>
}