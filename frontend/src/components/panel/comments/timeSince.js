export const timeSince = (date) => {
  const seconds = Math.floor((Date.now() - Date.parse(date)) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
};

// This code was shared with my from classmate Alex Chui

export const alphabetizeTags = (tags) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  if (tags.length <= 1) return tags;
  const pivot = tags[0];
  const left = [];
  const right = [];

  for (let i = 1; i < tags.length; i += 1) {
    const a = alphabet.indexOf(tags[i].name[0].toLowerCase());
    const b = alphabet.indexOf(pivot.name[0].toLowerCase());
    a < b ? left.push(tags[i]) : right.push(tags[i]);
  }

  return alphabetizeTags(left).concat([pivot], alphabetizeTags(right));
};