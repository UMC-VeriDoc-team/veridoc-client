import { Link } from "react-router-dom";
import Icon from "@/components/Icon/Icon";

interface FooterLink {
  label: string;
  to: string;
}

interface SocialLink {
  label: string;
  href: string;
  iconName: string;
}

const policyLinks: FooterLink[] = [
  // 임시 링크
  { label: "서비스 이용 약관", to: "/terms" },
  { label: "개인정보처리방침", to: "/privacy" },
  { label: "이메일 무단수집 거부", to: "/email-policy" },
];

const Footer = () => {
  // 임시 SNS 링크
  const socialLinks: SocialLink[] = [
    { label: "Instagram", href: "#", iconName: "instagram" },
    { label: "X", href: "#", iconName: "x" },
    { label: "LinkedIn", href: "#", iconName: "linkedIn" },
    { label: "Facebook", href: "#", iconName: "facebook" },
    { label: "YouTube", href: "#", iconName: "youTube" },
  ];

  return (
    <footer className="flex w-full justify-center border-t border-layout-footerBorder bg-layout-footerBg px-20 py-14 xl:px-28">
      <div className="flex w-fit flex-col gap-12">
        {/* 상단 1행: 브랜드 / 설명 / 링크 */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left: Logo + Social */}
          <div className="col-span-12 flex h-fit flex-col gap-4 md:col-span-3">
            <div className="font-brand text-xl font-bold text-layout-footerTitle">VeriDoc</div>

            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0"
                >
                  <Icon name={item.iconName} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Description */}
          <div className="col-span-12 flex flex-col gap-1 md:col-span-6">
            <div className="text-sm text-layout-footerText">베리닥(VeriDoc)</div>
            <p className="text-sm text-layout-footerText">
              본 서비스는 의료 정보를 기반으로 한 건강 정보 안내 서비스입니다. 의료 행위, 진단,
              처방을 제공하지 않으며, 개별 증상에 대한 정확한 진단과 치료는 반드시 전문 의료진과
              상담하시기 바랍니다.
            </p>
          </div>
        </div>

        {/* 하단 2행: Copyright / Policy Links */}
        <div className="flex flex-col gap-4 text-sm font-medium text-layout-footerText md:flex-row md:items-center md:justify-between">
          <div className="leading-6">© Copyright © VeriDoc. All Rights Reserved.</div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-8">
            {policyLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="truncate text-layout-footerText transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
