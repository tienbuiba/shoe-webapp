export function existKeywordInQuery(keyword: string): boolean {
  if (keyword === undefined || keyword === null || keyword === '') {
    return false;
  } else return true;
}
