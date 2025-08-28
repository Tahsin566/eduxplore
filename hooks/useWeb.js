
import React, { useEffect } from 'react'
import * as webBrowser from 'expo-web-browser'

const UseWeb = () => {

    useEffect(() => {

        webBrowser.warmUpAsync()

        return () => {
            webBrowser.coolDownAsync()
        }
    }, [])

}

export default UseWeb