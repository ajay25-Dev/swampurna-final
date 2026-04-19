import React, { useState } from 'react';
import styled from 'styled-components';
import { FiX, FiZoomIn } from 'react-icons/fi';
import { useContentItems } from '../hooks/useContentItems';

// Import all gallery images
import Picture1 from '../assets/images/gallery/Picture1.jpg';
import Picture2 from '../assets/images/gallery/Picture2.jpg';
import Picture3 from '../assets/images/gallery/Picture3.jpg';
import Picture4 from '../assets/images/gallery/Picture4.jpg';
import Picture5 from '../assets/images/gallery/Picture5.jpg';
import Picture6 from '../assets/images/gallery/Picture6.jpg';
import Picture7 from '../assets/images/gallery/Picture7.jpg';
import Picture8 from '../assets/images/gallery/Picture8.jpg';
import Picture9 from '../assets/images/gallery/Picture9.jpg';
import Picture10 from '../assets/images/gallery/Picture10.jpg';
import Picture11 from '../assets/images/gallery/Picture11.jpg';
import Picture12 from '../assets/images/gallery/Picture12.jpg';
import Picture13 from '../assets/images/gallery/Picture13.jpg';
import Picture14 from '../assets/images/gallery/Picture14.jpg';
import Picture15 from '../assets/images/gallery/Picture15.jpg';
import Picture16 from '../assets/images/gallery/Picture16.jpg';
import Picture17 from '../assets/images/gallery/Picture17.jpg';
import Picture18 from '../assets/images/gallery/Picture18.jpg';
import Picture19 from '../assets/images/gallery/Picture19.jpg';
import Picture20 from '../assets/images/gallery/Picture20.jpg';
import Picture21 from '../assets/images/gallery/Picture21.jpg';
import Picture22 from '../assets/images/gallery/Picture22.jpg';
import Picture23 from '../assets/images/gallery/Picture23.jpg';
import Picture24 from '../assets/images/gallery/Picture24.jpg';
import Picture25 from '../assets/images/gallery/Picture25.jpg';
import Picture26 from '../assets/images/gallery/Picture26.jpg';
import Picture27 from '../assets/images/gallery/Picture27.jpg';
import Picture28 from '../assets/images/gallery/Picture28.jpg';
import Picture29 from '../assets/images/gallery/Picture29.jpg';
import Picture30 from '../assets/images/gallery/Picture30.jpg';
import Picture31 from '../assets/images/gallery/Picture31.jpg';
import Picture32 from '../assets/images/gallery/Picture32.jpg';

const Photogallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const fallbackImages = [
    Picture1, Picture2, Picture3, Picture4, Picture5, Picture6, Picture7, Picture8,
    Picture9, Picture10, Picture11, Picture12, Picture13, Picture14, Picture15, Picture16,
    Picture17, Picture18, Picture19, Picture20, Picture21, Picture22, Picture23, Picture24,
    Picture25, Picture26, Picture27, Picture28, Picture29, Picture30, Picture31, Picture32
  ];

  const { items } = useContentItems({
    page: "Photogallery",
    section: "gallery_images",
    fallback: fallbackImages.map((image, index) => ({
      image_url: image,
      sort_order: index,
    })),
  });

  const images = (items || [])
    .map((item) => item.image_url)
    .filter(Boolean);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <PageWrapper>
      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>

      {/* Hero Section */}
      <HeroSection>
        <span className="section-eyebrow">Media</span>
        <h1 className="hero-title">
          Photo <span className="title-accent">Gallery</span>
        </h1>
        <p className="hero-description">
          Explore our collection of photos showcasing our events, workshops, and community engagement activities.
        </p>
      </HeroSection>

      {/* Gallery Grid */}
      <GallerySection>
        <GalleryGrid>
          {images.map((image, index) => (
            <GalleryItem key={index} onClick={() => openModal(image)}>
              <img src={image} alt={`Gallery image ${index + 1}`} />
              <Overlay>
                <FiZoomIn />
              </Overlay>
            </GalleryItem>
          ))}
        </GalleryGrid>
      </GallerySection>

      {/* Modal for full-size image */}
      {selectedImage && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>
              <FiX />
            </CloseButton>
            <ModalImage src={selectedImage} alt="Full size gallery image" />
          </ModalContent>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  padding: var(--space-8) var(--space-6) var(--space-16);
  overflow: hidden;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;

  .bg-decoration {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: -1;
  }

  .deco-circle {
    position: absolute;
    border-radius: 50%;
  }

  .circle-1 {
    width: 500px;
    height: 500px;
    top: -150px;
    right: -200px;
    background: radial-gradient(circle, rgba(217, 118, 82, 0.08) 0%, transparent 70%);
  }

  .circle-2 {
    width: 400px;
    height: 400px;
    bottom: 10%;
    left: -150px;
    background: radial-gradient(circle, rgba(90, 148, 112, 0.06) 0%, transparent 70%);
  }

  @media (max-width: 768px) {
    padding: var(--space-6) var(--space-4) var(--space-12);
  }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: var(--space-12);

  .section-eyebrow {
    display: inline-block;
    padding: var(--space-2) var(--space-5);
    background: var(--color-primary-50);
    color: var(--color-primary-700);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-5);
    border: 1px solid var(--color-primary-100);
  }

  .hero-title {
    font-family: var(--font-heading);
    font-size: var(--text-5xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-5);
    line-height: 1.1;
  }

  .title-accent {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: var(--text-lg);
    color: var(--color-dark-500);
    line-height: 1.8;
    max-width: 700px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const GallerySection = styled.section`
  margin-bottom: var(--space-12);
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
  padding: var(--space-4) 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--space-4);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-3);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-base);
  color: white;
  font-size: 2rem;
`;

const GalleryItem = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  cursor: pointer;
  background: var(--color-dark-100);
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);

    img {
      transform: scale(1.05);
    }

    ${Overlay} {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: var(--space-4);
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-dark-900);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-base);
  font-size: 1.5rem;
  z-index: 10001;

  &:hover {
    background: white;
    transform: rotate(90deg);
  }
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: var(--radius-xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

export default Photogallery;


