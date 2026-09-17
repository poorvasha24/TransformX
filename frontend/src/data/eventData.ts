import { SIHTheme, RoadmapMilestone } from '../types';

export const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc-lbcIb8HY2JCAS5xGk3Kp-X3IeMYcU8O8EHWjt1IJQ-sMMA/viewform?usp=dialog";

export const SIH_THEMES: SIHTheme[] = [
  {
    id: "smart-automation",
    number: "01",
    title: "SMART AUTOMATION",
    shortDescription: "Intelligent resource optimization and AI synthesis to explore multi-source telemetry and generate real-time actionable insights.",
    domainOverview: "Architecting autonomous algorithmic pipelines that leverage advanced Artificial Intelligence, Machine Learning, and real-time sensory pipelines to revolutionize industrial workflows and data orchestration.",
    focusAreas: [
      "Autonomous Industrial Process Optimization",
      "Predictive Maintenance & Telemetry Neural Networks",
      "AI-driven Multi-modal Cognitive Analysis",
      "Adaptive Robotic Process Automation (RPA)"
    ],
    potentialImpact: "Reduces critical operational latency by over 60%, eliminates manual data bottlenecks, and scales computational throughput across enterprise architectures.",
    technologyDomains: [
      "Deep Learning & PyTorch",
      "Computer Vision & Edge AI",
      "Reinforcement Learning",
      "Distributed Event Streaming (Kafka/MQTT)"
    ],
    iconType: "automation",
    accentColor: "cyan",
    armorCode: "AUT-M9X",
    tacticalSpecs: {
      complexity: "CLASS-V TACTICAL",
      deploymentSector: "NEURAL COGNITION",
      matrixFrequency: "840.4 THz"
    }
  },
  {
    id: "robotics-drones",
    number: "02",
    title: "ROBOTICS & DRONES",
    shortDescription: "Autonomous unmanned aerial and ground robotic systems engineered to solve critical search, rescue, and medical challenges across India.",
    domainOverview: "Developing next-generation autonomous drones and agile robotic platforms equipped with spatial mapping, obstacle evasion, and precision payload delivery in austere environments.",
    focusAreas: [
      "Autonomous Emergency Medical Supply Drone Fleets",
      "Disaster Search & Rescue Quadruped/Swarm Drones",
      "Precision Agro-Robotics & Remote LiDAR Terrain Scanning",
      "Hazardous Environment Inspection Mechatronics"
    ],
    potentialImpact: "Accelerates emergency medical logistics into remote terrains by 85%, safeguards rescue personnel during catastrophic events, and enhances infrastructural resilience.",
    technologyDomains: [
      "ROS 2 (Robot Operating System)",
      "PX4 Autopilot & MAVLink",
      "SLAM (Simultaneous Localization & Mapping)",
      "Edge TensorRT Computer Vision"
    ],
    iconType: "robotics",
    accentColor: "red",
    armorCode: "ROB-DRN7",
    tacticalSpecs: {
      complexity: "CLASS-IV MECHATRONIC",
      deploymentSector: "AERIAL & GROUND DEFENSE",
      matrixFrequency: "912.8 THz"
    }
  },
  {
    id: "blockchain-cybersecurity",
    number: "03",
    title: "BLOCKCHAIN & CYBERSECURITY",
    shortDescription: "Decentralized cryptographic ledgers and impenetrable defense architectures for securing sovereign data and distributed transactions.",
    domainOverview: "Constructing zero-trust cybernetic shields, tamper-proof decentralized identity vaults, and verifiable smart contract networks across supply chains and critical digital infrastructure.",
    focusAreas: [
      "Zero-Knowledge (ZK) Proof Identity & Privacy Protocols",
      "Quantum-Resistant Cryptographic Key Exchange",
      "Autonomous AI Threat Detection & Honey-grid Systems",
      "Decentralized Verifiable Credential Registries"
    ],
    potentialImpact: "Neutralizes malicious lateral intrusion attempts, prevents sovereign data corruption, and establishes trustless multi-party auditability.",
    technologyDomains: [
      "Solidity & EVM / Rust Smart Contracts",
      "Zero-Knowledge SNARKs / STARKs",
      "eBPF Kernel Security Probing",
      "Decentralized Storage (IPFS / Arweave)"
    ],
    iconType: "blockchain",
    accentColor: "blue",
    armorCode: "SEC-BLK3",
    tacticalSpecs: {
      complexity: "CLASS-V CRYPTOGRAPHIC",
      deploymentSector: "CYBER MATRIX DEFENSE",
      matrixFrequency: "512.0 THz"
    }
  },
  {
    id: "smart-education",
    number: "04",
    title: "SMART EDUCATION",
    shortDescription: "Immersive cognitive learning environments enabling flexible, adaptive, and accessible mastery for the digital age.",
    domainOverview: "Transforming traditional pedagogical frameworks into hyper-personalized, multimodal AI learning companions and spatial VR/AR collaborative simulators.",
    focusAreas: [
      "Real-time Generative AI Adaptive Curriculum Engines",
      "Multilingual Spatial AR/VR Science & Engineering Labs",
      "Gamified Skill-Tree Mastery & Verifiable Proof-of-Skill",
      "Accessible Assistive Interfaces for Neurodiverse Learners"
    ],
    potentialImpact: "Democratizes world-class technical education across rural and underserved regions, elevating learning retention rates by 300%.",
    technologyDomains: [
      "Generative Multimodal LLMs",
      "WebXR / Three.js Spatial Computing",
      "Adaptive Learning Analytics",
      "Speech-to-Speech Real-time Translation"
    ],
    iconType: "education",
    accentColor: "amber",
    armorCode: "EDU-COG2",
    tacticalSpecs: {
      complexity: "CLASS-III SYNAPTIC",
      deploymentSector: "KNOWLEDGE MATRIX",
      matrixFrequency: "420.6 THz"
    }
  },
  {
    id: "smart-vehicles",
    number: "05",
    title: "SMART VEHICLES",
    shortDescription: "Connected vehicular intelligence, autonomous telematics, and V2X communication transforming mobility and transport infrastructure.",
    domainOverview: "Engineering connected vehicular cyber-architectures, vehicle-to-everything (V2X) telemetry meshes, collision avoidance algorithms, and EV smart battery management systems.",
    focusAreas: [
      "Vehicle-to-Grid (V2G) & Adaptive Energy Routing",
      "V2X Ultra-Low Latency Collision Mitigation Networks",
      "Autonomous Fleet Dispatching & Swarm Routing",
      "Predictive Battery Thermal Management & Fast-Charging"
    ],
    potentialImpact: "Dramatically curtails urban transit fatalities, optimizes peak grid load balancing, and cuts fleet transit emissions by 40%.",
    technologyDomains: [
      "CAN Bus / OBD-II Telematics",
      "5G C-V2X Protocols",
      "Embedded C++ Real-Time Systems",
      "Predictive Machine Learning Telemetry"
    ],
    iconType: "vehicles",
    accentColor: "red",
    armorCode: "VEH-OPT1",
    tacticalSpecs: {
      complexity: "CLASS-V PROPULSION",
      deploymentSector: "TACTICAL MOBILITY",
      matrixFrequency: "768.2 THz"
    }
  },
  {
    id: "renewable-energy",
    number: "06",
    title: "RENEWABLE / SUSTAINABLE ENERGY",
    shortDescription: "Next-generation energy generation, micro-grid optimization, and clean storage tech powering zero-emission futures.",
    domainOverview: "Pioneering intelligent micro-grid load balancers, algorithmic solar/wind output forecasters, and circular thermodynamic resource converters.",
    focusAreas: [
      "AI Micro-Grid Frequency & Distributed Battery Management",
      "Decentralized Peer-to-Peer Clean Energy Trading",
      "Predictive Solar Array Tracking & Thermal Dissipation",
      "Carbon Capture IoT Monitoring & Verification Systems"
    ],
    potentialImpact: "Maximizes clean energy harvest efficiency by 35%, curbs transmission line losses, and fortifies regional power grid resilience.",
    technologyDomains: [
      "Smart Metering IoT & Modbus",
      "Time-Series Forecasting (Transformers/LSTM)",
      "Decentralized Energy Ledger Protocols",
      "Embedded Microcontroller Firmware"
    ],
    iconType: "energy",
    accentColor: "cyan",
    armorCode: "ENG-NRG6",
    tacticalSpecs: {
      complexity: "CLASS-IV ENERGON",
      deploymentSector: "CLEAN POWER ARRAY",
      matrixFrequency: "990.0 THz"
    }
  },
  {
    id: "disaster-management",
    number: "07",
    title: "DISASTER MANAGEMENT",
    shortDescription: "Early warning sensors, rapid emergency response grids, and resilient recovery orchestration for catastrophic events.",
    domainOverview: "Deploying mission-critical IoT seismic and hydrological sensors, satellite imagery deep-synthesis, and decentralized first-responder tactical dispatch arrays.",
    focusAreas: [
      "Satellite & Seismic Early Warning Alert Networks",
      "Decentralized Mesh Communications for Severed Grids",
      "AI Damage Assessment from Real-time Satellite Feeds",
      "Autonomous Resource Allocation & Evacuation Navigation"
    ],
    potentialImpact: "Provides crucial pre-impact evacuation windows of up to 45 minutes, saving thousands of lives during floods, cyclones, and seismic incidents.",
    technologyDomains: [
      "Satellite Geospatial Analytics (SAR / Optical)",
      "LoRaWAN & Ad-hoc Mesh Networks",
      "Real-time GIS Spatial Mapping",
      "Emergency Broadcast Protocols"
    ],
    iconType: "disaster",
    accentColor: "amber",
    armorCode: "DIS-TAC8",
    tacticalSpecs: {
      complexity: "CLASS-V MISSION CRITICAL",
      deploymentSector: "EMERGENCY SHIELD",
      matrixFrequency: "640.5 THz"
    }
  }
];

