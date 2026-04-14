import React from 'react';
import styled from 'styled-components';
import { FiPackage } from 'react-icons/fi';
import MenstrualClothimg from '../assets/images/images1/MenstrualClothimg.png';
import Reusablepadimg from '../assets/images/images1/Reusablepadimg.png';
import sanitarypadimg from '../assets/images/images1/sanitarypadimg.png';
import Tamponimg from '../assets/images/images1/Tamponimg.png';
import MenstrualCupimg from '../assets/images/images1/MenstrualCupimg.png';

const Menstrualproducts = () => {
  const products = [
    {
      name: 'Menstrual Cloth',
      image: MenstrualClothimg,
      description: 'Cloths are reusable pieces of fabric worn externally to the body, in underwear or tied to the waist to absorb menstrual flow. They are made from either newly purchased pieces of fabric (mostly cotton) or old fabric repurposed from clothing or another use. There is no guidance on how long clothes can be reused, but it is generally agreed that this should be for no longer than 1 year. They are consumable and require regular assessment of supply, availability and affordability.',
      color: 'primary'
    },
    {
      name: 'Reusable Pad',
      image: Reusablepadimg,
      description: 'Reusable pads are worn externally to the body in the underwear, to absorb menstrual flow and held in place usually by snaps. They are made from a variety of natural or synthetic materials. After use, they are washed, dried and re-used for approximately one year. They are consumables which require regular assessment of supply, availability and affordability.',
      color: 'secondary'
    },
    {
      name: 'Disposable Sanitary Pad',
      image: sanitarypadimg,
      description: 'Disposable pads are worn externally to the body in the underwear to absorb menstrual flow. They are disposed of after a maximum of 8 hours; they are therefore consumable, which requires regular assessment of supply, availability and affordability. Pads come in various sizes, absorbencies and materials and consist of a layered design made of blends of plastics, rayon and cotton. Pads should include wings to prevent leakage and keep the pad more securely in place.',
      color: 'accent'
    },
    {
      name: 'Tampon',
      image: Tamponimg,
      description: 'Tampons are absorbent materials made from cotton and/or rayon that are inserted into the vagina to absorb menstrual flow. They expand with moisture and thereby avoid leakage. They can be worn for up to 8 hours, after which they are removed using the removal string, and disposed of. They come in a variety of sizes, materials and with or without an applicator to assist insertion. Tampons are consumables which require regular assessment of supply, availability and affordability.',
      color: 'primary'
    },
    {
      name: 'Menstrual Cup',
      image: MenstrualCupimg,
      description: 'The menstrual cup is a non-absorbent bell-shaped device that is inserted into the vagina to collect menstrual flow. It creates a seal and is held in place by the walls of the vagina. It is typically made of medical-grade silicone. It collects three times more blood than pads or tampons and needs to be emptied every 6-12 hours, after which it is rinsed and re-inserted (if facilities allow). After each menstrual cycle the cup must be boiled for 5-10 minutes. Most manufacturers offer at least two sizes, and different shapes are becoming more common. Cups are reusable for 5-10 years.',
      color: 'secondary'
    }
  ];

  return (
    <PageWrapper>
      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>

      {/* Hero Section */}
      <HeroSection>
        <span className="section-eyebrow">Resources</span>
        <h1 className="hero-title">
          Menstrual Health & <span className="title-accent">Hygiene Products</span>
        </h1>
        <p className="hero-subtitle">Understanding Different Menstrual Products</p>
        <p className="hero-description">
          Learn about various menstrual hygiene products available and their proper usage.
        </p>
      </HeroSection>

      {/* Products Grid */}
      <ProductsGrid>
        {products.map((product, i) => (
          <ProductCard key={i} className={`color-${product.color}`}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
          </ProductCard>
        ))}
      </ProductsGrid>
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
    bottom: 20%;
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
    background: var(--color-accent-50);
    color: var(--color-accent-700);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-5);
    border: 1px solid var(--color-accent-100);
  }

  .hero-title {
    font-family: var(--font-heading);
    font-size: var(--text-5xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-4);
    line-height: 1.1;
  }

  .title-accent {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: var(--text-xl);
    color: var(--color-dark-600);
    font-weight: 500;
    margin-bottom: var(--space-5);
  }

  .hero-description {
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
`;

const ProductCard = styled.div`
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft-lg);
  }

  &.color-primary {
    border-top: 3px solid var(--color-primary-500);
  }

  &.color-secondary {
    border-top: 3px solid var(--color-secondary-500);
  }

  &.color-accent {
    border-top: 3px solid var(--color-accent-500);
  }

  .product-image {
    width: 100%;
    height: 200px;
    margin-bottom: var(--space-4);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--color-dark-50);

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  h4 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-3);
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-600);
    line-height: 1.7;
  }
`;

export default Menstrualproducts;



