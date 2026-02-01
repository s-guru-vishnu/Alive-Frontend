import React, { useEffect, useRef } from 'react';
import { createTimeline, stagger, splitText } from 'animejs';

const AliveAnimation = ({ className }) => {
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current) return;

        // Split text logic
        const { chars } = splitText(textRef.current, {
            chars: {
                wrap: 'clip',
                clone: 'bottom'
            },
        });

        // Create timeline
        const tl = createTimeline()
            .add(chars, {
                y: '-100%',
                loop: true,
                loopDelay: 2000,
                duration: 1000,
                ease: 'inOut(2)',
            }, stagger(150));

        // Cleanup on unmount
        return () => {
            tl.pause();
        };
    }, []);

    return (
        <div className="overflow-hidden inline-flex items-center h-8 sm:h-10 align-middle">
            <div ref={textRef} className={`${className} whitespace-nowrap flex`} style={{ lineHeight: 1 }}>
                ALIVE
            </div>
        </div>
    );
};

export default AliveAnimation;