export const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    phaseId: "phase-00",
    phaseCode: "PHASE_00",
    title: "REGISTRATION PROTOCOL INIT",
    description: "Participant onboarding and team registration sequence initiation. Connect your squad to the central command node, verify individual technical credentials, and officially enter the tournament bracket before the uplink closes.",
    date: "9th September 2026",
    time: "",
    type: "REGISTRATION",
    accent: "blue"
  },
  {
    phaseId: "phase-01",
    phaseCode: "PHASE_01",
    title: "UPLINK SEVERED: SUBMISSION DEADLINE",
    description: "Units must submit detailed system blueprints, tech-stack justification, and a clear execution matrix. The uplink for all registrations and submissions will be permanently severed.",
    date: "21st September 2026",
    time: "",
    status: "BROADCAST",
    type: "SUBMISSION",
    accent: "cyan"
  },
  {
    phaseId: "phase-03",
    phaseCode: "PHASE_03",
    title: "ELITE SQUAD SHORTLIST",
    description: "Transmission of shortlisted units for the final engagement. Only the most optimal teams demonstrating superior computational thinking proceed to the offline battlefield.",
    date: "23rd September 2026",
    time: "",
    type: "QUALIFICATION",
    accent: "blue"
  },
  {
    phaseId: "critical-arena",
    phaseCode: "PHASE_04",
    title: "QUANTUM ARENA",
    description: "Offline tactical hackathon. Build, deploy, and debug real-time solutions under extreme time pressure. The final test of endurance, teamwork, and raw engineering capability before the judging tribunal.",
    date: "25th September 2026",
    time: "9 AM to 4 PM",
    status: "CRITICAL ENGAGEMENT",
    type: "ARENA",
    accent: "red",
    isFinal: true
  }
];

