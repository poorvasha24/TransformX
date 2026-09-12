export interface SIHTheme {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  domainOverview: string;
  focusAreas: string[];
  potentialImpact: string;
  technologyDomains: string[];
  iconType: 'automation' | 'robotics' | 'blockchain' | 'education' | 'vehicles' | 'energy' | 'disaster';
  accentColor: 'cyan' | 'red' | 'blue' | 'amber';
  armorCode: string;
  tacticalSpecs: {
    complexity: string;
    deploymentSector: string;
    matrixFrequency: string;
  };
}

export interface RoadmapMilestone {
  phaseId: string;
  phaseCode: string;
  title: string;
  description: string;
  date: string;
  time: string;
  status?: string;
  type: 'REGISTRATION' | 'QUIZ' | 'QUALIFICATION' | 'PROPOSAL' | 'ELITE' | 'ARENA' | 'SUBMISSION';
  accent: 'blue' | 'cyan' | 'red' | 'amber';
  isFinal?: boolean;
}

export interface CommanderMessage {
  id: string;
  title: string;
  text: string;
  sectionTrigger: string;
}
