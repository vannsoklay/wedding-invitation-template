
import React, { useEffect, useRef, useState } from 'react';
import { PatternBackground } from './components/PatternBackground';
import { ProfileCard } from './components/ProfileCard';
import { NavigationDots } from './components/NavigationDots';
import { useAutoScroll } from './hooks/useAutoScroll';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { Profile, Section, WeddingDetails } from './types';
import { Button, Card, Image as IImage } from '@nextui-org/react';
import { Icon } from "@iconify/react";
import { GlobalStyles } from './assets/styles/GlobalStyles';
import { ImageCarousel } from './components/ImageCarousel';
import MobileBottom from './components/MobileBottom';
import WeddingFooter from './components/Footer';
import { useNavigate } from 'react-router';

export const App: React.FC = () => {
  let navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [sectionId, setSectionId] = useState<string>("0");
  // const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRefs = [useRef<HTMLElement>(null), useRef<HTMLElement>(null), useRef<HTMLElement>(null), useRef<HTMLElement>(null)];

  const sections: Section[] = [
    { id: "", title: "ចំណងជើង" },
    // { id: "details", title: "ព័ត៌មានលម្អិត" },
    { id: "gallery", title: "វិចិត្រសាល" },
    { id: "location", title: "ទីតាំង" },
    { id: "contact", title: "ទំនាក់ទំនង" }
  ];

  const profiles: Profile[] = [
    {
      name: "សុភា",
      image: {
        src: "",
        alt: "Bride's profile"
      }
    },
    {
      name: "វីរៈ",
      image: {
        src: "",
        alt: "Groom's profile"
      }
    }
  ];

  const preWeddingImages = [
    { src: "/images/wedding/wedding-01.jpg", alt: "រូបភាពមុនពេលរៀបការ 1" },
    { src: "/images/wedding/wedding-02.jpg", alt: "រូបភាពមុនពេលរៀបការ 2" },
    { src: "/images/wedding/wedding-03.jpg", alt: "រូបភាពមុនពេលរៀបការ 3" },
    { src: "/images/wedding/wedding-04.jpg", alt: "រូបភាពមុនពេលរៀបការ 4" },
    { src: "/images/wedding/wedding-05.jpg", alt: "រូបភាពមុនពេលរៀបការ 5" },
    { src: "/images/wedding/wedding-06.jpg", alt: "រូបភាពមុនពេលរៀបការ 6" },
    { src: "/images/wedding/wedding-07.jpg", alt: "រូបភាពមុនពេលរៀបការ 7" },
    { src: "/images/wedding/wedding-08.jpg", alt: "រូបភាពមុនពេលរៀបការ 8" },
    { src: "/images/wedding/wedding-09.jpg", alt: "រូបភាពមុនពេលរៀបការ 9" },
    { src: "/images/wedding/wedding-10.jpg", alt: "រូបភាពមុនពេលរៀបការ 10" },
    { src: "/images/wedding/wedding-011.jpg", alt: "រូបភាពមុនពេលរៀបការ 11" },
    { src: "/images/wedding/wedding-012.jpg", alt: "រូបភាពមុនពេលរៀបការ 12" },
    { src: "/images/wedding/wedding-013.jpg", alt: "រូបភាពមុនពេលរៀបការ 13" },
    { src: "/images/wedding/wedding-014.jpg", alt: "រូបភាពមុនពេលរៀបការ 14" },
    { src: "/images/wedding/wedding-015.jpg", alt: "រូបភាពមុនពេលរៀបការ 15" }
  ]


  const weddingDetails: WeddingDetails = {
    date: "ថ្ងៃសៅរ៍ និង ថ្ងៃអាទិត្យ ទី១២ និង ១៣ ខែសីហា ឆ្នាំ២០២៣",
    time: "ពិធីរៀបអាពាហ៍ពិពាហ៍តាមប្រពៃណីខ្មែរចាប់ផ្តើមនៅម៉ោង ៨:០០ ព្រឹកនៅថ្ងៃសៅរ៍",
    venue: "សណ្ឋាគារ អង្គរប៉ារ៉ាឌីស",
    address: "ផ្លូវជាតិលេខ ៦, ក្រុងសៀមរាប, ប្រទេសកម្ពុជា"
  };

  useIntersectionObserver({
    refs: sectionRefs,
    onIntersect: (index) => {
      setCurrentSection(index);
      if (index > 0) {
        setIsScrolling(false);

        // Ensure the audio starts playing when the section is in view
        if (audioRef.current) {
          audioRef.current.play().catch((err) => {
            console.warn("Audio playback failed:", err);
          });
        }
      }
      const sectionId = sections[index].id;
      setSectionId(sectionId);
    }
  });

  useEffect(() => {
    if (!sectionId) {
      setUserInteracted(false);
    }
    navigate(`#${sectionId}`);
  }, [sectionId, navigate])


  const scrollToDetails = useAutoScroll({
    targetRef: sectionRefs[1],
    options: { behavior: 'smooth', block: 'start' }
  });

  const handleViewDetails = () => {
    setUserInteracted(true);
    setIsScrolling(true);
    navigate("#gallery");
    // Wait for the next tick to ensure the details section is rendered
    setTimeout(() => {
      scrollToDetails();
    }, 100);
  };

  const handleNavigation = (index: number) => {
    if (index === 0 || userInteracted) {
      const sectionId = sections[index].id;
      // Scroll to the section
      sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth' });

      console.log("sectionId", sectionId);

      // Update the route with the section ID
      // navigate(`#${sectionId}`);
    }
  };

  // Prevent scroll during transition
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isScrolling]);

  return (
    <div className="relative">
      <GlobalStyles />
      <NavigationDots
        sections={sections}
        currentSection={currentSection}
        onNavigate={handleNavigation}
      />

      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {/* Hero Section */}
        <section
          ref={sectionRefs[0]}
          className="snap-start h-screen relative flex items-center justify-center overflow-hidden"
        >
          <PatternBackground />
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="flex justify-center item-center">
              <IImage src="/images/crown-01.png" className="mb-4 h-10" />
            </div>
            <h1 className="text-5xl sm:text-6xl mb-4">
              សូមអញ្ជើញចូលរួម
            </h1>
            <p className="text-2xl mb-8">ពិធីមង្គលការ</p>
            <div className="flex justify-center">
              <IImage src="/images/wedding-poster.png" height={260} />
            </div>
            <div className="flex justify-center mb-16">
              {profiles.map((profile, index) => (
                <ProfileCard key={index} on={index} profile={profile} />
              ))}
            </div>

            <p className="text-xl mb-8">
              {weddingDetails.date}
            </p>

            <Button
              variant="solid"
              color="primary"
              className="bg-red-600 mb-20"
              size="lg"
              onPress={handleViewDetails}
              disabled={isScrolling}
              endContent={<Icon icon={sectionId ? "solar:heart-unlock-bold" : "solar:heart-lock-bold"} width="24" height="24" />}
            >
              បើកសំបុត្រ
            </Button>
          </div>
        </section>

        {userInteracted && (
          <>
            {/* Gallery Section */}
            <section id="gallery" ref={sectionRefs[1]} className="snap-start h-screen relative flex items-center justify-center overflow-hidden">
              <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="flex justify-center item-center">
                    <IImage src="/images/crown-01.png" className="mb-4 h-10" />
                  </div>
                  <div className="flex items-center justify-center mb-8">
                    <div className="h-[1px] flex-1 bg-rose-200"></div>
                    <Icon
                      icon="mdi:heart"
                      className="w-6 h-6 mx-4 text-rose-400"
                    />
                    <div className="h-[1px] flex-1 bg-rose-200"></div>
                  </div>

                  <div className="flex justify-center item-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800">វិចិត្រសាល</h3>
                  </div>
                  {/* {imagesLoaded ? (
                    <Canvas>
                      <Suspense fallback={null}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <ImageGallery3D images={preWeddingImages} />
                        <OrbitControls enableZoom={false} />
                      </Suspense>
                    </Canvas>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p>Loading images...</p>
                    </div>
                  )} */}
                  <div>
                    <ImageCarousel images={preWeddingImages} />
                  </div>
                </div>
              </div>
            </section>

            {/* Location Section */}
            <section
              id="location"
              ref={sectionRefs[2]}
              className="snap-start h-screen relative flex items-center justify-center overflow-hidden"
            >
              <PatternBackground />
              <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/80 rounded-lg mb-20">
                {/* Decorative Header */}
                <div className="flex justify-center item-center">
                  <IImage src="/images/crown-01.png" className="mb-4 h-10" />
                </div>
                <div className="flex items-center justify-center mb-8">
                  <div className="h-[1px] flex-1 bg-rose-200"></div>
                  <Icon
                    icon="mdi:heart"
                    className="w-6 h-6 mx-4 text-rose-400"
                  />
                  <div className="h-[1px] flex-1 bg-rose-200"></div>
                </div>

                <div className="flex justify-center item-center mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800">ទីតាំង</h3>
                </div>


                {/* Map Container */}
                <div className="relative group">
                  <Card
                    className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group-hover:ring-2 group-hover:ring-red-300"
                  >
                    <div
                      className={`transition-all duration-500 ease-in-out h-[400px]`}
                    >
                      <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345095836!2d-122.4194155846813!3d37.77492977975847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064c2a5c66b%3A0xe4fbe36ec1d1b861!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1696430338492!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </Card>
                </div>
                <div className="mt-8 lg:flex justify-center gap-4 lg:space-y-0 space-y-4">
                  {/* Google Maps Share */}
                  <Button
                    as="a"
                    size="lg"
                    href="https://www.google.com/maps?q=37.774929,-122.419415"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="flat"
                    color="primary"
                    className="bg-rose-400 text-white flex items-center gap-2 px-6 py-2 text-white hover:bg-rose-700 transition-colors duration-300"
                  >
                    <Icon icon="mdi:google-maps" className="text-lg" />
                    ទីតាំងលើ Google Maps
                  </Button>

                  {/* Apple Maps Share */}
                  <Button
                    as="a"
                    size="lg"
                    href="https://maps.apple.com/?q=37.774929,-122.419415"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="flat"
                    color="success"
                    className="flex items-center gap-2 px-6 py-2 text-white bg-gray-700 hover:bg-gray-700 transition-colors duration-300"
                  >
                    <Icon icon="mdi:apple" className="text-lg" />
                    ទីតាំងលើ Apple Maps
                  </Button>
                </div>

              </div>
            </section>


            {/* Footer Section */}
            <section id="contact" ref={sectionRefs[3]} className="snap-start min-h-screen bg-white flex items-center">
              <WeddingFooter />
            </section>
          </>
        )}
        {/* Audio element for background music */}
        <audio ref={audioRef} src="/mp3/audiowedding.mp3" loop preload="auto" />
      </div>
      <MobileBottom />
    </div>
  );
};

export default App;