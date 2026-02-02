export type LocationPermissionState = "granted" | "prompt" | "denied" | "unknown";

export type GeoFailReason =
  | "blocked" // permissions denied (차단)
  | "rejected" // permission denied (거부)
  | "unavailable" // 위치 못 가져옴(기기 위치 서비스 꺼짐)
  | "timeout"
  | "unsupported"
  | "unknown";

// 위치 권한 상태 체크
export const getLocationPermissionState = async (): Promise<LocationPermissionState> => {
  if (!navigator.permissions) return "prompt";

  try {
    const status = await navigator.permissions.query({ name: "geolocation" });
    return status.state;
  } catch {
    return "prompt";
  }
};

// 위치 요청
export const requestLocationOnce = async (): Promise<
  { ok: true } | { ok: false; reason: GeoFailReason }
> => {
  if (!navigator.geolocation) {
    return { ok: false, reason: "unsupported" };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      () => resolve({ ok: true }),
      (err) => {
        if (err.code === 1) return resolve({ ok: false, reason: "rejected" });
        if (err.code === 2) return resolve({ ok: false, reason: "unavailable" });
        if (err.code === 3) return resolve({ ok: false, reason: "timeout" });
        return resolve({ ok: false, reason: "unknown" });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
    );
  });
};

export const makeGeoErrorMessage = (reason: GeoFailReason): string => {
  switch (reason) {
    case "blocked":
      return "브라우저 설정에서 위치정보 권한이 차단되어 있습니다. 위치 권한을 허용해 주세요.";
    case "rejected":
      return "위치정보 제공에 동의하지 않으면 서비스 이용이 제한됩니다.";
    case "unavailable":
      return "현재 위치를 가져올 수 없어요. 기기 위치 서비스/네트워크 설정을 확인해 주세요.";
    case "timeout":
      return "위치 요청 시간이 초과됐어요. 네트워크/설정을 확인해 주세요.";
    case "unsupported":
      return "이 브라우저에서는 위치 기능을 사용할 수 없어요.";
    default:
      return "위치 권한을 확인할 수 없어요. 설정을 확인해 주세요.";
  }
};
