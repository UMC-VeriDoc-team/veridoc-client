export const EMAIL_DOMAIN_OPTIONS = ["직접입력", "naver.com", "hanmail.com", "gmail.com"] as const;

export type EmailDomainOption = (typeof EMAIL_DOMAIN_OPTIONS)[number];
