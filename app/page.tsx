"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Icon = ({ name, size = 20 }: { name: string; size?: number }) => {
  const paths: Record<string, string> = {
    leaf: "M18 3C10 3 4 7 4 14c0 4 3 7 7 7 7 0 10-7 10-15-1 0-2 0-3 1M4 21c4-5 8-8 14-12",
    pin: "M12 21s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    route:
      "M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8 6h5a3 3 0 0 1 3 3v6",
    wifi: "M2 8.8a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0m-11 3.2a5.5 5.5 0 0 1 8 0M12 19h.01",
    bolt: "m13 2-9 12h7l-1 8 9-12h-7l1-8Z",
    menu: "M4 6h16M4 12h16M4 18h16",
    close: "M6 6l12 12M18 6 6 18",
    clock: "M12 6v6l4 2",
    check: "m5 12 4 4L19 6",
    phone:
      "M5 3h3l2 5-2 1c1.2 2.4 2.6 3.8 5 5l1-2 5 2v3c0 1.1-.9 2-2 2C9.3 19 5 14.7 5 7V3Z",
    mail: "M3 5h18v14H3V5Zm0 0 9 7 9-7",
    bell: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",
    nav: "M3 11l18-8-8 18-2-8-8-2Z",
    calendar:
      "M8 2v4M16 2v4M3.5 9h17M4 5h16a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
    users:
      "M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    quote:
      "M7 8c-2.2 0-4 1.8-4 4v6h6v-6H6.5C6.5 10.5 7.8 9 9.5 9V8Zm10 0c-2.2 0-4 1.8-4 4v6h6v-6h-2.5c0-1.5 1.3-3 3-3V8Z",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
};

// 👇 Complete stop lists + time schedules transcribed from the
// "Green Bus Bahawalpur stops & time schedule" PDF.
type ScheduleSide = {
  labelA: string;
  labelB?: string;
  colA: string[];
  colB?: string[];
};
type RouteData = {
  tag: string;
  from: string;
  to: string;
  color: string;
  totalStops: number;
  headwayWeekday: string;
  headwayWeekend: string;
  firstBus: string;
  lastBusWeekday: string;
  lastBusWeekend: string;
  stopsForward: string[];
  stopsBackward: string[];
  schedule: { weekday: ScheduleSide; weekend: ScheduleSide };
};

