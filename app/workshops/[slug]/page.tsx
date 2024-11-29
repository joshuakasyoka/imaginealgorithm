'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface HexButtonProps {
  href: string;
  label: string;
}

const HexButton = ({ href, label }: HexButtonProps) => (
  <Link 
    href={href}
    className="relative w-32 h-36 flex items-center justify-center group"
  >
    <div className="absolute w-full h-full bg-[#BFE752] clip-hex transition-transform hover:scale-105" />
    <span className="relative text-white z-10 font-light text-center px-4">
      {label}
    </span>
  </Link>
);

const workshops = {
  'data-collection': {
    number: '001',
    title: 'Data Collection',
    content: [
      {
        section: 'Overview',
        text: 'This workshop explores the concept of data collection -- while the data used to train machine learning algorithms can be incredibly personal, reflecting human choices and behaviours, it is often framed using mechanical language and encourages feelings of detachment. We are going to talk through key issues with our current model of data collection, and work towards a more inclusive alternative.'
      },
      {
        section: 'Objectives',
        text: 'As with other workshops as part of this series, we are exploring concepts of transparency and opacity and the process of obfuscation -- these activties encourage participants to reflect on the transparency demands placed on us by big-tech and how we might leverage our own data to shift this dynamic'
      },
      {
        section: 'Photos',
        type: 'gallery' as const,
        text: 'Documentation from previous workshops:',
        images: [
          {
            src: '/workshop1/image1.png',
            alt: 'Workshop participants discussing data collection',
            caption: 'Group discussion on data privacy'
          },
          {
            src: '/workshop1/image2.png',
            alt: 'Interactive exercise results',
            caption: 'Results from our data mapping exercise'
          },
          {
            src: '/workshop1/image3.png',
            alt: 'Workshop materials',
            caption: 'Materials used in the workshop'
          }
        ]
      },
      {
        section: 'Quick Links',
        type: 'buttons' as const,
        text: 'Access workshop resources:',
        buttons: [
          {
            href: '/tools/data-tool',
            label: 'Simulation'
          },
          {
            href: '/tools/',
            label: 'Consideration'
          },
          {
            href: '/tools/data-set-tool',
            label: 'Formaulation'
          }
        ]
      }
    ]
  }
};

interface ImageData {
  src: string;
  alt: string;
  caption: string;
}

interface ButtonData {
  href: string;
  label: string;
}

interface ContentSection {
  section: string;
  text: string;
  type?: 'gallery' | 'buttons';
  images?: ImageData[];
  buttons?: ButtonData[];
}

export default function WorkshopPage() {
  const params = useParams();
  const slug = params.slug as string;
  const workshop = workshops[slug as keyof typeof workshops];

  if (!workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Workshop not found</h1>
          <Link href="/" className="text-[#BFE752] hover:text-[#6CD559]">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const renderSection = (section: ContentSection, index: number) => {
    if (section.type === 'gallery' && section.images) {
      return (
        <div key={index} className="mb-16">
          <h2 className="text-2xl font-light mb-4">{section.section}</h2>
          <p className="text-gray-700 font-light mb-8">{section.text}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {section.images.map((image, imgIndex) => (
              <div key={imgIndex} className="space-y-2">
                <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm text-gray-600 font-light">{image.caption}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (section.type === 'buttons' && section.buttons) {
      return (
        <div key={index} className="mb-16">
          <h2 className="text-2xl font-light mb-4">{section.section}</h2>
          <p className="text-gray-700 font-light mb-8">{section.text}</p>
          <div className="flex flex-wrap gap-8 justify-center">
            {section.buttons.map((button, btnIndex) => (
              <HexButton key={btnIndex} {...button} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div key={index} className="mb-12">
        <h2 className="text-2xl font-light mb-4">{section.section}</h2>
        <p className="text-gray-700 font-light">{section.text}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <Link href="/" className="text-[#BFE752] hover:text-[#6CD559]">
            ← Return
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-sm font-light mb-2 block">{workshop.number}</span>
            <h1 className="text-4xl font-light mb-8">{workshop.title}</h1>
          </div>

          {workshop.content.map((section, index) => renderSection(section, index))}
        </div>
      </main>

      <style jsx global>{`
        .clip-hex {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
  );
}