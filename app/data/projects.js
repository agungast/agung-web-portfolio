import { site } from './site'

export const projects = [
  {
    id: 'wicara',
    title: 'WICARA – Campus Complaints & Service Rating',
    subtitle: 'Integrated Campus Reporting & Rating Ecosystem',
    category: 'web-mobile',
    description: 'An end-to-end digital ecosystem comprising a responsive Web Admin Panel and Flutter Mobile App for campus reporting, lost & found, and service ratings.',
    fullDescription: 'Developed through Project-Based Learning at Polines. Designed comprehensive information architecture, user flows, and high-fidelity Figma prototypes for both the Web Admin Panel and Mobile App. Implemented the responsive web frontend within the Laravel ecosystem and built the cross-platform mobile client using Flutter, maintaining strict design system fidelity and end-to-end Git version control.',
    features: [
      'Web Admin Panel (Laravel) & Mobile App (Flutter)',
      'Figma Information Architecture, User Flows & Hi-Fi Prototypes',
      'Lost & Found Reporting with Status Tracking',
      'Academic Service Rating & Feedback Analytics',
      'Pixel-perfect Design System Execution & Git Integration'
    ],
    tags: ['Figma', 'UI/UX Design', 'Laravel', 'Flutter', 'Git & GitHub'],
    icon: 'ph:chat-circle-dots-bold',
    githubUrl: site.githubUrl
  },
  {
    id: 'gudangku',
    title: 'GUDANGKU – Warehouse Management System',
    subtitle: 'Inventory Tracking & Real-Time Stock Dashboard',
    category: 'web-mobile',
    description: 'A centralized warehouse management web dashboard for real-time stock monitoring, inventory flow, and simplified operational data entry.',
    fullDescription: 'Engineered during Project-Based Learning at Polines. Designed intuitive user flows and high-fidelity dashboard UI in Figma, then executed the frontend implementation using Laravel. Optimized complex UI components including structured data tables, status KPI cards, and custom data filters to streamline daily warehouse workflows.',
    features: [
      'Real-time Inventory & Stock Level Tracking',
      'Figma Dashboard UI & Information Architecture',
      'Dynamic Data Tables, Status Cards & Advanced Filters',
      'Optimized UI Component Architecture for Rapid Entry',
      'Collaborative Git Repository & Branch Workflow'
    ],
    tags: ['Figma', 'UI/UX Design', 'Laravel', 'Blade', 'Git & GitHub'],
    icon: 'ph:package-bold',
    githubUrl: site.githubUrl
  },
  {
    id: 'tanikita',
    title: 'TaniKita – Mobile App for Farmer Empowerment',
    subtitle: 'HIMI UNSURYA National UI/UX Design Competition 2025',
    category: 'uiux',
    description: 'A user-centered mobile app concept and interactive prototype designed to optimize agricultural supply chains and empower local farmers.',
    fullDescription: 'Crafted for the national UI/UX Design Competition HIMI UNSURYA (February 2025). Conducted in-depth user research, problem framing, and persona development tailored to agricultural supply chains and digital literacy levels. Created intuitive high-fidelity prototypes in Figma under tight competition deadlines from ideation to final deliverables.',
    features: [
      'User Research & Problem Framing for Agricultural Supply',
      'User Personas & Digital Literacy-Friendly Flows',
      'Interactive Figma High-Fidelity Prototype Simulation',
      'Supply Chain Efficiency & Logistics Architecture',
      'Rapid Prototyping under Competitive Deadlines'
    ],
    tags: ['Figma', 'UI/UX Design', 'User Research', 'Wireframing', 'Interactive Prototype'],
    icon: 'ph:plant-bold',
    githubUrl: site.githubUrl
  }
]
