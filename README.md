# 📦 Project Setup Guide

이 프로젝트는 **Vite + React + TypeScript + Tailwind CSS(v3)** 기반이며,  
**Prettier + ESLint + Husky**를 사용해 코드 스타일과 품질을 자동으로 관리합니다.

아래 순서를 따라서 진행해 주시면 됩니다!

---

## 1️⃣ 프로젝트 클론

클론 받으실 폴더 위치를 설정하시고 아래 명령어를 입력해 주세요.

```bash
git clone https://github.com/UMC-VeriDoc-team/veridoc-client.git
cd veridoc-client
```

## 2️⃣ 의존성 설치

```bash
npm install
```

⚠️ 반드시 실행해야 합니다.

- 이 과정에서 Husky (Git Hook) 가 자동으로 활성화됩니다.
- npm install을 하지 않으면 커밋 시 자동 포맷이 동작하지 않습니다.

## 3️⃣ 개발 서버 실행

```bash
npm run dev
```

기본적으로 아래 주소에서 확인할 수 있습니다:

```bash
http://localhost:5173
```

## 4️⃣ 코드 스타일 & 포맷 규칙

### ✨ Prettier

- 코드 포맷은 Prettier가 단일 기준입니다.
- 커밋 시 자동으로 포맷이 적용됩니다.

수동으로 전체 포맷을 맞추고 싶을 때:

```bash
npx prettier --write .
```

포맷이 맞는지 확인만 할 때:

```bash
npx prettier -c .
```

### 🔍 ESLint

- ESLint는 버그, 타입, React Hook 규칙만 검사합니다.
- Prettier와 충돌하지 않도록 설정되어 있습니다.

전체 검사:

```bash
npx eslint .
```

## 5️⃣ 커밋 규칙

이 프로젝트는 Husky + lint-staged를 사용합니다.

### 커밋 시 동작

- 변경된 파일만 대상으로 Prettier가 자동 실행됩니다.
- 코드 스타일이 맞지 않으면 자동으로 수정 후 커밋됩니다.

정상 동작 확인 방법:

```bash
git commit --allow-empty -m "test: test husky"
```

커밋 시 lint-staged 로그가 출력되면 정상입니다.

---

📁 기술 스택 요약

- Vite
- React
- TypeScript
- Tailwind CSS v3
- ESLint (Flat Config)
- Prettier
- Husky + lint-staged

---

## 📌 Tailwind CSS v3 사용 이유

이 프로젝트는 Tailwind CSS 최신 버전(v4) 대신 **v3**를 사용합니다.

- v3는 이미 충분히 검증된 **안정적인 버전**입니다.
- `tailwind.config` 기반 설정이 명확해 팀 단위 협업과 유지보수에 유리합니다.
- Vite + React + TypeScript 환경에서 레퍼런스와 예제가 풍부합니다.

> 프로젝트의 안정성과 협업 효율을 우선하여 Tailwind CSS v3를 선택했습니다.

