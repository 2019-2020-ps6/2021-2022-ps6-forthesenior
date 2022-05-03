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
