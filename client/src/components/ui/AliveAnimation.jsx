import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const AliveAnimation = ({ className = "" }) => {
    const containerRef = useRef(null);

    // "ALIVE" text structure hardcoded or derived to avoid runtime DOM splitting mess
    const text = "ALIVE";
    const chars = text.split('');

    useEffect(() => {
        if (!containerRef.current) return;

        // Target elements we just rendered
        const wordEl = containerRef.current.querySelectorAll('.word');
        const charEls = containerRef.current.querySelectorAll('.char');

        const timeline = anime.timeline({
            loop: true,
            defaults: { ease: 'easeInOutSine', duration: 650 }
        });

        timeline
            .add({
                targets: wordEl,
                translateY: [
                    {
                        value: (el) => {
                            // We can check dataset here if needed, or just hardcode for the single word
                            return -10; // Simple initial offset
                        }, duration: 0
                    },
                    { value: 0, duration: 650 }
                ],
            })
            .add({
                targets: charEls,
                translateY: [
                    // Alternate up/down based on index (parity)
                    { value: (el, i) => i % 2 === 0 ? '20%' : '-20%', duration: 650 },
                    { value: '0%', duration: 650 }
                ],
                easing: 'easeInOutQuad',
                direction: 'alternate',
            }, 0);

        // Secondary "breathing" animation
        anime({
            targets: charEls,
            translateY: ['-10%', '10%'],
            direction: 'alternate',
            loop: true,
            delay: anime.stagger(100),
            easing: 'easeInOutSine',
            duration: 800
        });

        return () => {
            timeline.pause();
            anime.remove(charEls);
            anime.remove(wordEl);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ lineHeight: 1.35, display: 'inline-block' }}
            aria-label={text}
        >
            <span className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {chars.map((char, index) => (
                    <span
                        key={index}
                        className="char"
                        data-line={index % 2}
                        style={{ display: 'inline-block' }}
                    >
                        {char}
                    </span>
                ))}
            </span>
        </div>
    );
};

export default AliveAnimation;
