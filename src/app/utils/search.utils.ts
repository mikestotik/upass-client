export const searchByField = <
  T extends {
    [fieldName: string]: string;
  },
>(
  entities: T[],
  fieldName: string,
  search?: string,
) => {
  if (search?.length) {
    return entities.filter((i) => i[fieldName].toLowerCase().includes(search.toLowerCase()));
  }
  return entities;
};

export const searchBySelectOptionLabel = (input: string, option?: { label: string; value: number }) => {
  return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
};
