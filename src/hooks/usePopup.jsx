import { useState } from 'react';

export default function usePopup() {
    //   const [isVisible, setIsVisible] = useState(false);

    //   const openPopup = () => setIsVisible(true);
    //   const closePopup = () => setIsVisible(false);
    const [showPopup, setShowPopup] = useState(false);
    const handleOpen = () => setShowPopup(true);
    const handleClose = () => setShowPopup(false);

    return {
        showPopup,
        handleOpen,
        handleClose
    };
}
