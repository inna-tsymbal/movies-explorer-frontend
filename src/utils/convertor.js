export function convertor(duration) {
  const hours = Math.floor(parseInt(duration) / 60)
  const minutes = Math.floor(parseInt(duration) % 60)
  return `${hours}ч ${minutes}м`
}

