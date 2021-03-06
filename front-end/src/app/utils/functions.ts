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

export function addAdminClasses(): void {
  let grid = document.getElementsByTagName('div');
  for (let i = 0; i < grid.length; i++) grid[i].classList.add("admin");
}

export function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
