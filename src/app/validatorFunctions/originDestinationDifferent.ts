import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const originDestinationDifferent: ValidatorFn =
  (group: AbstractControl): ValidationErrors | null => {

    const origin = group.get('origin')?.value;
    const destination = group.get('destination')?.value;

    if (!origin || !destination) return null;

    return origin.trim().toLowerCase() === destination.trim().toLowerCase()
      ? { sameLocation: true }
      : null;
  };
