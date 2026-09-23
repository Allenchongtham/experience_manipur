import craftImg from '../assets/craft.jpeg'; 
import handloomImg from '../assets/handloom.jpeg'; 
import bambooImg from '../assets/bamboo.jpeg';
import danceImg from '../assets/dance.jpeg';
import pungImg from '../assets/pung.jpeg';
import thangImg from '../assets/thang.jpeg';
import yubiImg from '../assets/yubi.jpeg';
import chahaoImg from '../assets/chahao.jpeg';
import sagolImg from '../assets/sagol.jpeg';
import thaliImg from '../assets/thali.jpeg';


export const MOCK_EXPERIENCES = [
  {
    id: "exp-1",
    title: "Kouna Weaving Mini Workshop",
    category: "handloom",
    description: "Discover the traditional art of weaving with Kouna (water reed). Learn basic plaiting techniques and create your own mini souvenir coaster.",
    duration_minutes: 90,
    price: 450,
    activity_level: "low",
    beginner_friendly: true,
    location_name: "Wangkhei Reed Craft Studio, Imphal",
    latitude: 24.8015,
    longitude: 93.9450,
    etiquette_note: "Please remove shoes before entering the artisan studio mat.",
    safety_note: "Safe for all ages. Standard blunt craft needles used.",
    age_guidance: "Ages 8+",
    rating: 4.8,
    review_count: 24,
    reviews: [
      { author: "Suraj M.", comment: "An incredible introduction to traditional water reed weaving! Very patient instruction.", rating: 5 },
      { author: "Priya K.", comment: "Loved making the coaster souvenir. Highly authentic setting.", rating: 4.5 }
    ],
    image_url: craftImg,
    host: { name: "Ibemhal Craft Collective", contact_label: "Demo Artisan Contact" },
    slots: [
      { id: "s1-1", date: "Today", start_time: "14:00", end_time: "15:30", available_seats: 4 }
    ]
  },
  {
    id: "exp-2",
    title: "Traditional Handloom Motif Story Session",
    category: "handloom",
    description: "An intimate storytelling session on ancient Manipuri handloom motifs (Shaphee Lanphee, Phanek patterns) and their royal historical origins.",
    duration_minutes: 60,
    price: 300,
    activity_level: "low",
    beginner_friendly: true,
    location_name: "Imphal Handloom Heritage Center",
    latitude: 24.7980,
    longitude: 93.9400,
    etiquette_note: "Photography is allowed without flash.",
    safety_note: "Fully accessible seated storytelling environment.",
    age_guidance: "All ages welcome",
    rating: 4.9,
    review_count: 38,
    reviews: [
      { author: "Dr. Ibomcha S.", comment: "Deeply educational. The historical context behind royal motifs is fascinating.", rating: 5 },
      { author: "Neha T.", comment: "Very peaceful and immersive storytelling.", rating: 4.8 }
    ],
    image_url: handloomImg,
    host: { name: "Weavers Heritage Guild", contact_label: "Demo Guild Contact" },
    slots: [
      { id: "s2-1", date: "Today", start_time: "16:00", end_time: "17:00", available_seats: 6 }
    ]
  },
  {
    id: "exp-3",
    title: "Bamboo and Cane Craft Introduction",
    category: "craft",
    description: "Hands-on intro to split-bamboo weaving techniques under guided supervision of master craftsman.",
    duration_minutes: 75,
    price: 400,
    activity_level: "low",
    beginner_friendly: true,
    location_name: "Khurai Artisan Hub",
    latitude: 24.8210,
    longitude: 93.9520,
    etiquette_note: "Respect materials provided by host.",
    safety_note: "Light bamboo handling tools provided with instruction.",
    age_guidance: "Ages 10+",
    rating: 4.7,
    review_count: 19,
    reviews: [
      { author: "Vikram N.", comment: "Master craftsman was extremely knowledgeable. Great hands-on feel.", rating: 5 },
      { author: "Bala M.", comment: "A bit challenging at first, but highly rewarding.", rating: 4.3 }
    ],
    image_url: bambooImg,
    host: { name: "Khurai Craft Circle", contact_label: "Demo Artisan Contact" },
    slots: [
      { id: "s3-1", date: "Today", start_time: "15:30", end_time: "16:45", available_seats: 3 }
    ]
  },
  {
    id: "exp-4",
    title: "Manipuri Dance Rhythm Orientation",
    category: "dance",
    description: "Experience the graceful hand gestures (Mudras) and rhythmic footwork patterns of Manipuri classical dance in a relaxed orientation setting.",
    duration_minutes: 60,
    price: 400,
    activity_level: "moderate",
    beginner_friendly: true,
    location_name: "Palace Compound Cultural Hall",
    latitude: 24.8030,
    longitude: 93.9480,
    etiquette_note: "Please wear comfortable stretchable attire. Remove footwear inside dance floor.",
    safety_note: "Gentle physical warmups included; suitable for beginners.",
    age_guidance: "Ages 10+",
    rating: 4.9,
    review_count: 42,
    reviews: [
      { author: "Anjana L.", comment: "Graceful, beautiful, and the instructor explained every mudra wonderfully.", rating: 5 },
      { author: "Michael R.", comment: "An absolute highlight of my trip to Imphal!", rating: 5 }
    ],
    image_url: danceImg,
    host: { name: "Nitya Cultural Academy", contact_label: "Demo Instructor Contact" },
    slots: [
      { id: "s4-1", date: "Today", start_time: "15:30", end_time: "16:30", available_seats: 8 }
    ]
  },
  {
    id: "exp-5",
    title: "Pung Cholom Rhythm Experience",
    category: "dance",
    description: "Feel the vibrant pulse of Manipur's traditional drum dance. Learn basic percussion beats and standing drum movements.",
    duration_minutes: 45,
    price: 350,
    activity_level: "moderate",
    beginner_friendly: true,
    location_name: "Achanbigei Rhythm Studio",
    latitude: 24.8320,
    longitude: 93.9380,
    etiquette_note: "Drums provided are traditional cultural instruments, please handle with care.",
    safety_note: "Moderate standing activity with light drum carrying.",
    age_guidance: "Ages 12+",
    rating: 4.8,
    review_count: 31,
    reviews: [
      { author: "Kishore Th.", comment: "The energy in the room when everyone drums together is electric!", rating: 5 },
      { author: "Sonia D.", comment: "Energetic and unforgettable rhythm session.", rating: 4.7 }
    ],
    image_url: pungImg,
    host: { name: "Manipuri Drum Arts Society", contact_label: "Demo Host Contact" },
    slots: [
      { id: "s5-1", date: "Today", start_time: "17:00", end_time: "17:45", available_seats: 5 }
    ]
  },
  {
    id: "exp-6",
    title: "Beginner Thang-Ta Cultural Orientation",
    category: "sports",
    description: "An instructor-led, non-contact introduction to Thang-Ta (Manipuri martial art), focusing on posture, footwork, and historical significance.",
    duration_minutes: 60,
    price: 500,
    activity_level: "moderate",
    beginner_friendly: true,
    location_name: "Khuman Lampak Martial Arts Arena",
    latitude: 24.8150,
    longitude: 93.9350,
    etiquette_note: "Follow instructor commands promptly. High respect for martial tradition expected.",
    safety_note: "Instructor-led and strictly non-contact; wooden practice props used. No unsupervised equipment handling.",
    age_guidance: "Ages 12+",
    rating: 5.0,
    review_count: 56,
    reviews: [
      { author: "Tomba S.", comment: "World-class martial heritage presentation. Must experience for anyone visiting Manipur.", rating: 5 },
      { author: "David H.", comment: "Safe, disciplined, and incredibly cool footwork drills.", rating: 5 }
    ],
    image_url: thangImg,
    host: { name: "Huyen Langlon Martial Academy", contact_label: "Demo Instructor Contact" },
    slots: [
      { id: "s6-1", date: "Today", start_time: "14:00", end_time: "15:00", available_seats: 5 }
    ]
  },
  {
    id: "exp-7",
    title: "Sagol Kangjei: Origins of Polo Story Session",
    category: "sports",
    description: "Learn about the ancient origins of modern Polo (Sagol Kangjei) in Manipur, traditional equipment, and pony heritage.",
    duration_minutes: 60,
    price: 300,
    activity_level: "low",
    beginner_friendly: true,
    location_name: "Mapal Kangjeibung (Historic Polo Ground)",
    latitude: 24.8070,
    longitude: 93.9360,
    etiquette_note: "Stay within designated audience areas around the historic grounds.",
    safety_note: "Seated gallery orientation session.",
    age_guidance: "All ages welcome",
    rating: 4.8,
    review_count: 29,
    reviews: [
      { author: "Rojen M.", comment: "Standing at the oldest polo ground in the world gave me goosebumps.", rating: 5 },
      { author: "Samantha W.", comment: "Great history talk about Manipuri ponies.", rating: 4.6 }
    ],
    image_url: sagolImg,
    host: { name: "Manipur Horse Riding & Polo Association", contact_label: "Demo Heritage Guide" },
    slots: [
      { id: "s7-1", date: "Today", start_time: "16:30", end_time: "17:30", available_seats: 10 }
    ]
  },
  {
    id: "exp-8",
    title: "Yubi Lakpi Cultural Demonstration",
    category: "sports",
    description: "Watch and understand the traditional indigenous coconut sport of Manipur, its rules, history, and physical discipline.",
    duration_minutes: 45,
    price: 250,
    activity_level: "moderate",
    beginner_friendly: true,
    location_name: "Kangla Fort Grounds Cultural Pavilion",
    latitude: 24.8085,
    longitude: 93.9420,
    etiquette_note: "Remain in spectator area during live movement drills.",
    safety_note: "Demonstration view with guided interactive Q&A.",
    age_guidance: "All ages welcome",
    rating: 4.6,
    review_count: 15,
    reviews: [
      { author: "Sanatomba K.", comment: "Very unique indigenous sport explanation. Loved the Q&A.", rating: 4.8 },
      { author: "Loya N.", comment: "Fascinating rules and physical grit required.", rating: 4.5 }
    ],
    image_url: yubiImg,
    host: { name: "Indigenous Games Council", contact_label: "Demo Council Contact" },
    slots: [
      { id: "s8-1", date: "Today", start_time: "14:30", end_time: "15:15", available_seats: 12 }
    ]
  },
  {
    id: "exp-9",
    title: "Traditional Meitei Thali Experience",
    category: "cuisine",
    description: "Sit down for an authentic, multi-course Meitei meal featuring Kangshoi, Eromba, and seasonal local greens.",
    price: 450,
    opening_hours: "11:00 AM - 8:00 PM",
    beginner_friendly: true,
    location_name: "Luxmi Kitchen (Demo), Khwairamband",
    latitude: 24.8110,
    longitude: 93.9370,
    etiquette_note: "Traditional dining is often done seated on floor mats. Wash hands before eating.",
    safety_note: "Inform host of extreme spice sensitivities.",
    age_guidance: "All ages welcome",
    rating: 4.9,
    review_count: 64,
    reviews: [
      { author: "Menaka P.", comment: "The Eromba and local herbs were out of this world. Pure comfort food.", rating: 5 },
      { author: "Abujam S.", comment: "Authentic home-style Meitei flavors. Highly recommended!", rating: 4.9 }
    ],
    image_url: thaliImg,
    host: { name: "Ima Culinary Collective", contact_label: "Demo Kitchen Contact" }
  },
  {
    id: "exp-10",
    title: "Chak-hao Kheer & Local Sweets Tasting",
    category: "cuisine",
    description: "A quick, sweet pitstop to taste Manipur's famous black rice pudding (Chak-hao Kheer) and traditional tea.",
    price: 150,
    opening_hours: "9:00 AM - 7:00 PM",
    beginner_friendly: true,
    location_name: "Leima Sweets (Demo), Paona Bazar",
    latitude: 24.8090,
    longitude: 93.9380,
    etiquette_note: "Casual walk-in cafe style.",
    safety_note: "Contains dairy and nuts.",
    age_guidance: "All ages welcome",
    rating: 4.7,
    review_count: 35,
    reviews: [
      { author: "Charity L.", comment: "Chak-hao Kheer is deliciously rich and nutty. Perfect dessert pitstop.", rating: 5 },
      { author: "Khurairatpam J.", comment: "Quick service and incredible aroma.", rating: 4.5 }
    ],
    image_url: chahaoImg,
    host: { name: "Leima Sweets", contact_label: "Demo Cafe Contact" }
  }
];