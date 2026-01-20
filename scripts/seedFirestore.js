import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';
import dotenv from 'dotenv';

const envFiles = ['.env.local', '.env'];
envFiles.forEach((envFile) => {
  const envPath = path.resolve(envFile);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: false });
  }
});

const serviceAccountPath = process.env.FIREBASE_ADMIN_KEY_PATH;

if (!serviceAccountPath) {
  console.error('Missing FIREBASE_ADMIN_KEY_PATH in your environment.');
  process.exit(1);
}

const resolvedKeyPath = path.resolve(serviceAccountPath);

if (!fs.existsSync(resolvedKeyPath)) {
  console.error(`Service account file not found at ${resolvedKeyPath}`);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(resolvedKeyPath, 'utf-8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

const homeContent = {
  hero: {
    heading: 'Auto Spare Parts & Service Trusted in Sungai Petani',
    subheading: 'Supplying genuine, Taiwan, and used parts, windscreen services, batteries, and more for Malaysian vehicles. Quality service you can rely on.',
    establishedText: 'Established 1951',
    actions: {
      whatsapp: 'https://wa.me/60164392448',
      shopee: 'https://shopee.com.my/mavsss33?entryPoint=ShopBySearch&searchKeyword=veerappan',
      lazada: 'https://s.lazada.com.my/s.GDdC9?dsource=share&laz_share_info=2355118494_103_1600_0_2355120494_null&laz_token=354ad6ed4ab37e4190b0e2fa2b4d9204'
    }
  },
  stats: [
    {
      title: 'Operating since 1951',
      description: '70+ years of trusted service in Sungai Petani, Kedah.'
    },
    {
      title: 'Massive Parts Inventory',
      description: 'Wide variety of parts for many brands and models.'
    },
    {
      title: 'Fast Turnaround',
      description: 'Quick sourcing and service to get you back on the road.'
    },
    {
      title: 'Serving all Malaysia',
      description: 'Sungai Petani HQ with nationwide delivery.'
    }
  ],
  featuredServices: [
    {
      title: 'Genuine Parts',
      badge: 'Most Recommended',
      description: "Original manufacturer parts for maximum reliability and performance. We stock parts for Toyota, Honda, Proton, and more.",
      link: '/services'
    },
    {
      title: 'Windscreen Services',
      badge: 'Insurance Panel',
      description: 'Expert replacement and repair services. As an authorized insurance panel, we handle your claims smoothly.',
      link: '/services'
    },
    {
      title: 'Taiwan Parts',
      description: 'High-quality aftermarket parts imported from Taiwan, offering an excellent balance of performance and value.',
      link: '/services'
    },
    {
      title: 'Used Parts',
      description: 'Carefully tested used parts (half-cut) to keep repairs affordable without compromising too much on quality.',
      link: '/services'
    },
    {
      title: 'New Parts',
      description: 'Brand-new replacements for engine and body components, ensuring your vehicle looks and runs like new.',
      link: '/services'
    },
    {
      title: 'Battery',
      description: 'Long-lasting batteries for cars, MPVs and lorries, with installation services available.',
      link: '/services/battery-solutions'
    },
    {
      title: 'Workshop Services',
      description: 'Partner workshops for installation, diagnostics, and preventive maintenance.',
      link: '/services/workshop'
    },
    {
      title: 'Buy Scrap Cars',
      description: 'We purchase accident, flood, and end-of-life vehicles, handle paperwork, and harvest usable parts responsibly.',
      link: '/services/buy-scrap-car'
    }
  ],
  brands: ['Toyota', 'Honda', 'Proton', 'Perodua', 'Nissan'],
  highlights: [
    'OEM, Taiwan & Used Options',
    'Carefully Checked Stock',
    'Insurance Panel Experts',
    'Delivery & Pickup Options'
  ],
  reasons: [
    {
      title: 'Reliable Reputation',
      description: 'Serving Sungai Petani since 1983 with long-term customer relationships.'
    },
    {
      title: 'Wide Variety',
      description: 'Massive stock for many brands ensures you get what you need.'
    },
    {
      title: 'Professional Service',
      description: 'Fast, efficient service by skilled technicians with honest advice.'
    }
  ],
  process: [
    {
      title: 'Share Your Vehicle Details',
      description: 'Tell us your car model, year, and what you are facing – from worn brakes to a cracked windscreen.',
      order: 1
    },
    {
      title: 'We Match The Right Parts',
      description: 'We check stock across genuine, Taiwan, and used options, confirming exact fitment.',
      order: 2
    },
    {
      title: 'Clear Recommendation',
      description: 'We explain choices, benefits, and pricing in simple terms so you can decide easily.',
      order: 3
    },
    {
      title: 'Fast Collection or Delivery',
      description: 'Pick up from Sungai Petani or arrange delivery anywhere in Malaysia.',
      order: 4
    }
  ],
  quality: [
    {
      title: 'Authenticity Verified',
      description: "We strictly source genuine parts from authorized distributors so you always receive authentic components."
    },
    {
      title: 'Rigorous Testing',
      description: 'Every used (half-cut) part is physically inspected and tested by our mechanics.'
    },
    {
      title: 'Honest Advisory',
      description: 'We advise based on your car’s age and budget for the best value.'
    }
  ],
  faqs: [
    {
      question: 'Do you deliver outside of Sungai Petani?',
      answer: 'Yes, we arrange delivery across Malaysia with careful packing to ensure parts arrive safely.'
    },
    {
      question: 'Do you provide installation services?',
      answer: 'We have skilled technicians for batteries, windscreens, and selected parts at our workshop.'
    },
    {
      question: 'How do I check if you have a specific part?',
      answer: 'WhatsApp us your car model, year, and part photo—we will check inventory immediately.'
    },
    {
      question: 'Are your used parts tested?',
      answer: 'All used parts go through thorough inspection before being offered for sale.'
    }
  ],
  contactCta: {
    title: 'Need parts or windscreen service today?',
    subheading: 'Talk directly with our team for stock checks, quotes, or urgent support.',
    phone: '04-4212448',
    whatsapp: '+60 16-439 2448',
    hours: 'Everyday 9am–6pm · Sunday Closed'
  }
};

const aboutContent = {
  founder: {
    name: 'M.A. Veerappan Chettiar',
    title: 'Founder',
    image: '/founder.png'
  },
  directors: [
    { name: 'Shanmugam A/L Veerappan', title: 'Director', image: '/director-1.png' },
    { name: 'Subramaniam A/L Veerappan', title: 'Director', image: '/WhatsApp Image 2026-01-16 at 18.44.17.jpeg' },
    { name: 'Magalingam A/L Veerappan', title: 'Director', image: '/director-2.png' },
    { name: 'Arumugam A/L Veerappan', title: 'Director', image: '/director-3.png' }
  ],
  history: [
    {
      year: '1951',
      title: 'Humble Beginnings',
      description: 'Family-run used bottle recycling hub that mastered material sorting, logistics, and reuse.'
    },
    {
      year: '1965',
      title: 'Scrap & Secondhand',
      description: 'Expanded into “barang-barang lusuh”, sourcing scrap goods across Malaysia.'
    },
    {
      year: '1983',
      title: 'Used Auto Parts',
      description: 'Shifted into supplying trusted used components to workshops and owners.'
    },
    {
      year: '1990',
      title: 'New Parts Distribution',
      description: 'Partnered with manufacturers for new OEM and aftermarket parts nationwide.'
    }
  ],
  mission: {
    vision: 'To be the leading automotive spare parts supplier and automotive service provider in the market.',
    missionPoints: [
      'Achieve the highest level of customer satisfaction.',
      'Deliver quality work in the most efficient and economical way.'
    ]
  },
  principle: 'We strive to enhance our services and ensure our customers reach 100% satisfaction.',
  legacyCopy: 'From recycling bottles to becoming a respected auto parts dealer, M.A. Veerappan Auto Sdn Bhd has transformed over seven decades by anticipating market needs, diversifying boldly, and cultivating loyal relationships with customers and suppliers.'
};

const servicesData = [
  {
    slug: 'taiwan-parts',
    title: 'Taiwan Parts',
    summary: 'High-quality aftermarket parts that offer the perfect balance of performance, durability, and cost-effectiveness.',
    benefits: [
      'Cost Effective – Save more than genuine parts without sacrificing quality.',
      'High Availability – Wide range of stock ready for popular models.',
      'Reliable Quality – From reputable Taiwanese manufacturers like DEPO and TYC.'
    ],
    offerings: {
      text: 'We specialize in imported aftermarket parts that fit perfectly and last long.',
      items: ['Body Parts (Bumpers, Fenders, Hoods)', 'Lighting Systems (Headlamps, Tail lamps)', 'Cooling Systems (Radiators, Fans)', 'Suspension Components']
    }
  },
  {
    slug: 'genuine-parts',
    title: 'Genuine Parts',
    summary: 'Authorized original manufacturer parts for Toyota, Honda, Proton, and Perodua. Zero compromise on quality.',
    benefits: [
      'Perfect Fitment – Guaranteed to fit exactly as factory intended.',
      'Resale Value – Maintains your vehicle’s market value.',
      'Longest Lifespan – Made to withstand harsh conditions.'
    ],
    offerings: {
      text: 'We are stockists for major automotive brands, ensuring authentic parts in original packaging.',
      items: ['Engine Components', 'Electronic Sensors & ECUs', 'Original Body Kits & Trims', 'Service Items (Filters, Belts)']
    }
  },
  {
    slug: 'used-parts',
    title: 'Used Parts (Half-Cut)',
    summary: 'Carefully tested used parts sourced from half-cut vehicles. The smart way to fix major components on a budget.',
    benefits: [
      'Budget Friendly – Affordable for expensive items like gearboxes or engines.',
      'Original Quality – Genuine parts, just pre-owned.',
      'Hard-to-Find Items – Best source for discontinued interior parts.'
    ],
    offerings: {
      text: 'We inspect every used part before it goes on the shelf.',
      items: ['Engines & Gearboxes', 'Alternators & Starters', 'Body Panels', 'Interior Consoles & Switches', 'Automotive Glass']
    }
  },
  {
    slug: 'new-parts',
    title: 'New Parts',
    summary: 'Comprehensive stock of brand new replacement parts for routine maintenance and repairs.',
    benefits: [
      'Factory Fresh – Maximum reliability.',
      'Wide Selection – Multiple brands for every part.',
      'Immediate Stock – High-volume items ready to go.'
    ],
    offerings: {
      text: 'From brake pads to engine mountings, we supply everything needed for service or repair.',
      items: ['Brake Pads & Discs', 'Suspension Arms & Bushes', 'Drive Shafts', 'Lubricants & Fluids']
    }
  },
  {
    slug: 'windscreen-services',
    title: 'Windscreen Services',
    summary: 'Professional windscreen replacement and repair. Authorized insurance panel workshop.',
    benefits: [
      'Insurance Panel – We handle claims for major providers.',
      'Safety Compliant – Glass meets Malaysian safety standards.',
      'Leak-Free Guarantee – High-grade sealants for water-tight installs.'
    ],
    offerings: {
      text: "Don't drive with a cracked view. We provide end-to-end glass solutions.",
      items: ['Front & Rear Windshield Replacement', 'Door Glass Replacement', 'Insurance Claim Processing', 'Rubber Seal Replacement']
    }
  },
  {
    slug: 'battery-solutions',
    title: 'Battery Solutions',
    summary: 'Wide range of high-performance car batteries with professional installation and testing.',
    benefits: [
      'Free Check – Test old battery and alternator rate.',
      'Fresh Stock – High turnover for fresh batteries.',
      'Warranty Included – Standard manufacturer coverage.'
    ],
    offerings: {
      text: 'We power everything from compact cars to lorries.',
      items: ['Maintenance Free Batteries', 'Conventional Batteries', 'DIN & JIS Sizes', 'Terminal Cleaning & Protection']
    }
  },
  {
    slug: 'workshop',
    title: 'Workshop Services',
    summary: 'Professional installation partners for mechanical repairs, diagnostics, and preventive maintenance.',
    benefits: [
      'Certified Partners – Vetted workshops for Malaysian and Japanese vehicles.',
      'Transparent Pricing – Upfront labour and parts cost.',
      'Convenient Scheduling – Book installation when you collect parts.'
    ],
    offerings: {
      text: 'From maintenance to troubleshooting complex issues, our partners have you covered.',
      items: ['Installation of purchased parts', 'Diagnostic scans & troubleshooting', 'Brake, suspension, and steering repairs', 'Engine oil service & fluid changes']
    }
  },
  {
    slug: 'buy-scrap-car',
    title: 'Buy Scrap Cars',
    summary: 'We purchase accident, flood, or end-of-life vehicles for parts harvesting and responsible recycling.',
    benefits: [
      'Fair Market Offers – Transparent valuations.',
      'Fast Collection – Towing or on-site pickup across northern states.',
      'Paperwork Assistance – Guidance on deregistration and documentation.'
    ],
    offerings: {
      text: 'Turn your unusable vehicle into instant cash or parts credit.',
      items: ['Accident / Total Loss Vehicles', 'Flood-Damaged Units', 'Non-Running Cars & Vans', 'Commercial Vehicles & 4x4s']
    }
  }
];

async function seedCollections() {
  console.log('Seeding home content...');
  await db.collection('home').doc('content').set(homeContent, { merge: true });

  console.log('Seeding about content...');
  await db.collection('about').doc('content').set(aboutContent, { merge: true });

  console.log('Seeding services collection...');
  const batch = db.batch();
  servicesData.forEach((service) => {
    const ref = db.collection('services').doc(service.slug);
    batch.set(ref, service, { merge: true });
  });
  await batch.commit();
}

seedCollections()
  .then(() => {
    console.log('Firestore seeding complete.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error seeding Firestore:', err);
    process.exit(1);
  });
