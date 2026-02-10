import Icon from "@/components/Icon/Icon";
import { useBaseModal } from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import { TermsKey } from "@/components/Modal/types/terms";

interface PolicyModalLink {
  label: string;
  termsKey: TermsKey;
}

interface SocialLink {
  label: string;
  href: string;
  iconName: string;
}

const policyLinks: PolicyModalLink[] = [
  { label: "서비스 이용 약관", termsKey: TermsKey.SERVICE },
  { label: "개인정보처리방침", termsKey: TermsKey.PRIVACY },
  { label: "위치기반 서비스 이용", termsKey: TermsKey.LOCATION },
];

const Footer = () => {
  const { openModal } = useBaseModal();

  // SNS 링크
  const socialLinks: SocialLink[] = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/veridoc_?igsh=ZHJqbnBtb3lybWEy&utm_source=qr",
      iconName: "instagram-outline",
    },
    { label: "X", href: "#", iconName: "x-outline" },
    { label: "LinkedIn", href: "#", iconName: "linkedin-outline" },
    { label: "Facebook", href: "#", iconName: "facebook-outline" },
    { label: "YouTube", href: "#", iconName: "youtube-outline" },
  ];

  const goToSNS = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#") {
      e.preventDefault();
      openModal(ModalType.SERVICE_PREPARING);
    }
  };

  const handleOpenPolicy = (termsKey: TermsKey) => {
    openModal(ModalType.HOME_TERMS_DETAIL, {
      activeKey: termsKey,
      from: "footer",
    });
  };

  return (
    <footer className="hidden w-full justify-center border-t border-layout-footerBorder bg-layout-footerBg px-20 py-14 md:flex xl:px-28">
      <div className="flex w-fit flex-col gap-12">
        {/* 상단 1행: 브랜드 / 설명 / 링크 */}
        <div className="gap-8 sm:grid sm:grid-cols-6 lg:grid-cols-12">
          {/* Left: Logo + Social */}
          <div className="col-span-12 flex h-fit flex-col gap-4 md:col-span-3">
            <div className="font-brand text-xl font-bold text-layout-footerTitle">VeriDoc</div>

            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target={item.href === "#" ? undefined : "_blank"}
                  rel={item.href === "#" ? undefined : "noreferrer"}
                  className="shrink-0"
                  onClick={(e) => goToSNS(e, item.href)}
                >
                  <Icon name={item.iconName} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Description */}
          <div className="col-span-12 flex flex-col gap-1 md:col-span-6">
            <div className="text-sm font-medium text-layout-footerText">베리닥(VeriDoc)</div>
            <p className="text-sm font-medium text-layout-footerText">
              본 서비스는 의료 정보를 기반으로 한 건강 정보 안내 서비스입니다. 의료 행위, 진단,
              처방을 제공하지 않으며, 개별 증상에 대한 정확한 진단과 치료는 반드시 전문 의료진과
              상담하시기 바랍니다.
            </p>
          </div>
        </div>

        {/* 하단 2행: Copyright / Policy Links */}
        <div className="flex flex-col gap-4 text-sm font-medium text-layout-footerText md:flex-row md:items-center md:justify-between">
          <div className="font-medium leading-6">© Copyright © VeriDoc. All Rights Reserved.</div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-8">
            {policyLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleOpenPolicy(link.termsKey)}
                className="truncate font-medium text-layout-footerText transition-colors hover:opacity-80"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