const routes: RouteData[] = [
  {
    tag: "ROUTE 1",
    from: "Derabakha",
    to: "Lodhran",
    color: "a",
    totalStops: 45,
    headwayWeekday: "42 min",
    headwayWeekend: "55 min",
    firstBus: "6:00 AM",
    lastBusWeekday: "8:42 PM",
    lastBusWeekend: "8:40 PM",
    stopsForward: [
      "Dera Bakha",
      "5/BC",
      "Basti Kacholian",
      "Hasilpur Bypass/Solar Park",
      "7/6 BC Chak (Basti Kharik)",
      "Al Raheem Town",
      "Islamia University",
      "Japan Town",
      "10 BC",
      "Royal College",
      "Baghdad ul Jadeed Railway Station",
      "Govt Graduate Girls College",
      "Hussaini Chowk",
      "Technical College",
      "One Unit Chowk",
      "Sadar Pully",
      "Kali Puli",
      "Technology Park",
      "Central Library",
      "Farid Gate",
      "Bahawalpur Zoo",
      "Larri Adda Bahawalpur",
      "Aliza Hospital",
      "Bindra Pulli",
      "Abbasia Town",
      "Karachi Mor",
      "Khokha Bus Stop",
      "Chamb Moor",
      "Adda Adamwahan",
      "Taj Hotel",
      "Malingi Hotel",
      "Shahida Islamic Medical College",
      "District Hospital Lodhran",
      "Bahauddin Zakaria University",
      "Umar Garden",
      "Melad Chowk",
      "Aziz Town",
      "City Bus Stand",
      "THQ Lodhran",
      "City Bus Stand/ Model Bazzar",
      "Multan Bus Stop",
      "Liaquatabad",
      "Sabzi Mandi Lodhran",
      "Hassan Town",
      "Lodhra Entrance Gate",
    ],
    stopsBackward: [],
    schedule: {
      weekday: {
        labelA: "Derabakha → Lodhran",
        labelB: "Lodhran → Derabakha",
        colA: [
          "06:00 AM",
          "06:42 AM",
          "07:24 AM",
          "08:06 AM",
          "08:48 AM",
          "09:30 AM",
          "10:12 AM",
          "10:54 AM",
          "11:36 AM",
          "12:18 PM",
          "01:00 PM",
          "01:42 PM",
          "02:24 PM",
          "03:06 PM",
          "03:48 PM",
          "04:30 PM",
          "05:12 PM",
          "05:54 PM",
          "06:36 PM",
          "07:18 PM",
          "08:00 PM",
          "08:42 PM",
        ],
        colB: [
          "06:00 AM",
          "06:42 AM",
          "07:24 AM",
          "08:06 AM",
          "08:48 AM",
          "09:30 AM",
          "10:12 AM",
          "10:54 AM",
          "11:36 AM",
          "12:18 PM",
          "01:00 PM",
          "01:42 PM",
          "02:24 PM",
          "03:06 PM",
          "03:48 PM",
          "04:30 PM",
          "05:12 PM",
          "05:54 PM",
          "06:36 PM",
          "07:18 PM",
          "08:00 PM",
          "08:42 PM",
        ],
      },
      weekend: {
        labelA: "Derabakha → Lodhran",
        labelB: "Lodhran → Derabakha",
        colA: [
          "06:00 AM",
          "06:55 AM",
          "07:50 AM",
          "08:45 AM",
          "09:40 AM",
          "10:35 AM",
          "11:30 AM",
          "12:25 PM",
          "01:20 PM",
          "02:15 PM",
          "03:10 PM",
          "04:05 PM",
          "05:00 PM",
          "05:55 PM",
          "06:50 PM",
          "07:45 PM",
          "08:40 PM",
        ],
        colB: [
          "06:00 AM",
          "06:55 AM",
          "07:50 AM",
          "08:45 AM",
          "09:40 AM",
          "10:35 AM",
          "11:30 AM",
          "12:25 PM",
          "01:20 PM",
          "02:15 PM",
          "03:10 PM",
          "04:05 PM",
          "05:00 PM",
          "05:55 PM",
          "06:50 PM",
          "07:45 PM",
          "08:40 PM",
        ],
      },
    },
  },
  {
    tag: "ROUTE 2",
    from: "13 Solang",
    to: "Cattle Market",
    color: "b",
    totalStops: 31,
    headwayWeekday: "42 min",
    headwayWeekend: "55 min",
    firstBus: "6:00 AM",
    lastBusWeekday: "10:06 PM",
    lastBusWeekend: "9:35 PM",
    stopsForward: [
      "13 Solang",
      "Jinnah College",
      "Jamia Masjid Almaghfirah",
      "New Cantt",
      "Food Godowns",
      "Gulberg Avenue",
      "Garden Town",
      "City School BWP/Beacon House Bwp/Punjab College Bwp",
      "Mustafa Town",
      "Islamia Colony",
      "Rohi Plaza/Islamia Checkpost",
      "Dilawar Colony",
      "Anwarabad Colony",
      "Kali Puli",
      "DC Chowk Bahawalpur",
      "RPO House BWP",
      "Fareed Gate Bahawalpur",
      "Model Bazar",
      "Bahawalpur Zoo",
      "Larri Adda Bahawalpur",
      "Multani Gate",
      "Chikaan Wala Chowk",
      "Mohallah Islampura",
      "Fawara Chowk",
      "Dubai Chowk",
      "State Life Zonal Office",
      "Nawab Colony",
      "Daewoo",
      "Agricultural Engg. Dept",
      "New Sabzi Mandi",
      "Cattle Market",
    ],
    stopsBackward: [],
    schedule: {
      weekday: {
        labelA: "13 Solang → Cattle Market",
        labelB: "Cattle Market → 13 Solang",
        colA: [
          "06:00 AM",
          "06:42 AM",
          "07:24 AM",
          "08:06 AM",
          "08:48 AM",
          "09:30 AM",
          "10:12 AM",
          "10:54 AM",
          "11:36 AM",
          "12:18 PM",
          "01:00 PM",
          "01:42 PM",
          "02:24 PM",
          "03:06 PM",
          "03:48 PM",
          "04:30 PM",
          "05:12 PM",
          "05:54 PM",
          "06:36 PM",
          "07:18 PM",
          "08:00 PM",
          "08:42 PM",
          "09:24 PM",
          "10:06 PM",
        ],
        colB: [
          "06:00 AM",
          "06:42 AM",
          "07:24 AM",
          "08:06 AM",
          "08:48 AM",
          "09:30 AM",
          "10:12 AM",
          "10:54 AM",
          "11:36 AM",
          "12:18 PM",
          "01:00 PM",
          "01:42 PM",
          "02:24 PM",
          "03:06 PM",
          "03:48 PM",
          "04:30 PM",
          "05:12 PM",
          "05:54 PM",
          "06:36 PM",
          "07:18 PM",
          "08:00 PM",
          "08:42 PM",
          "09:24 PM",
          "10:06 PM",
        ],
      },
      weekend: {
        labelA: "13 Solang → Cattle Market",
        labelB: "Cattle Market → 13 Solang",
        colA: [
          "06:00 AM",
          "06:55 AM",
          "07:50 AM",
          "08:45 AM",
          "09:40 AM",
          "10:35 AM",
          "11:30 AM",
          "12:25 PM",
          "01:20 PM",
          "02:15 PM",
          "03:10 PM",
          "04:05 PM",
          "05:00 PM",
          "05:55 PM",
          "06:50 PM",
          "07:45 PM",
          "08:40 PM",
          "09:35 PM",
        ],
        colB: [
          "06:00 AM",
          "06:55 AM",
          "07:50 AM",
          "08:45 AM",
          "09:40 AM",
          "10:35 AM",
          "11:30 AM",
          "12:25 PM",
          "01:20 PM",
          "02:15 PM",
          "03:10 PM",
          "04:05 PM",
          "05:00 PM",
          "05:55 PM",
          "06:50 PM",
          "07:45 PM",
          "08:40 PM",
          "09:35 PM",
        ],
      },
    },
  },
  {
    tag: "ROUTE 3",
    from: "Talha Town",
    to: "Al Raheem Town",
    color: "c",
    totalStops: 21,
    headwayWeekday: "26 min",
    headwayWeekend: "36 min",
    firstBus: "6:00 AM",
    lastBusWeekday: "10:02 PM",
    lastBusWeekend: "10:12 PM",
    stopsForward: [
      "Talha Town",
      "Arshad Town",
      "Saeedabad Colony",
      "Nadra E Sahulat",
      "Railway Station",
      "Islamia Mission Market",
      "Islamia University Railway Campus",
      "Saraiki Chowk",
      "Fawara Chowk",
      "Quaid e Azam Medical College",
      "Victoria Park",
      "Fareed Gate Bahawalpur / MC Office / City",
      "Model Bazar",
      "Engerton College / Islamic",
      "DC Chowk Bahawalpur",
      "One Unit Chowk",
      "Al Shams Park",
      "Central School",
      "Kanju Basti",
      "Satellite Town",
      "Al Raheem Town",
    ],
    stopsBackward: [
      "Al Raheem Town",
      "Satellite Town",
      "Kanju Basti",
      "Central School",
      "Al Shams Park",
      "One Unit Chowk",
      "DC Chowk Bahawalpur",
      "Engerton College / University Chowk",
      "Model Bazar",
      "Fareed Gate Bahawalpur",
      "Victoria Park",
      "Quaid e Azam Medical College",
      "Fawara Chowk",
      "Saraiki Chowk",
      "Islamia University",
      "Islamia Mission Market / Welcome Chowk",
      "Railway Station",
      "Nadra E Sahulat",
      "Saeedabad Colony",
      "Arshad Town",
      "Talha Town",
    ],
    schedule: {
      weekday: {
        labelA: "Departure — Talha Town",
        labelB: "Arrival — Al Raheem Town",
        colA: [
          "06:00",
          "06:26",
          "06:52",
          "07:18",
          "07:44",
          "08:10",
          "08:36",
          "09:02",
          "09:28",
          "09:54",
          "10:20",
          "10:46",
          "11:12",
          "11:38",
          "12:04",
          "12:30",
          "12:56",
          "13:22",
          "13:48",
          "14:14",
          "14:40",
          "15:06",
          "15:32",
          "15:58",
          "16:24",
          "16:50",
          "17:16",
          "17:42",
          "18:08",
          "18:34",
          "19:00",
          "19:26",
          "19:52",
          "20:18",
          "20:44",
          "21:10",
          "21:36",
          "22:02",
          "22:28",
        ],
        colB: [
          "06:33",
          "06:59",
          "07:25",
          "07:51",
          "08:17",
          "08:43",
          "09:09",
          "09:35",
          "10:01",
          "10:27",
          "10:53",
          "11:19",
          "11:45",
          "12:11",
          "12:37",
          "13:03",
          "13:29",
          "13:55",
          "14:21",
          "14:47",
          "15:13",
          "15:39",
          "16:05",
          "16:31",
          "16:57",
          "17:23",
          "17:49",
          "18:15",
          "18:41",
          "19:07",
          "19:33",
          "19:59",
          "20:25",
          "20:51",
          "21:17",
          "21:43",
          "22:09",
          "22:35",
          "23:01",
        ],
      },
      weekend: {
        labelA: "Departure — Talha Town",
        labelB: "Arrival — Al Raheem Town",
        colA: [
          "06:00",
          "06:36",
          "07:12",
          "07:48",
          "08:24",
          "09:00",
          "09:36",
          "10:12",
          "10:48",
          "11:24",
          "12:00",
          "12:36",
          "13:12",
          "13:48",
          "14:24",
          "15:00",
          "15:36",
          "16:12",
          "16:48",
          "17:24",
          "18:00",
          "18:36",
          "19:12",
          "19:48",
          "20:24",
          "21:00",
          "21:36",
          "22:12",
        ],
        colB: [
          "06:33",
          "07:09",
          "07:45",
          "08:21",
          "08:57",
          "09:33",
          "10:09",
          "10:45",
          "11:21",
          "11:57",
          "12:33",
          "13:09",
          "13:45",
          "14:21",
          "14:57",
          "15:33",
          "16:09",
          "16:45",
          "17:21",
          "17:57",
          "18:33",
          "19:09",
          "19:45",
          "20:21",
          "20:57",
          "21:33",
          "22:09",
          "22:45",
        ],
      },
    },
  },
  {
    tag: "ROUTE 4",
    from: "Bhatta No 1",
    to: "Goth Lashkar",
    color: "d",
    totalStops: 40,
    headwayWeekday: "22 min",
    headwayWeekend: "32 min",
    firstBus: "6:00 AM",
    lastBusWeekday: "10:08 PM",
    lastBusWeekend: "8:56 PM",
    stopsForward: [
      "Bhatta No 1",
      "Tax Office",
      "Model Town A",
      "Chase Value BWP",
      "Live Stock",
      "National Hospital",
      "Medina Masjid",
      "Samiullah Chowk",
      "Bhopal Wala Chowk",
      "Green Palace",
      "Larri Adda Bahawalpur",
      "Central Jail",
      "Radio Station",
      "Faisal Colony",
      "Pul Dewanwah",
      "Jannat Housing Scheme",
      "Govt Degree College",
      "Civil Hospital Mosque",
      "Consumer Court",
      "Goth Lashkar",
    ],
    stopsBackward: [
      "Goth Lashkar",
      "Consumer Court",
      "Civil Hospital Mosque",
      "Govt Degree College",
      "Jannat Housing Scheme",
      "Pul Dewanwah",
      "Faisal Colony",
      "Radio Station",
      "Central Jail",
      "Larri Adda Bahawalpur",
      "Green Palace",
      "Bhopal Wala Chowk",
      "Samiullah Chowk",
      "Medina Masjid",
      "National Hospital",
      "Live Stock",
      "Chase Value BWP",
      "Model Town A",
      "Tax Office",
      "Bhatta No.1",
    ],
    schedule: {
      weekday: {
        labelA: "Departure Time",
        colA: [
          "06:00 AM",
          "06:22 AM",
          "06:44 AM",
          "07:06 AM",
          "07:28 AM",
          "07:50 AM",
          "08:12 AM",
          "08:34 AM",
          "08:56 AM",
          "09:18 AM",
          "09:40 AM",
          "10:02 AM",
          "10:24 AM",
          "10:46 AM",
          "11:08 AM",
          "11:30 AM",
          "11:52 AM",
          "12:14 PM",
          "12:36 PM",
          "12:58 PM",
          "01:20 PM",
          "01:42 PM",
          "02:04 PM",
          "02:26 PM",
          "02:48 PM",
          "03:10 PM",
          "03:32 PM",
          "03:54 PM",
          "04:16 PM",
          "04:38 PM",
          "05:00 PM",
          "05:22 PM",
          "05:44 PM",
          "06:06 PM",
          "06:28 PM",
          "06:50 PM",
          "07:12 PM",
          "07:34 PM",
          "07:56 PM",
          "08:18 PM",
          "08:40 PM",
          "09:02 PM",
          "09:24 PM",
          "09:46 PM",
          "10:08 PM",
        ],
      },
      weekend: {
        labelA: "Departure Time",
        colA: [
          "06:00 AM",
          "06:32 AM",
          "07:04 AM",
          "07:36 AM",
          "08:08 AM",
          "08:40 AM",
          "09:12 AM",
          "09:44 AM",
          "10:16 AM",
          "10:48 AM",
          "11:20 AM",
          "11:52 AM",
          "12:24 PM",
          "12:56 PM",
          "01:28 PM",
          "02:00 PM",
          "02:32 PM",
          "03:04 PM",
          "03:36 PM",
          "04:08 PM",
          "04:40 PM",
          "05:12 PM",
          "05:44 PM",
          "06:16 PM",
          "06:48 PM",
          "07:20 PM",
          "07:52 PM",
          "08:24 PM",
          "08:56 PM",
        ],
      },
    },
  },
];

