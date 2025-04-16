import Lottie from "lottie-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const Footer = () => {
  // State to hold animation data
  const [facebookAnimation, setFacebookAnimation] = useState(null);
  const [youtubeAnimation, setYoutubeAnimation] = useState(null);
  const [linkedinAnimation, setLinkedinAnimation] = useState(null);
  const [twitterAnimation, setTwitterAnimation] = useState(null);

  // Hover state for each icon
  const [isHoveredFacebook, setIsHoveredFacebook] = useState(false);
  const [isHoveredYoutube, setIsHoveredYoutube] = useState(false);
  const [isHoveredLinkedIn, setIsHoveredLinkedIn] = useState(false);
  const [isHoveredTwitter, setIsHoveredTwitter] = useState(false);

  // Fetch animations only when each icon is hovered to reduce initial load
  useEffect(() => {
    if (isHoveredFacebook) {
      fetch("/icons/Icon/facebook.json")
        .then((response) => response.json())
        .then((data) => setFacebookAnimation(data));
    }
  }, [isHoveredFacebook]);

  useEffect(() => {
    if (isHoveredYoutube) {
      fetch("/icons/Icon/youtube.json")
        .then((response) => response.json())
        .then((data) => setYoutubeAnimation(data));
    }
  }, [isHoveredYoutube]);

  useEffect(() => {
    if (isHoveredLinkedIn) {
      fetch("/icons/Icon/linkedin.json")
        .then((response) => response.json())
        .then((data) => setLinkedinAnimation(data));
    }
  }, [isHoveredLinkedIn]);

  useEffect(() => {
    if (isHoveredTwitter) {
      fetch("/icons/Icon/twitter.json")
        .then((response) => response.json())
        .then((data) => setTwitterAnimation(data));
    }
  }, [isHoveredTwitter]);

  return (
    <footer className="bg-[#221e1b] text-white py-16">
      <div className="container mx-auto flex flex-col items-center space-y-12 px-4">
        {/* Logo Section */}
        <div className="flex flex-col items-center max-w-md">
          <div className="h-20 relative w-auto mb-6">
            <Image
              src="/PKhedborg-logo.svg"
              alt="Foundation logo"
              width={80}
              height={80}
              priority
            />
          </div>
          <p className="text-center text-base md:text-lg">
            We are a nonprofit connecting Belgium and Sweden through culture, knowledge, and innovation.
          </p>
          <div className="w-60 mt-12 h-[2px] bg-gray-500"></div>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-8">
          {[
            {
              href: "https://facebook.com",
              alt: "Facebook",
              animation: facebookAnimation,
              setAnimation: setFacebookAnimation,
              isHovered: isHoveredFacebook,
              setIsHovered: setIsHoveredFacebook,
              src: "/icons/Icon/facebook.svg",
            },
            {
              href: "https://youtube.com",
              alt: "YouTube",
              animation: youtubeAnimation,
              setAnimation: setYoutubeAnimation,
              isHovered: isHoveredYoutube,
              setIsHovered: setIsHoveredYoutube,
              src: "/icons/Icon/youtube.svg",
            },
            {
              href: "https://linkedin.com",
              alt: "LinkedIn",
              animation: linkedinAnimation,
              setAnimation: setLinkedinAnimation,
              isHovered: isHoveredLinkedIn,
              setIsHovered: setIsHoveredLinkedIn,
              src: "/icons/Icon/linkedin-white.svg",
            },
            {
              href: "https://twitter.com",
              alt: "Twitter",
              animation: twitterAnimation,
              setAnimation: setTwitterAnimation,
              isHovered: isHoveredTwitter,
              setIsHovered: setIsHoveredTwitter,
              src: "/icons/Icon/twitter.svg",
            },
          ].map(({ href, alt, animation, isHovered, setIsHovered, src }) => (
            <div
              key={alt}
              className="w-[30px] h-[30px] flex items-center justify-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}>
                {isHovered && animation ? (
                  <Lottie
                    animationData={animation}
                    style={{ width: 30, height: 30, filter: "brightness(0) invert(1)" }}
                  />
                ) : (
                  <div className="relative h-6 w-6">
                    <Image
                      src={src}
                      alt={alt}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </div>
                )}
              </a>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-3 md:space-y-0 text-center text-sm md:text-base">
          <a href="/contact" className="hover:underline">
            Contact Us
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Statement
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm">
          <p>&copy; 2025 Petra & Karl Erik Hedborg Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;