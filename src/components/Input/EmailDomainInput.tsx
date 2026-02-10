import { useEffect, useMemo, useRef, useState } from "react";
import { EMAIL_DOMAIN_OPTIONS, type EmailDomainOption } from "@/constants/email";
import Icon from "@/components/Icon/Icon";

interface EmailDomainInputProps {
  id: string;
  value: string; // full email: local@domain
  onChange: (nextEmail: string) => void;
  placeholderLocal?: string; // @ 앞 placeholder
  placeholderDomain?: string; // 직접입력 placeholder
  hasError?: boolean;
  onBlur?: () => void; // 전체 blur 처리
}

const splitEmail = (value: string) => {
  const v = value.trim();
  const at = v.indexOf("@");
  if (at === -1) return { local: v, domain: "" };
  return { local: v.slice(0, at), domain: v.slice(at + 1) };
};

const EmailDomainInput = ({
  id,
  value,
  onChange,
  placeholderLocal = "이메일을 입력해주세요",
  placeholderDomain = "직접입력",
  hasError = false,
  onBlur,
}: EmailDomainInputProps) => {
  const parsed = useMemo(() => splitEmail(value), [value]);

  const [isOpen, setIsOpen] = useState(false);

  const domainOption = useMemo((): EmailDomainOption => {
    const isInOptions = EMAIL_DOMAIN_OPTIONS.includes(parsed.domain as EmailDomainOption);
    return parsed.domain && isInOptions ? (parsed.domain as EmailDomainOption) : "직접입력";
  }, [parsed.domain]);

  const isCustom = domainOption === "직접입력";

  const fullEmail = (local: string, domain: string) => {
    const l = local.trim();
    const d = domain.trim();
    if (!l) return "";
    if (!d) return l;
    return `${l}@${d}`;
  };

  // 바깥 클릭 시 닫기
  const boxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const handleChangeLocal = (nextLocal: string) => {
    onChange(fullEmail(nextLocal, parsed.domain));
  };

  const handleChangeDomain = (nextDomain: string) => {
    onChange(fullEmail(parsed.local, nextDomain));
  };

  const handleSelectDomain = (opt: EmailDomainOption) => {
    setIsOpen(false);

    if (opt === "직접입력") {
      onChange(fullEmail(parsed.local, ""));
    } else {
      onChange(fullEmail(parsed.local, opt));
    }

    onBlur?.();
  };

  return (
    <div
      className={[
        "flex h-12 w-full items-center rounded border bg-white",
        hasError ? "border-error" : "border-gray-200",
      ].join(" ")}
      onBlur={onBlur}
    >
      {/* local */}
      <input
        id={id}
        value={parsed.local} // 로컬 state 대신 parsed 값 사용
        onChange={(e) => handleChangeLocal(e.target.value)}
        placeholder={placeholderLocal}
        className="h-full w-[57%] rounded-l pl-3 text-sm font-normal text-gray-950 outline-none placeholder:text-gray-200 md:px-3"
      />

      {/* domain */}
      <div
        ref={boxRef}
        className={`relative h-full w-[48%] border-l ${hasError ? "border-error" : "border-gray-200"}`}
      >
        <div className="flex h-full items-center">
          <span className="pl-3 pr-2 text-sm font-normal text-gray-950">@</span>

          {isCustom ? (
            <input
              aria-label="이메일 도메인 직접 입력"
              value={parsed.domain} // 로컬 state 대신 parsed 값 사용
              onChange={(e) => handleChangeDomain(e.target.value)}
              placeholder={placeholderDomain}
              className="h-full w-full rounded-r pr-8 text-sm font-normal text-gray-950 outline-none placeholder:text-gray-200"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsOpen((p) => !p)}
              className="flex h-full w-full items-center pr-8 text-[14px] font-medium text-gray-950"
            >
              {domainOption}
            </button>
          )}

          {/* chevron */}
          <button
            type="button"
            onClick={() => setIsOpen((p) => !p)}
            aria-label="이메일 주소 선택"
            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center"
          >
            <Icon name={isOpen ? "chevron-up" : "chevron-down"} className="h-[7px] w-[13px]" />
          </button>
        </div>

        {/* dropdown */}
        {isOpen && (
          <div className="absolute left-0 top-[50px] z-10 w-[150px] rounded-[6px] border border-gray-200 bg-white md:w-full">
            {/* header */}
            <div className="flex h-12 items-center justify-between px-4 text-[14px] font-medium leading-[18px] tracking-[-0.025em] text-gray-950">
              이메일 주소 선택
              <Icon name={isOpen ? "chevron-up" : "chevron-down"} className="h-[7px] w-[13px]" />
            </div>

            {/* divider */}
            <div className="h-px w-full bg-gray-200" />

            {/* options */}
            <ul>
              {EMAIL_DOMAIN_OPTIONS.map((opt) => (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => handleSelectDomain(opt)}
                    className="flex h-12 w-full items-center px-6 text-left text-[14px] font-medium leading-[18px] tracking-[-0.025em] text-gray-950 hover:bg-gray-50"
                  >
                    @ {opt}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailDomainInput;
