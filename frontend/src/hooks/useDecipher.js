import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";

export function useDecipher(text, options = {}) {
    const [displayText, setDisplayText] = useState("");
    const { speed = 50, cycles = 3 } = options;

    useEffect(() => {
        let iteration = 0;

        // Safety check
        if (!text) return;

        const interval = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / cycles;
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, cycles]);

    return displayText;
}
