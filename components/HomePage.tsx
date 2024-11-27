'use client';

import React from 'react';
import { Roboto_Mono } from 'next/font/google';
import Link from 'next/link';

const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  display: 'swap',
});

interface Workshop {
  id: string;
  number: string;
  title: string;
  shape?: 'pentagon' | 'hexagon' | 'octagon' | 'nonagon' | 'decagon'| 'hendecagon';
  slug: string;
}

const workshops: Workshop[] = [
  {
    id: '1',
    number: '001',
    title: 'Data Collection',
    shape: 'pentagon',
    slug: 'data-collection'
  },
  {
    id: '2',
    number: '002',
    title: 'Data Labelling',
    shape: 'hexagon',
    slug: 'data-collection'
  },
  {
    id: '3',
    number: '003',
    title: 'Data Training',
    shape: 'octagon',
    slug: 'data-collection'
  },
  {
    id: '4',
    number: '004',
    title: 'Algorithm Choice',
    shape: 'nonagon',
    slug: 'data-collection'
  },
  {
    id: '5',
    number: '005',
    title: 'Algorithmic Model',
    shape: 'decagon',
    slug: 'data-collection'
  },
  {
    id: '6',
    number: '006',
    title: 'Interace Implementation',
    shape: 'hendecagon',
    slug: 'data-collection'
  },
];

const getPolygonClipPath = (shape: Workshop['shape'] = 'hexagon') => {
  const shapes = {
    pentagon: 'clip-path-pentagon',
    hexagon: 'clip-path-hexagon',
    octagon: 'clip-path-octagon',
    nonagon: 'clip-path-nonagon',
    decagon: 'clip-path-decagon',
    hendecagon: 'clip-path-hendecagon'
  };
  
  return shapes[shape] || shapes.hexagon;
};

const WorkshopCard = ({ number, title, shape, slug }: { 
  number: string; 
  title: string;
  shape?: Workshop['shape'];
  slug: string;
}) => {
  return (
    <Link href={`/workshops/${slug}`} className="flex-shrink-0 px-4">
    <div className="flex-shrink-0 px-4 py-8"> {/* Added vertical padding for hover growth */}
      <div className={`relative aspect-square w-[500px] ${getPolygonClipPath(shape)}`}>
        <div className="absolute inset-0 bg-[#7EE66B] hover:bg-[#6CD559] transition-colors duration-300 cursor-pointer group">
          <div className="flex flex-col items-center justify-center h-full p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-lg mb-4 font-light">{number}</span>
            <h3 className="text-lg font-light">{title}</h3>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

const HomePage = () => {
  return (
    <div className={`min-h-screen bg-white ${robotoMono.className}`}>
      <main className="w-full py-8">
        <div className="max-w-[1600px] mx-auto px-8">
          <h1 className="text-4xl sm:text-xl mb-8 font-light">Imagine Algorithm</h1>
          
          <p className="text-gray-700 mb-16 max-w-2xl font-light">
            This is a framework of 6 workshops designed to help youth understand the steps involved
            in the making of a machine learning algorithm - from data collection to implementation.
            Through a creative interrogation of these steps, we are going to identify and expose
            issues of exploitation and control, and the impact these algorithms have on our
            collective civic-autonomy. We are going think about the development and implementation
            of a better and more inclusive alternative, and how we might participate in high level
            policy conversations.
          </p>

          <h2 className="text-4xl sm:text-xl mb-8 font-light">Workshops</h2>
        </div>
        
        <div className="relative w-full overflow-hidden"> {/* Added overflow-hidden */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-8 px-8 py-4"> {/* Added vertical padding */}
              {workshops.map((workshop) => (
                <WorkshopCard 
                  slug={workshop.slug}
                  key={workshop.id}
                  number={workshop.number}
                  title={workshop.title}
                  shape={workshop.shape}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;