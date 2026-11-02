// Shared server-side checks. Import into actions, Paystack initialization,
// webhook and callback. Never rely solely on browser validation.
export type RequiredApplication = {
  fullName: string | null;
  email: string | null;
  phone: string | null;
  idNumber: string | null;
  categoryId: string | null;
  qualification: string | null;
  institution: string | null;
  position: string | null;
  employer: string | null;
  experience: string | null;
  idDocumentUrl: string | null;
  qualificationDocUrl: string | null;
  cvDocumentUrl: string | null;
  dataProtectionConsent: boolean;
};

export function missingApplicationRequirements(a: RequiredApplication): string[] {
  const fields: Array<[keyof RequiredApplication, string]> = [
    ['fullName', 'Full legal name'], ['email', 'Email address'],
    ['phone', 'Phone number'], ['idNumber', 'ID/passport number'],
    ['categoryId', 'Membership category'], ['qualification', 'Qualification'],
    ['institution', 'Institution'], ['position', 'Current position'],
    ['employer', 'Current employer'], ['experience', 'Professional experience'],
    ['idDocumentUrl', 'ID/passport document'],
    ['qualificationDocUrl', 'Qualification certificate'],
    ['cvDocumentUrl', 'CV/professional profile'],
  ];
  const missing = fields.filter(([key]) => {
    const v = a[key];
    return typeof v !== 'string' || !v.trim();
  }).map(([, label]) => label);
  if (a.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email.trim())) missing.push('Valid email address');
  if (a.phone && a.phone.replace(/\D/g, '').length < 9) missing.push('Valid phone number');
  if (!a.dataProtectionConsent) missing.push('Data protection consent');
  return missing;
}

export function normalizeIdentity(value: string | undefined | null): string {
  return (value ?? '').trim().toUpperCase().replace(/[\s-]+/g, '');
}
