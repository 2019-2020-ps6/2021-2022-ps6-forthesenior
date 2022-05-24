export function setAdminOption(): void {
  document.documentElement.style.setProperty("--white", "#FFFFFF");
  document.documentElement.style.setProperty("--black", "#000000");
  document.documentElement.style.setProperty("--blue", "#3f51b5");
  document.documentElement.style.setProperty("--size-answer", "200px");
  document.documentElement.style.setProperty("--gap-column", "10px");
  document.documentElement.style.setProperty("--gap-row", "10px");
  document.documentElement.style.setProperty("--font-size", "20px");
  document.documentElement.style.setProperty("--number-column", "5");
  document.documentElement.style.setProperty("--background-color", "#F5F2E7");
  document.documentElement.style.setProperty("--header-color", "#2666CF");
  document.documentElement.style.setProperty("--white", "#faf8f3");
  document.documentElement.style.setProperty("--text-color", "#2666CF");
  document.documentElement.style.setProperty("--titre-color", "#2C3333");
  document.documentElement.style.setProperty("--header-text", "#faf8f3");
}

export function setDarkTheme(): void {
  document.documentElement.style.setProperty("--background-color", "#2C3333");
  document.documentElement.style.setProperty("--header-color", "#395B64");
  document.documentElement.style.setProperty("--white", "#6b7070");
  document.documentElement.style.setProperty("--text-color", "#de6e00");
  document.documentElement.style.setProperty("--titre-color", "#dcd9cf");
  document.documentElement.style.setProperty("--header-text", "#dcd9cf");
}

export function setLightTheme(): void {
  document.documentElement.style.setProperty("--background-color", "#F5F2E7");
  document.documentElement.style.setProperty("--header-color", "#2666CF");
  document.documentElement.style.setProperty("--white", "#faf8f3");
  document.documentElement.style.setProperty("--text-color", "#2666CF");
  document.documentElement.style.setProperty("--titre-color", "#2C3333");
  document.documentElement.style.setProperty("--header-text", "#faf8f3");
}
