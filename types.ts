
export enum View {
  GATE = 'gate',                   // 1. Entry
  DECOMPRESSION = 'decompression', // 2. Decompression
  ORIENTATION = 'orientation',     // 3. Orientation
  MASTERY = 'mastery',             // 4. First Mastery Demo
  PRACTICE_1 = 'practice_1',       // 5. First Guided Practice
  REFLECTION = 'reflection',       // 6. Micro Reflection
  PRACTICE_2 = 'practice_2',       // 7. Second Guided Practice
  CONTRAST = 'contrast',           // 8. Contrast Installation
  TENSION = 'tension',             // 9. Control Removal
  PRACTICE_3 = 'practice_3',       // 10. Third Practice (Reduced Guidance)
  PATTERN = 'pattern',             // 11. Name the Pattern
  PERSONALIZATION = 'personalization', // 12. Personal Application
  PROJECTION = 'projection',       // 13. Projection into Life
  COMPLETION = 'completion',       // 14. End of Free Experience
  SYSTEM_INSTALLATION = 'system_installation', // 11 Step Calibration
  POST_INSTALL = 'post_install',   // Transition
  UPSELL = 'upsell',               // Upsell ($497)
  PERMANENT_SYSTEM = 'permanent_system', // Full OS
  SYSTEM = 'system'                // Legacy/Fallback
}

export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
  maps?: {
    uri?: string;
    title?: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: GroundingChunk[];
  image?: string;
  video?: string;
}
