## 🛑 The Problem

Tourists visiting Manipur typically experience the region through a destination-first lens: they visit well-known landmarks (Loktak Lake, Kangla Fort, Ima Keithel) but miss the living culture that defines the place—handloom workshops, folk music sessions, community gatherings, and local food traditions.

At the same time:

* **Fragmented Information:** Details about authentic local experiences are scattered, informal, and hard to discover.
* **Wasted Time Margins:** Visitors have free time fragments (a few hours between meetings, transit, or hotel stays) but no easy way to turn that time into meaningful cultural experiences.
* **Disconnected Creators:** Local hosts and artisans lack a digital channel to reach tourists in a structured, trustworthy way.

**The Result:** Tourism remains surface-level, and the economic and cultural benefits do not fully reach the people keeping Manipur’s traditions alive.

---

## 💡 Proposed Solution

**Experience Manipur** is an AI-powered, experience-first tourism platform that turns fragmented free time into living culture. Instead of treating Manipur as a checklist of static locations, the app bridges the gap between travelers seeking authenticity and local hosts preserving their heritage.

* **Experience-First Discovery:** Replaces generic tourist lists with direct access to living cultural activities—from intimate artisan handloom sessions (*Craft & Loom*) to authentic culinary traditions (*Taste Local*) and community gatherings (*Participate*).
* **Smart Fragmented-Time Planning:** An AI Trip Planner (`Plan My Trip`) allows visitors to input their exact available time window, interests, and location status (whether in Manipur or planning ahead) to instantly generate tailored micro-itineraries.
* **Agentic RAG Local Events Concierge:** Solves the problem of scattered, informal information by retrieving live community gigs, music sessions, and seasonal pop-ups through a real-time conversational AI interface (`LocalEvents`).
* **Direct Digital Enablement for Local Hosts:** Serves as a structured, trustworthy bridge for local artisans, musicians, and culinary hosts to showcase their work, driving tourism revenue straight to community roots.

## Completed Features

| # | Feature | Status |
| --- | --- | --- |
| 1 | `LandingHome.jsx` full-width hero layout with `background.jpg` and `manipur_landing_card.jpg` | ✅ Done |
| 2 | `navbar.jsx` sticky navigation with highlighted AI tabs between Home and Destinations | ✅ Done |
| 3 | `AppShell.jsx` conditional width wrapper enabling edge-to-edge layout on homepage | ✅ Done |
| 4 | `LocalEvents.jsx` RAG-powered agentic concierge with conversational prompt chips | ✅ Done |
| 5 | `PointPlanner.jsx` AI trip planner capturing user location context & time budgets | ✅ Done |
| 6 | `Destinations.jsx` categorized landmark directory (Heritage, Nature, Culture) & detail modals | ✅ Done |
| 7 | `ExploreMap.jsx` interactive geospatial map interface routing | ✅ Done |
| 8 | `CraftAndLoom.jsx`, `Participate.jsx`, & `Taste.jsx` living culture & local host modules | ✅ Done |


## User Flow

```text
[ Landing Page (Home) ] ──► Immersive Hero + Primary Call to Action
       │
       ├─► [ AI Discovery ]
       │      ├─► Local Events (RAG Concierge for real-time gigs/culture)
       │      └─► Plan My Trip (AI Itinerary Generator)
       │
       ├─► [ Core Exploration ]
       │      ├─► Destinations (Landmarks & Heritage)
       │      └─► Explore Map (Geospatial Discovery)
       │
       └─► [ Living Culture Experiences ]
              ├─► Craft & Loom (Handloom & Artisan Sessions)
              ├─► Participate (Community Events & Workshops)
              └─► Taste Local (Culinary Experiences)

```


## Plan My Trip AI Architecture

```text
[ Plan My Trip (AI Trip Planner) ]
       │
       ├─► [ Context Intake ]
       │      ├─► User Location Status (In-Manipur vs. Planning Ahead)
       │      ├─► Time Budget (Available hours/days)
       │      └─► User Interests (Heritage, Nature, Food, etc.)
       │
       ├─► [ AI Processing Engine ]
       │      ├─► LLM Parameter Mapping
       │      ├─► Local Experience Database Query
       │      └─► Spatial & Temporal Optimization
       │
       └─► [ Output Generation ]
              ├─► Time-Blocked Custom Itinerary
              ├─► Standard Landmark Integration
              └─► Hyper-Local Experience Routing (Host & Artisan matching)

```



