export namespace MaskUtils {
  export function maskEmail(email: string, firstCharsCount: number = 2, starsCount: number = 3, lastCharsCount: number = 1): string {
    const [localPart, domain] = email.split('@');

    const maskableLength = localPart.length - firstCharsCount - lastCharsCount;

    if (maskableLength > 0) {
      const firstChars = localPart.slice(0, firstCharsCount);
      const lastChars = localPart.slice(-lastCharsCount);
      const maskedPart = '*'.repeat(Math.min(maskableLength, starsCount));
      return `${firstChars}${maskedPart}${lastChars}@${domain}`;
    }
    return email;
  }
}
