export const getToday = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1 + '').padStart(2, '0');
  const dd = (date.getDate() + '').padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