## RAG Local Events Architecture

```text
[ Local Events (RAG Concierge) ]
       │
       ├─► [ Query Intake ]
       │      ├─► Natural Language Input
       │      └─► Pre-built Prompt Chips (e.g., "folk music tonight")
       │
       ├─► [ Knowledge Base & Retrieval ]
       │      ├─► Vector Database (Live events, gigs, pop-ups, workshops)
       │      ├─► Query Embedding Generation
       │      └─► Semantic Similarity Search (Context Extraction)
       │
       └─► [ Agentic LLM Generation ]
              ├─► Context Synthesis (Fusing query intent with retrieved data)
              └─► Conversational Output (Vibe, Location, Time & Host details)

```


## Tech Stack

| Category | Technology |
| --- | --- |
| **Frontend** | React 18, React Router (SPA navigation, nested layouts), Tailwind CSS (responsive, utility-first styling), Lucide React (icons) |
| **Maps & Geospatial** | React Leaflet, OpenStreetMap tiles |
| **AI / Logic** | Hugging Face Qwen 2.5 Instruct Model, Custom deterministic planner engine, Template-based agentic RAG for Local Events |
| **Tooling** | Vite (build + dev server), Git + GitHub (version control) |


## Project Structure

```text
experience_manipur/
├── public/                 
├── src/
│   ├── assets/               # High-resolution imagery and static assets
│   ├── components/         
│   │   ├── layout/           # Core structural wrappers (AppShell.jsx, navbar.jsx)
│   │   └── shared/           # Reusable UI elements (Cards, Modals, Timelines)
│   ├── data/                 # Local static datasets (localEventsData.js)
│   ├── lib/                  # API clients and DB config (supabase.js, api.js)
│   ├── pages/                # Main application views
│   │   ├── LandingHome.jsx   # Immersive full-width entry point
│   │   ├── LocalEvents.jsx   # Agentic RAG concierge interface
│   │   ├── PointPlanner.jsx  # AI context-aware trip planner
│   │   ├── ExploreMap.jsx    # Geospatial discovery
│   │   └── ...               # Culture modules (Taste, CraftAndLoom, Participate)
│   ├── utils/                # Core logic (AI matching, response generation)
│   ├── App.jsx               # Main React Router component
│   └── main.jsx              # Vite application entry point
├── supabase/                 # Backend configuration and local temp files
├── package.json            
└── README.md               

```


## Impact

### Impact on Tourists

* **Authentic Engagement:** Eliminates the typical "tourist trap" feeling by replacing passive sightseeing with active, hands-on participation.
* **Optimized Travel:** Transforms fragmented free time—such as a spare afternoon before a flight—into a meaningful cultural exchange using smart, time-blocked itineraries.
* **Personalized Journeys:** Unlocks hyper-local experiences that directly match the traveler's specific interests and real-time availability.

### Impact on Culture and Heritage

* **Cultural Promotion:** Actively promotes the rich heritage and culture of the state to a broader audience, increasing awareness and global appreciation.
* **Sustainable Preservation:** Creates a direct financial incentive to preserve and practice indigenous arts, folk music, and traditional handlooms.
* **Living Traditions:** Shifts the focus from static historical monuments to living heritage, ensuring local stories, recipes, and customs remain vibrant and celebrated rather than forgotten.

### Impact on Host (Local Community)

* **Economic Democratization:** Reroutes tourism revenue away from standard tourist hubs and directly into the pockets of local artisans, musicians, and community guides.
* **Digital Enablement:** Provides a trustworthy, structured digital storefront for rural and local creators who previously lacked access to the broader traveler market.
* **Empowered Creators:** Allows locals to monetize their everyday crafts and cultural knowledge sustai




## Team — Glitch

* **Chongtham Allen**
* **James Khuraijam**
* **Khuraijam Dijen**
* **Hensana Kangabam**
* **Surjakanta Thangjam**