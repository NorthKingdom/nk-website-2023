const MEDIA_MIME_TYPES = new Map()
// images
MEDIA_MIME_TYPES.set('jpg', 'image/jpeg')
MEDIA_MIME_TYPES.set('jpeg', 'image/jpeg')
MEDIA_MIME_TYPES.set('png', 'image/png')
MEDIA_MIME_TYPES.set('gif', 'image/gif')
MEDIA_MIME_TYPES.set('avif', 'image/avif')
MEDIA_MIME_TYPES.set('webp', 'image/webp')
// videos
MEDIA_MIME_TYPES.set('mp4', 'video/mp4')
MEDIA_MIME_TYPES.set('webm', 'video/webm')

/**
 * Get the mime type from a filename. Example: `my-image.jpg => image/jpeg`
 * @param filename
 * @returns {string} The mime type
 */
export const getMimeTypeFromFilename = (filename = '') => {
  const fileExtension = filename.split('.').pop()
  return MEDIA_MIME_TYPES.get(fileExtension)
}
