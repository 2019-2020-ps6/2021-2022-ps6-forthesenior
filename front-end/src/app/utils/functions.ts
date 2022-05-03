export function urlPopN(url: String, number: number): string {
  const urlPath = url.split('/');
  for (let i = 0; i < number; i++) {
    urlPath.pop();
  }
  return urlPath.join('/');
}

export function urlPopUntil(url: String, word: string): string {
  const urlPath = url.split('/');
  while (urlPath.length > 0 && word !== urlPath.pop()) {
  }
  return urlPath.join('/');
}

export function isAdmin(): boolean {
  const urlPath = document.URL.split('/');
  if (urlPath.length > 6) {
    return urlPath[6] === 'admin';
  }
  return false;
}

export function addAdminClasses(): void {
  if (isAdmin()) {
    let grid = document.getElementsByTagName('div');
    for (let i = 0; i < grid.length; i++) grid[i].classList.add("admin");
  }
}
