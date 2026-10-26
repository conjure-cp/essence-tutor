import {useEffect, useState} from "react";

export function prefersDarkTheme() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', e => {
                setDark(e.matches);
            })
    }, []);

    return dark
}