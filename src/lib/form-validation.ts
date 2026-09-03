export interface ValidationError {
  field: string;
  message: string;
}

export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 20;
}

export function validateEmail(email: string): boolean {
  if (!email) return true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

export function validateRequired(value: string, fieldName: string): ValidationError | null {
  if (!value || !value.trim()) {
    return { field: fieldName, message: `${fieldName} is required` };
  }
  return null;
}

export function validateEnquiryForm(data: {
  name: string;
  phone: string;
  email?: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  const nameError = validateRequired(data.name, "Name");
  if (nameError) errors.push(nameError);
  else if (!validateName(data.name)) {
    errors.push({ field: "name", message: "Name must be at least 2 characters" });
  }

  const phoneError = validateRequired(data.phone, "Phone");
  if (phoneError) errors.push(phoneError);
  else if (!validatePhone(data.phone)) {
    errors.push({ field: "phone", message: "Phone must be a valid number (10-20 digits)" });
  }

  if (data.email && !validateEmail(data.email)) {
    errors.push({ field: "email", message: "Email must be valid" });
  }

  return errors;
}
