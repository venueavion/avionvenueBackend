const ValidCategories = {
  // Training
  TRAINING_DASHBOARD: 'training_dashboard',
  TRAINING_GALLERY: 'training_gallery',
  TRAINING_SLIDER: 'training_slider',
  TRAINING_ANIMATE: 'training_animate',

  // Wedding
  WEDDING_DASHBOARD: 'wedding_dashboard',
  WEDDING_GALLERY: 'wedding_gallery',
  WEDDING_SLIDER: 'wedding_slider',
  WEDDING_ANIMATE: 'wedding_animate',

  // Church
  CHURCH_DASHBOARD: 'church_dashboard',
  CHURCH_GALLERY: 'church_gallery',
  CHURCH_SLIDER: 'church_slider',
  CHURCH_ANIMATE: 'church_animate',

  // Parties
  PARTIES_DASHBOARD: 'parties_dashboard',
  PARTIES_GALLERY: 'parties_gallery',
  PARTIES_SLIDER: 'parties_slider',
  PARTIES_ANIMATE: 'parties_animate',

  // Private-Hire
  PRIVATE_HIRE_DASHBOARD: 'privateHire_dashboard',
  PRIVATE_HIRE_GALLERY: 'privateHire_gallery',
  PRIVATE_HIRE_SLIDER: 'privateHire_slider',
  PRIVATE_HIRE_ANIMATE: 'privateHire_animate'
} as const;

export type CategoryKey = keyof typeof ValidCategories;
export type CategoryValue = typeof ValidCategories[CategoryKey];

