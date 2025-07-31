import { useState, useEffect } from 'react';

export default function usePopup() {
    const [showPopup, setShowPopup] = useState(false);

    const handleOpen = () => {
        setShowPopup(true); // ✅ Always allow open on click
    };

    const handleClose = () => {
        setShowPopup(false);
    };

    // ✅ Only auto-close on screen resize (not block open)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768 && showPopup) {
                setShowPopup(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [showPopup]);

    return {
        showPopup,
        handleOpen,
        handleClose,
    };
}
