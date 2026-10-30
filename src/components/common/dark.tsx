// i think you can do this either with daisyui or with global css, no need for useEffect here

import {useEffect, useState} from "react";

export function prefersDarkTheme() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', e => {
                setDark(e.matches);
            })

        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        setDark(mq.matches);

        mq.addEventListener('change', e => {
            setDark(e.matches);
        })
    }, []);

    return dark
}
