// neudental v1 - Dr. Swetha's council registration, worded for each place it
// appears. The number itself lives once, in DOCTOR.registration (src/data.ts).
import type { Doctor } from '../types';

// "Tamil Nadu State Dental Council Reg. No. 38437", with non-breaking spaces
// so "Reg. No. 38437" never wraps onto two lines (homepage, footer).
export function registrationLabel(doctor: Pick<Doctor, 'registration'>): string {
  const reg = doctor.registration;
  return reg ? `${reg.council} Reg.\u00a0No.\u00a0${reg.number}` : '';
}

// "Registered with the Tamil Nadu State Dental Council (Reg. No. 38437)"
// (profile page).
export function registrationSentence(doctor: Pick<Doctor, 'registration'>): string {
  const reg = doctor.registration;
  return reg ? `Registered with the ${reg.council} (Reg.\u00a0No.\u00a0${reg.number})` : 'Registered with the Tamil Nadu State Dental Council';
}
