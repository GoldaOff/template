/**
 * Возвращает корректный URL изображения из массива image Last.fm
 * @param images - массив изображений из Last.fm
 * @param preferredSize - желаемый размер (например, 'extralarge', 'large', 'medium')
 */
export function getImageUrl(images: any[], preferredSize: string = 'extralarge'): string {
  if (!Array.isArray(images)) return '';

  const found = images.find(img => img.size === preferredSize && img['#text']);
  if (found && found['#text']) return found['#text'];

  const fallback = images.find(img => img['#text']);
  return fallback ? fallback['#text'] : '';
} 