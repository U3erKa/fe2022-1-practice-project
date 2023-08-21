export const getDays = (time: number) => Math.floor(time / (1000 * 60 * 60 * 24));
export const getHours = (time: number) => Math.floor((time / (1000 * 60 * 60)) % 24);
export const getMinutes = (time: number) => Math.floor((time / (1000 * 60)) % 60);
export const getSeconds = (time: number) => Math.floor((time / 1000) % 60);

export const getRemainingTime = (time: number) => {
  const days = getDays(time);
  const hours = getHours(time);
  const minutes = getMinutes(time);
  const seconds = getSeconds(time);
  const result: string[] = [];

  if (days > 0)
    result.push(`${days}d`);
  if (hours > 0)
    result.push(`${hours}h`);
  if (minutes > 0)
    result.push(`${minutes}m`);
  if (seconds > 0)
    result.push(`${seconds}s`);
  return result.join(' ') || '0s';
};