export const COMMANDER_SCRIPTS: Record<string, { title: string; lines: string[] }> = {
  hero: {
    title: "COMMAND LINK ONLINE",
    lines: [
      "COMMAND LINK ESTABLISHED.",
      "Welcome, builder.",
      "Scroll to explore the mission."
    ]
  },
  event: {
    title: "MISSION PARAMETERS",
    lines: [
      "MISSION PARAMETERS DETECTED.",
      "Target Date: 25 September 2026.",
      "8-hour tactical sprint. Fuel payload provided."
    ]
  },
  themes: {
    title: "TACTICAL DOMAINS",
    lines: [
      "SEVEN DOMAINS. UNLIMITED POSSIBILITIES.",
      "Select a theme module to decrypt mission blueprints.",
      "Align your squad with a high-impact vector."
    ]
  },
  roadmap: {
    title: "MISSION TIMELINE",
    lines: [
      "TRACK YOUR JOURNEY. COMPLETE EACH PHASE.",
      "From neural aptitude to the final Quantum Arena.",
      "Stay synchronized with mission milestones."
    ]
  },
  register: {
    title: "CALL TO ACTION",
    lines: [
      "YOUR NEXT MISSION AWAITS.",
      "Transform your concept into reality.",
      "Initiate registration protocol now!"
    ]
  }
};
