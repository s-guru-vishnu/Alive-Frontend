import React, { useEffect, useRef } from 'react';
import { createTimeline, animate, stagger, remove } from 'animejs';

const AliveAnimation = ({ className = "" }) => {
    const containerRef = useRef(null);

    // "ALIVE" text structure hardcoded or derived to avoid runtime DOM splitting mess
    const text = "ALIVE";
    const chars = text.split('');

    useEffect(() => {
        if (!containerRef.current) return;
        console.log('AliveAnimation: Component mounted and useEffect running');

        // Target elements we just rendered
        const wordEl = containerRef.current.querySelectorAll('.word');
        const charEls = containerRef.current.querySelectorAll('.char');

        if (wordEl.length === 0 || charEls.length === 0) {
            console.warn('AliveAnimation: Elements not found in DOM');
            return;
        }

        console.log(`AliveAnimation: Found ${wordEl.length} word and ${charEls.length} chars`);

        const timeline = createTimeline({
            loop: true,
            defaults: { ease: 'easeInOutSine', duration: 650 }
        });

        timeline
            .add({
                targets: wordEl,
                translateY: [
                    { value: -10, duration: 0 },
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
        const breathing = animate({
            targets: charEls,
            translateY: ['-10%', '10%'],
            direction: 'alternate',
            loop: true,
            delay: stagger(100),
            easing: 'easeInOutSine',
            duration: 800
        });

        return () => {
            console.log('AliveAnimation: Cleanup');
            timeline.pause();
            if (breathing && breathing.pause) breathing.pause();
            remove(charEls);
            remove(wordEl);
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