// 👇 Team photos — files must be in /public/team/ with these EXACT names (.png).
const manager = {
  name: "Zain Ul Islam Dogar",
  role: "Terminal Manager",
  bio: "Oversees daily terminal operations, bus scheduling, staff management and ensures the best travel experience for all passengers.",
  img: "/team/manager.png",
};

const team = [
  {
    name: "Muhammad Shahbaz",
    role: "Night Operation Supervisor",
    img: "/team/shahbaz.png",
  },
  { name: "Farhan Abbasi", role: "Route Officer", img: "/team/farhan.png" },
  { name: "Umar Nazeer", role: "Route Officer", img: "/team/umar.png" },
  { name: "Athar Iqbal Sameja", role: "Route Officer", img: "/team/athar.png" },
];

const fallbackAvatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e4f1e8&color=176c4b&size=256&bold=true`;

// 👇 Hero slider photos — swap these 3 URLs for your own bus photos any time
const heroImages = [
  "/hero-banner-1.png",
  "/hero-banner-2.png",
  "/hero-banner-3.png",
];

function VisitorTools() {
  const [poster, setPoster] = useState(false);
  const [urdu, setUrdu] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("EV-poster-seen")) setPoster(true);
    const storedLanguage = localStorage.getItem("EV-language");
    if (storedLanguage === "ur") applyLanguage("ur");
  }, []);
  const dismiss = () => {
    setPoster(false);
    localStorage.setItem("EV-poster-seen", "yes");
  };
  const applyLanguage = (value: string) => {
    const isUrdu = value === "ur";
    setUrdu(isUrdu);
    localStorage.setItem("EV-language", value);
    document.documentElement.lang = isUrdu ? "ur" : "en";
    document.documentElement.dir = isUrdu ? "rtl" : "ltr";
    document.body.classList.toggle("urdu-page", isUrdu);
    const words: Record<string, string> = {
      "Live Tracking": "لائیو ٹریکنگ",
      "Service Updates": "سروس اپڈیٹس",
      "Charging Hubs": "چارجنگ ہب",
      "Routes & Stops": "روٹس اور اسٹاپس",
      "Plan a journey": "سفر پلان کریں",
      "ELECTRIC PUBLIC TRANSIT": "الیکٹرک پبلک ٹرانزٹ",
      "Smarter, greener": "زیادہ ذہین، سبز",
      journeys: "سفر",
      "for everyone.": "سب کے لیے۔",
      "Comfortable, reliable and clean transportation for a city that keeps moving forward.":
        "شہر کو آگے بڑھانے کے لیے آرام دہ، قابل اعتماد اور صاف سفر۔",
      "Find a route": "روٹ تلاش کریں",
      "View all routes": "تمام روٹس دیکھیں",
      "Electric fleet": "الیکٹرک فلیٹ",
      "Active routes": "فعال روٹس",
      "Daily service": "روزانہ سروس",
      "Where are you going?": "آپ کہاں جا رہے ہیں؟",
      "Plan your trip in seconds": "چند سیکنڈز میں اپنا سفر پلان کریں",
      FROM: "کہاں سے",
      TO: "کہاں تک",
      ROUTE: "روٹ",
      Search: "تلاش کریں",
      "Public transport,": "عوامی ٹرانسپورٹ،",
      made: "بنائی گئی",
      "better.": "بہتر۔",
      "See network map": "نیٹ ورک میپ دیکھیں",
      "Your bus is": "آپ کی بس",
      "on its way.": "راستے میں ہے۔",
      "Everything you need,": "ہر چیز جس کی آپ کو ضرورت ہے،",
      already: "پہلے سے",
      "on board.": "بس میں موجود ہے۔",
      "Good to": "جاننا",
      "know.": "ضروری ہے۔",
      "The people": "وہ لوگ",
      "behind your": "آپ کے سفر کے",
      "journey.": "پیچھے۔",
      "Made for the city.": "شہر کے لیے بنائی گئی۔",
      "Loved by": "لوگوں کی",
      "its people.": "پسندیدہ۔",
      "Let's get you": "آئیے آپ کو",
      "moving.": "منزل تک پہنچائیں۔",
      "Send message": "پیغام بھیجیں",
      "Our Bus": "ہماری بس",
      "Complete stop lists and time schedules for every EV Green Bus route, straight from our official timetable.":
        "ہر روٹ کی مکمل اسٹاپ لسٹ اور اوقات کار، ہمارے آفیشل ٹائم ٹیبل سے۔",
      "Starting point": "ابتدائی مقام",
      "Final stop": "آخری اسٹاپ",
      "En route": "راستے میں",
      "Track your bus,": "اپنی بس ٹریک کریں،",
      "in real time.": "حقیقی وقت میں۔",
    };
    const main = document.querySelector("main");
    if (!main) return;
    const nodes = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = nodes.nextNode())) {
      const original = (node as Text).data.trim();
      if (!original) continue;
      const el = (node as Text).parentElement;
      if (!el) continue;
      if (!el.dataset.en) el.dataset.en = original;
      const english = el.dataset.en;
      (node as Text).data = isUrdu ? words[english] || english : english;
    }
  };
  return (
    <>
      <div className="floating-tools">
        <select
          className="language"
          aria-label="Language selector"
          onChange={(e) => applyLanguage(e.target.value)}
          value={urdu ? "ur" : "en"}
        >
          <option value="en">EN</option>
          <option value="ur">اردو</option>
        </select>
        <button
          className="backtop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
      {poster && (
        <div className="poster-backdrop" onClick={dismiss} role="presentation">
          <aside
            className="poster"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Welcome to EV"
          >
            <button
              className="poster-close"
              onClick={dismiss}
              aria-label="Close welcome poster"
            >
              ×
            </button>
            <p className="eyebrow">
              <span /> WELCOME ABOARD
            </p>
            <h2>
              Move towards a<br />
              <em>better city.</em>
            </h2>
            <p>
              Plan your next clean, calm and reliable journey with EV Green Bus.
            </p>
            <a onClick={dismiss} className="button primary" href="#planner">
              Plan a journey <Icon name="arrow" />
            </a>
          </aside>
        </div>
      )}
    </>
  );
}

function HeroSlider() {
  const heroRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
      if (slides.length === 0) return;

      gsap.set(slides, { opacity: 0 });
      gsap.set(slides[0], { opacity: 1 });

      let current = 0;

      const interval = setInterval(() => {
        const next = (current + 1) % slides.length;

        gsap.to(slides[current], {
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut",
        });
        gsap.to(slides[next], {
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
        });

        current = next;
      }, 4000);

      return () => clearInterval(interval);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-bg-wrap" ref={heroRef}>
      {heroImages.map((img, i) => (
        <div
          key={i}
          ref={(el) => {
            slideRefs.current[i] = el;
          }}
          className="hero-bg-slide"
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="hero-bg-overlay" />
    </div>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [planned, setPlanned] = useState(false);

  const [activeRoute, setActiveRoute] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [day, setDay] = useState<"weekday" | "weekend">("weekday");
  const current = routes[activeRoute];
  const hasBackward = current.stopsBackward.length > 0;
  const stopsShown =
    direction === "forward" || !hasBackward
      ? current.stopsForward
      : current.stopsBackward;
  const scheduleShown = current.schedule[day];

  // 👇 Fade-up scroll animations for every section as it enters the viewport
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".reveal-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: (i % 4) * 0.09,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      <VisitorTools />

      <nav>
        <a className="brand" href="#home">
          <span className="brandmark">
            <img
              src="/logo.png"
              alt="EV Green Bus logo"
              className="brandmark-img"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </span>
          <span>
            EV<small>GREEN BUS</small>
          </span>
        </a>
        <div className={menu ? "navlinks open" : "navlinks"}>
          <a href="#routes">Routes & Stops</a>
          <a href="#hubs">Charging Hubs</a>
          <a href="#track">Live Tracking</a>
          <a href="#updates">Service Updates</a>
        </div>
        <div className="EVctions">
          <a className="navcta" href="#planner">
            Plan a journey <Icon name="arrow" size={16} />
          </a>
          <button
            className="menu"
            onClick={() => setMenu(!menu)}
            aria-label="Menu"
          >
            <Icon name={menu ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      <section className="hero" id="home">
        <HeroSlider />
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> ELECTRIC PUBLIC TRANSIT
          </p>
          <h1>
            Smarter, greener
            <br />
            <em>journeys</em> for everyone.
          </h1>
          <p className="lede">
            Comfortable, reliable and clean transportation for a city that keeps
            moving forward.
          </p>
          <div className="hero-buttons">
            <a className="button primary" href="#planner">
              Find a route <Icon name="arrow" />
            </a>
            <a className="button ghost" href="#routes">
              View all routes
            </a>
          </div>
        </div>
        <div className="hero-stats">
          <div>
            <strong>100%</strong>
            <span>Electric fleet</span>
          </div>
          <div>
            <strong>{routes.length}</strong>
            <span>Active routes</span>
          </div>
          <div>
            <strong>06:00–23:00</strong>
            <span>Daily service</span>
          </div>
        </div>
        <div className="scroll">
          SCROLL TO EXPLORE <i />
        </div>
      </section>

      <section className="planner-wrap" id="planner">
        <div className="planner glass">
          <div className="planner-title">
            <span className="mini-icon">
              <Icon name="route" />
            </span>
            <div>
              <h2>Where are you going?</h2>
              <p>Plan your trip in seconds</p>
            </div>
          </div>
          <div className="fields">
            <label>
              FROM
              <input
                placeholder="Choose starting point"
                defaultValue="Central Terminal"
              />
            </label>
            <span className="swap">↕</span>
            <label>
              TO
              <input
                placeholder="Choose destination"
                defaultValue="University District"
              />
            </label>
            <label className="select">
              ROUTE
              <select defaultValue="r1">
                <option value="r1">Fastest route</option>
                <option>Fewest stops</option>
              </select>
            </label>
            <button className="button primary" onClick={() => setPlanned(true)}>
              Search <Icon name="arrow" />
            </button>
          </div>
          {planned && (
            <div className="result">
              <Icon name="check" /> Route 1 leaves in <b>7 minutes</b> ·
              Estimated journey <b>32 min</b>
            </div>
          )}
        </div>
      </section>

      <section className="intro section" id="about">
        <div className="section-title reveal">
          <p className="eyebrow green">01 — OUR PROMISE</p>
          <h2>
            Public transport,
            <br />
            made <em>better.</em>
          </h2>
        </div>
        <div className="intro-text reveal">
          <p>
            We are building a calmer, cleaner way to move around the city. Every
            EV journey is designed around the people who make it.
          </p>
          <div className="ticks">
            <span>
              <Icon name="check" /> Zero tailpipe emissions
            </span>
            <span>
              <Icon name="check" /> Accessible for every passenger
            </span>
          </div>
        </div>
        <div className="interior-photo reveal">
          <div className="photo-caption">
            <b>Designed for your comfort</b>
            <span>Quiet. Spacious. Connected.</span>
          </div>
        </div>
      </section>

      {/* 👇 Routes & Stops — complete stop lists + time schedules from the
          official PDF timetable, with route/direction/day switching. */}
      <section className="routes section" id="routes">
        <div className="routes-title reveal">
          <p className="eyebrow green">
            <span /> OUR ROUTES
          </p>
          <h2>
            Our Bus
            <br />
            <em>Routes & Stops</em>
          </h2>
          <p className="routes-sub">
            Complete stop lists and time schedules for every EV Green Bus route,
            straight from our official timetable.
          </p>
        </div>

        <div className="route-tabs-grid">
          {routes.map((r, i) => (
            <button
              key={r.tag}
              className={`route-tab-card reveal-item${activeRoute === i ? " active" : ""}`}
              onClick={() => {
                setActiveRoute(i);
                setDirection("forward");
              }}
            >
              <span className={`route-badge ${r.color}`}>{r.tag}</span>
              <h4>
                {r.from} <Icon name="arrow" size={12} /> {r.to}
              </h4>
              <div className="route-tab-stats">
                <span>
                  <Icon name="pin" size={13} /> {r.totalStops} stops
                </span>
                <span>
                  <Icon name="clock" size={13} /> Every {r.headwayWeekday}
                </span>
                <span>
                  <Icon name="calendar" size={13} /> {r.firstBus} –{" "}
                  {r.lastBusWeekday}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="route-detail glass reveal">
          <div className="route-detail-head">
            <div>
              <span className={`route-badge ${current.color}`}>
                {current.tag}
              </span>
              <h3>
                {current.from} <span>to</span> {current.to}
              </h3>
            </div>
            <div className="route-detail-stats">
              <div>
                <Icon name="pin" size={17} />
                <div>
                  <b>{current.totalStops}</b>
                  <span>Total stops</span>
                </div>
              </div>
              <div>
                <Icon name="clock" size={17} />
                <div>
                  <b>
                    {day === "weekday"
                      ? current.headwayWeekday
                      : current.headwayWeekend}
                  </b>
                  <span>Headway</span>
                </div>
              </div>
              <div>
                <Icon name="calendar" size={17} />
                <div>
                  <b>{current.firstBus}</b>
                  <span>First bus</span>
                </div>
              </div>
              <div>
                <Icon name="bell" size={17} />
                <div>
                  <b>
                    {day === "weekday"
                      ? current.lastBusWeekday
                      : current.lastBusWeekend}
                  </b>
                  <span>Last bus</span>
                </div>
              </div>
            </div>
          </div>

          <div className="route-detail-body">
            <div className="stops-panel">
              <div className="panel-head">
                <h4>
                  <Icon name="nav" size={16} /> Bus Stops
                </h4>
                {hasBackward && (
                  <div className="pill-toggle">
                    <button
                      className={direction === "forward" ? "active" : ""}
                      onClick={() => setDirection("forward")}
                    >
                      Forward
                    </button>
                    <button
                      className={direction === "backward" ? "active" : ""}
                      onClick={() => setDirection("backward")}
                    >
                      Backward
                    </button>
                  </div>
                )}
              </div>
              <div className="stop-list">
                {stopsShown.map((stop, j) => (
                  <div className="stop-row" key={`${stop}-${j}`}>
                    <span className="stop-num">{j + 1}</span>
                    <div className="stop-info">
                      <b>{stop}</b>
                      <small>
                        {j === 0
                          ? "Starting point"
                          : j === stopsShown.length - 1
                            ? "Final stop"
                            : "En route"}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="schedule-panel">
              <div className="panel-head">
                <h4>
                  <Icon name="clock" size={16} /> Time Schedule
                </h4>
                <div className="pill-toggle">
                  <button
                    className={day === "weekday" ? "active" : ""}
                    onClick={() => setDay("weekday")}
                  >
                    Mon–Fri
                  </button>
                  <button
                    className={day === "weekend" ? "active" : ""}
                    onClick={() => setDay("weekend")}
                  >
                    Sat–Sun
                  </button>
                </div>
              </div>
              <div className="schedule-table">
                <div className="schedule-row schedule-header">
                  <span>#</span>
                  <span>{scheduleShown.labelA}</span>
                  {scheduleShown.colB && <span>{scheduleShown.labelB}</span>}
                </div>
                {scheduleShown.colA.map((t, j) => (
                  <div className="schedule-row" key={j}>
                    <span>{j + 1}</span>
                    <span>{t}</span>
                    {scheduleShown.colB && (
                      <span>{scheduleShown.colB[j] ?? "--"}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team section" id="team">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow green">06 — MEET THE TEAM</p>
            <h2>
              The people
              <br />
              behind your <em>journey.</em>
            </h2>
          </div>
        </div>

        <div className="manager-card glass reveal">
          <img
            className="manager-avatar"
            src={manager.img}
            alt={manager.name}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.onerror = null;
              img.src = fallbackAvatar(manager.name);
            }}
          />
          <div className="manager-info">
            <span className="manager-tag">TERMINAL MANAGER</span>
            <h3>{manager.name}</h3>
            <p className="manager-role">{manager.role}</p>
            <p className="manager-bio">{manager.bio}</p>
          </div>
        </div>

        <div className="team-grid">
          {team.map((m) => (
            <div className="team-card reveal-item" key={m.name}>
              <img
                className="team-avatar"
                src={m.img}
                alt={m.name}
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.onerror = null;
                  img.src = fallbackAvatar(m.name);
                }}
              />
              <h4>{m.name}</h4>
              <p className="team-role">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="track section" id="track">
        <div className="track-photo reveal">
          <img
            src="/img.png"
            alt="Passenger checking live bus tracking inside a EV Green Bus"
          />
          <div className="track-photo-badge">
            <span className="pulse" />
            Live · EV-124 on Route 1
          </div>
        </div>
        <div className="track-copy reveal">
          <p className="eyebrow green">03 — LIVE SERVICE STATUS</p>
          <h2>
            Track your bus,
            <br />
            <em>in real time.</em>
          </h2>
          <p>
            Every EV bus is fitted with GPS so you always know exactly where it
            is and when it will reach your stop — right from your phone, no
            guesswork needed.
          </p>
          <div className="track-features">
            <div>
              <span className="mini-icon">
                <Icon name="pin" />
              </span>
              <div>
                <b>Live GPS position</b>
                <span>See your bus move on the map in real time</span>
              </div>
            </div>
            <div>
              <span className="mini-icon">
                <Icon name="clock" />
              </span>
              <div>
                <b>Accurate arrival times</b>
                <span>Predictions that update as traffic changes</span>
              </div>
            </div>
            <div>
              <span className="mini-icon">
                <Icon name="bell" />
              </span>
              <div>
                <b>Stop alerts</b>
                <span>Get notified a few minutes before your stop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="facilities section" id="hubs">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow green">04 — A BETTER RIDE</p>
            <h2>
              Everything you need,
              <br />
              already <em>on board.</em>
            </h2>
          </div>
        </div>
        <div className="feature-grid">
          {[
            ["bolt", "100% Electric", "Clean energy, quiet rides"],
            ["wifi", "Free Wi-Fi", "Stay connected on the go"],
            ["check", "Step-free access", "Room for every journey"],
            ["pin", "Live GPS", "Always know where you are"],
            ["phone", "USB charging", "A little power when you need it"],
            ["clock", "Climate comfort", "Cool in summer, warm in winter"],
          ].map(([icon, title, text]) => (
            <div className="feature reveal-item" key={title}>
              <span className="mini-icon">
                <Icon name={icon} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="updates section" id="updates">
        <div className="reveal">
          <p className="eyebrow green">05 — SERVICE UPDATES</p>
          <h2>
            Good to <em>know.</em>
          </h2>
        </div>
        <div className="update-list">
          <article className="reveal-item">
            <span className="notice">SERVICE NOTICE</span>
            <h3>Route 3 temporary stop change</h3>
            <p>
              From 14 Aug, the DC Chowk Bahawalpur stop on Route 3 will shift
              150m towards Model Bazar during road works near One Unit Chowk.
            </p>
          </article>
          <article className="reveal-item">
            <span className="notice soft">THIS WEEKEND</span>
            <h3>Extended hours on Route 1 & Route 2</h3>
            <p>
              For the Bahawalpur Cattle Fair, Route 1 and Route 2 buses will run
              30 minutes later than the usual weekend schedule.
            </p>
          </article>
          <article className="reveal-item">
            <span className="notice fleet">FLEET UPDATE</span>
            <h3>Two new electric buses on Route 4</h3>
            <p>
              Bhatta No 1 to Goth Lashkar now runs two additional EVs during
              peak hours, cutting the headway from 22 to 18 minutes.
            </p>
          </article>
          <article className="reveal-item">
            <span className="notice holiday">PUBLIC HOLIDAY</span>
            <h3>Independence Day timetable</h3>
            <p>
              On 14 August all routes follow the weekend (Saturday & Sunday)
              schedule. Regular Monday–Friday service resumes 15 August.
            </p>
          </article>
        </div>
      </section>

      <section className="voices section">
        <p className="eyebrow green reveal">07 — FROM OUR PASSENGERS</p>
        <h2 className="reveal">
          Made for the city.
          <br />
          Loved by <em>its people.</em>
        </h2>
        <div className="testimonial-grid">
          {[
            [
              "I take Route 2 from Islamia Colony to DC Chowk every morning for work — the 42 minute frequency means I barely wait, and it's always on time.",
              "Amina Rafique",
              "Commutes on Route 2 · Islamia Colony",
            ],
            [
              "As a student at Islamia University I use Route 1 daily. The AC and Wi-Fi make the ride to Lodhran actually enjoyable instead of a chore.",
              "Daniyal Khalid",
              "Islamia University student · Route 1",
            ],
            [
              "Route 3 drops me right at Fawara Chowk near my shop. Every 26 minutes there's a bus, so I never plan my day around waiting anymore.",
              "Sara Noreen",
              "Shopkeeper, Fawara Chowk · Route 3",
            ],
          ].map(([q, n, r]) => (
            <article className="quote reveal-item" key={n}>
              <Icon name="quote" size={24} />
              <p>"{q}"</p>
              <div className="person">
                <img src={fallbackAvatar(n)} alt={n} />
                <div>
                  <b>{n}</b>
                  <small>{r}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="reveal">
          <p className="eyebrow green">08 — HERE TO HELP</p>
          <h2>
            Let&apos;s get you
            <br />
            <em>moving.</em>
          </h2>
          <p>
            Questions about a route, a lost item or accessibility? Our friendly
            team is here for you.
          </p>
          <div className="contact-details">
            <span>
              <Icon name="phone" /> 0800 6282 000
            </span>
            <span>
              <Icon name="pin" /> Central Terminal, City Center
            </span>
          </div>
        </div>
        <form
          className="contact-form glass reveal"
          onSubmit={(e) => e.preventDefault()}
        >
          <label>
            YOUR NAME
            <input placeholder="e.g. Alex Morgan" />
          </label>
          <div>
            <label>
              EMAIL
              <input type="email" placeholder="alex@email.com" />
            </label>
            <label>
              PHONE
              <input placeholder="Optional" />
            </label>
          </div>
          <label>
            HOW CAN WE HELP?
            <textarea placeholder="Write your message here..." />
          </label>
          <button className="button primary">
            Send message <Icon name="arrow" />
          </button>
        </form>
      </section>
      <footer>
        <a className="brand" href="#home">
          <span className="brandmark">
            <img
              src="/logo.png"
              alt="EV Green Bus logo"
              className="brandmark-img"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </span>
          <span>
            EV<small>GREEN BUS</small>
          </span>
        </a>
        <p>Smarter, greener journeys for everyone.</p>
        <div>
          <a href="#routes">Routes</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
        </div>
        <small>© 2026 EV Green Bus Service - <b>Faqeer Faisal Latif Sultan</b> </small>
      </footer>
    </main>
  );
}
