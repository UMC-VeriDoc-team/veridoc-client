export const parseBirthYMD = (birthIso: string | null | undefined) => {
  if (!birthIso) return { year: "", month: "", day: "" };

  // "2003-01-01T00:00:00.000Z" -> "2003-01-01"
  const datePart = birthIso.split("T")[0] ?? "";
  const [year = "", month = "", day = ""] = datePart.split("-");

  return { year, month, day };
};
