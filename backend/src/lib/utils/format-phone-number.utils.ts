export function formatPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.length === 10) {
    return `+90${phoneNumber}`;
  } else if (phoneNumber.length === 11) {
    return `+9${phoneNumber}`;
  } else if (phoneNumber.length === 12) {
    return `+${phoneNumber}`;
  }
  return phoneNumber;
}
