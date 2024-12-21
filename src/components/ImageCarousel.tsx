import { Icon } from "@iconify/react/dist/iconify.js";
import {
    Button,
    Modal,
    Image,
    ModalBody,
    ModalContent,
} from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";

interface ImageCarouselProps {
    images: { src: string; alt: string }[];
    autoPlay?: boolean; // Optional autoPlay prop
    autoPlayInterval?: number; // Optional interval for autoPlay in ms
}

export function ImageCarousel({
    images,
    autoPlay = true, // Auto-play enabled by default
    autoPlayInterval = 3000, // Default interval: 3 seconds
}: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
        null
    );
    const startX = useRef<number | null>(null);
    const startY = useRef<number | null>(null); // Track vertical touch start
    const autoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const selectedPhoto =
        selectedPhotoIndex !== null ? images[selectedPhotoIndex] : null;

    // Auto-play logic
    useEffect(() => {
        if (autoPlay) {
            startAutoPlay();
        }
        return () => stopAutoPlay(); // Cleanup on unmount
    }, [currentIndex, autoPlay]);

    const startAutoPlay = () => {
        stopAutoPlay(); // Clear existing timer
        autoPlayTimer.current = setTimeout(() => {
            handleNext();
        }, autoPlayInterval);
    };

    const stopAutoPlay = () => {
        if (autoPlayTimer.current) {
            clearTimeout(autoPlayTimer.current);
            autoPlayTimer.current = null;
        }
    };

    // Handle horizontal swipe logic
    const handleTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
        startY.current = e.touches[0].clientY; // Record vertical touch start
        stopAutoPlay(); // Stop auto-play on user interaction
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (startX.current === null || startY.current === null) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX.current - endX;
        const diffY = startY.current - endY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    goToNext(); // Swipe left for next
                } else {
                    goToPrevious(); // Swipe right for prev
                }
            }
        } else {
            // Vertical swipe
            if (Math.abs(diffY) > 50) {
                if (diffY > 0) {
                    // Swipe up (optional: you can handle it if needed)
                } else {
                    closeModal(); // Swipe down to close
                }
            }
        }

        startX.current = null;
        startY.current = null;

        if (autoPlay) startAutoPlay(); // Resume auto-play after interaction
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        if (autoPlay) startAutoPlay(); // Restart auto-play
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        if (autoPlay) startAutoPlay(); // Restart auto-play
    };

    const handleImageClick = (index: number) => {
        setSelectedPhotoIndex(index);
        stopAutoPlay(); // Stop auto-play when modal is open
    };

    const closeModal = () => {
        setSelectedPhotoIndex(null);
        if (autoPlay) startAutoPlay(); // Resume auto-play after modal close
    };

    const goToPrevious = () => {
        setSelectedPhotoIndex((prevIndex) =>
            prevIndex !== null ? (prevIndex - 1 + images.length) % images.length : null
        );
    };

    const goToNext = () => {
        setSelectedPhotoIndex((prevIndex) =>
            prevIndex !== null ? (prevIndex + 1) % images.length : null
        );
    };

    return (
        <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Image Display */}
            <div className="rounded-lg overflow-hidden z-40">
                <Image
                    isZoomed
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    // className="w-full lg:h-[60vh] h-[54vh] object-cover cursor-pointer"
                    onClick={() => handleImageClick(currentIndex)}
                />
            </div>

            {/* Navigation Buttons */}
            <Button
                isIconOnly
                onPress={handlePrev}
                radius="full"
                color="default"
                className="absolute top-1/2 left-4 transform -translate-y-1/2 z-50"
            >
                <Icon icon="solar:alt-arrow-left-line-duotone" width="24" height="24" />
            </Button>
            <Button
                isIconOnly
                radius="full"
                onPress={handleNext}
                color="default"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 z-50"
            >
                <Icon icon="solar:alt-arrow-right-linear" width="24" height="24" />
            </Button>

            {/* Modal for Fullscreen View */}
            <Modal isOpen={selectedPhotoIndex !== null} size="full" radius="none">
                <ModalContent>
                    {(_) => (
                        <ModalBody
                            className="p-0"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div className="relative w-full h-screen flex items-center justify-center">
                                {selectedPhoto && (
                                    <Image
                                        src={selectedPhoto.src}
                                        alt={selectedPhoto.alt}
                                        className="object-contain z-40"
                                        radius="none"
                                    />
                                )}
                                <Button
                                    isIconOnly
                                    color="default"
                                    variant="flat"
                                    className="absolute top-2 right-2 bg-white/20 backdrop-blur-lg"
                                    size="md"
                                    onPress={closeModal}
                                >
                                    <Icon icon="ic:sharp-close" width="24" height="24" />
                                </Button>
                            </div>
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
