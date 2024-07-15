import dayjs from 'dayjs';

export const sortByCreated = <T extends { created: string }>(entities: T[]) => {
  return entities.sort((a, b) => {
    if (dayjs(a.created).isAfter(b.created)) return -1;
    if (dayjs(a.created).isBefore(b.created)) return 1;
    return 0;
  });
};