```
veridoc-client
├─ .husky
│  ├─ pre-commit
│  └─ _
│     ├─ applypatch-msg
│     ├─ commit-msg
│     ├─ h
│     ├─ husky.sh
│     ├─ post-applypatch
│     ├─ post-checkout
│     ├─ post-commit
│     ├─ post-merge
│     ├─ post-rewrite
│     ├─ pre-applypatch
│     ├─ pre-auto-gc
│     ├─ pre-commit
│     ├─ pre-merge-commit
│     ├─ pre-push
│     ├─ pre-rebase
│     └─ prepare-commit-msg
├─ .prettierignore
├─ .prettierrc
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ icons
│  │  │  ├─ arrow-back.svg
│  │  │  ├─ calendar.svg
│  │  │  ├─ check-fill-green.svg
│  │  │  ├─ check.svg
│  │  │  ├─ chevron-down.svg
│  │  │  ├─ chevron-left.svg
│  │  │  ├─ chevron-right.svg
│  │  │  ├─ chevron-up.svg
│  │  │  ├─ clock.svg
│  │  │  ├─ close.svg
│  │  │  ├─ doctor.svg
│  │  │  ├─ facebook-fill.svg
│  │  │  ├─ facebook-outline.svg
│  │  │  ├─ headache.svg
│  │  │  ├─ health.svg
│  │  │  ├─ help-chat.svg
│  │  │  ├─ hospital.svg
│  │  │  ├─ icon-arrow.svg
│  │  │  ├─ icon-female.svg
│  │  │  ├─ icon-head.svg
│  │  │  ├─ icon-knee.svg
│  │  │  ├─ icon-lock.svg
│  │  │  ├─ icon-logo.svg
│  │  │  ├─ icon-male.svg
│  │  │  ├─ icon-neck.svg
│  │  │  ├─ icon-shoulder.svg
│  │  │  ├─ icon-stomach.svg
│  │  │  ├─ icon-waist.svg
│  │  │  ├─ idea.svg
│  │  │  ├─ info-circle.svg
│  │  │  ├─ info.svg
│  │  │  ├─ instagram-fill.svg
│  │  │  ├─ instagram-outline.svg
│  │  │  ├─ kakao-fill.svg
│  │  │  ├─ knee.svg
│  │  │  ├─ link.svg
│  │  │  ├─ linkedin-outline.svg
│  │  │  ├─ mail.svg
│  │  │  ├─ medical-info.svg
│  │  │  ├─ neck.svg
│  │  │  ├─ repeat.svg
│  │  │  ├─ shoulder.svg
│  │  │  ├─ sleep.svg
│  │  │  ├─ stomachache.svg
│  │  │  ├─ success.svg
│  │  │  ├─ waist.svg
│  │  │  ├─ warning.svg
│  │  │  ├─ x-outline.svg
│  │  │  └─ youtube-outline.svg
│  │  └─ images
│  │     └─ logo.svg
│  ├─ components
│  │  ├─ Button
│  │  │  └─ Button.tsx
│  │  ├─ Footer
│  │  │  └─ Footer.tsx
│  │  ├─ Header
│  │  │  ├─ AuthHeader.tsx
│  │  │  └─ Header.tsx
│  │  ├─ Icon
│  │  │  └─ Icon.tsx
│  │  ├─ Input
│  │  │  ├─ DateOfBirthInput.tsx
│  │  │  ├─ EmailDomainInput.tsx
│  │  │  └─ Input.tsx
│  │  ├─ Modal
│  │  │  ├─ components
│  │  │  │  ├─ auth
│  │  │  │  │  ├─ AuthLoginFailedModal.tsx
│  │  │  │  │  ├─ AuthMailSentModal.tsx
│  │  │  │  │  ├─ AuthPasswordChangedModal.tsx
│  │  │  │  │  ├─ AuthRequiredModal.tsx
│  │  │  │  │  └─ AuthSignUpSuccess.tsx
│  │  │  │  ├─ home
│  │  │  │  │  ├─ components
│  │  │  │  │  │  ├─ GuideItem.tsx
│  │  │  │  │  │  ├─ MedicalConsultationGuide.tsx
│  │  │  │  │  │  └─ SectionHeader.tsx
│  │  │  │  │  ├─ HomeDoctorOpinionModal.tsx
│  │  │  │  │  ├─ HomeTemporaryMeasure.tsx
│  │  │  │  │  ├─ HomeTermsAgreementModal.tsx
│  │  │  │  │  └─ HomeTermsDetailModal.tsx
│  │  │  │  ├─ ModalBackground.tsx
│  │  │  │  └─ my
│  │  │  │     ├─ MyProfileUpdatedModal.tsx
│  │  │  │     ├─ MySymptomChangedModal.tsx
│  │  │  │     ├─ MySymptomNotSelectedModal.tsx
│  │  │  │     ├─ MyWithdrawDoneModal.tsx
│  │  │  │     └─ MyWithdrawNoticeModal.tsx
│  │  │  ├─ constants
│  │  │  │  ├─ mockGuideItem.ts
│  │  │  │  ├─ mockMedicalConsultationGuide.ts
│  │  │  │  └─ termsItems.ts
│  │  │  ├─ ModalPage.tsx
│  │  │  └─ types
│  │  │     ├─ modal.ts
│  │  │     └─ terms.ts
│  │  ├─ Select
│  │  │  └─ GenderSelect.tsx
│  │  └─ Symptom
│  │     ├─ SymptomCard.tsx
│  │     └─ SymptomGrid.tsx
│  ├─ constants
│  │  ├─ email.ts
│  │  └─ symptoms.ts
│  ├─ index.css
│  ├─ layouts
│  │  ├─ DefaultLayout.tsx
│  │  └─ HeaderOnlyLayout.tsx
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ guide
│  │  │  ├─ ColorGuide.tsx
│  │  │  └─ ModalGuidePage.tsx
│  │  ├─ login
│  │  │  ├─ components
│  │  │  │  ├─ BottomLinks.tsx
│  │  │  │  └─ LoginForm.tsx
│  │  │  └─ LoginPage.tsx
│  │  ├─ mypage
│  │  │  ├─ Mypage.tsx
│  │  │  └─ MyPasswordPage.tsx
│  │  ├─ onboarding
│  │  │  └─ OnboardingPage.tsx
│  │  ├─ password
│  │  │  ├─ components
│  │  │  │  ├─ EmailRequestForm.tsx
│  │  │  │  └─ PasswordResetForm.tsx
│  │  │  ├─ PasswordEmailPage.tsx
│  │  │  └─ PasswordResetPage.tsx
│  │  └─ signup
│  │     ├─ components
│  │     │  ├─ SignUpForm.tsx
│  │     │  └─ SignUpSymptomForm.tsx
│  │     ├─ SignUpPage.tsx
│  │     └─ SignUpSymptomPage.tsx
│  ├─ stores
│  │  ├─ modal
│  │  │  ├─ useBaseModal.ts
│  │  │  └─ useTermsAgreementStore.ts
│  │  └─ signup
│  │     └─ useSignupSymptomStore.ts
│  └─ utils
│     └─ validateEmail.ts
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```
