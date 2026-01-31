import React, { useEffect, useState } from 'react';

const AlertCard = ({ message, type = 'error', onClose, className = '' }) => {
    const [isVisible, setIsVisible] = useState(true);

    // Auto-close logic can be added here if needed, but for form errors simpler is better

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    if (!isVisible || !message) return null;

    // Colors based on user's design (red for error)
    // We can adapt for success if needed
    const isError = type === 'error';
    const baseColor = isError ? '#f85149' : '#2ea043'; // Github red / green
    const textColor = isError ? '#b22b2b' : '#1a7f37';
    const bgColor = isError ? 'rgba(248, 81, 73, 0.1)' : 'rgba(46, 160, 67, 0.1)';
    const borderColor = isError ? '#f85149' : '#2ea043';

    // We can use inline styles/custom props to override the tailored Tailwind classes 
    // or just swap the hardcoded hex values. 
    // Given the request "use this...", I will stick to the structure but make colors dynamic via style prop or template literals if easy, 
    // but to be safe and EXACT to the request I'll start with the exact class structure for errors.

    /* 
      User's exact code uses hex codes in Tailwind arbitrary values:
      border-[#f85149]
      text-[#b22b2b]
      [&_svg]:text-[#b22b2b]
      bg-[linear-gradient(#f851491a,#f851491a)]
      
      For success, we'll swap these.
    */

    const containerClasses = isError
        ? "border-[#f85149] text-[#b22b2b] [&_svg]:text-[#b22b2b] bg-[linear-gradient(#f851491a,#f851491a)]"
        : "border-[#2ea043] text-[#1a7f37] [&_svg]:text-[#1a7f37] bg-[linear-gradient(#2ea0431a,#2ea0431a)]";

    const buttonClasses = isError
        ? "text-[#f85149] border-[#f85149]"
        : "text-[#2ea043] border-[#2ea043]";

    return (
        <div className={`relative w-full flex flex-wrap items-center justify-center py-3 pl-4 pr-14 rounded-lg text-base font-medium [transition:all_0.5s_ease] border-solid border group ${containerClasses} ${className}`}>
            <button
                type="button"
                onClick={handleClose}
                aria-label="close-error"
                className={`absolute right-4 p-1 rounded-md transition-opacity border opacity-40 hover:opacity-100 ${buttonClasses}`}
            >
                <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={16} width={16} className="sizer [--sz:16px] h-4 w-4" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
            </button>
            <p className="flex flex-row items-center mr-auto gap-x-2">
                {isError && (
                    <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={28} width={28} className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                    </svg>
                )}
                {!isError && (
                    <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={28} width={28} className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                )}
                {message}
            </p>
        </div>
    );
}

export default AlertCard;
