function compareSimpleOrder(lhs: string | number, rhs: string | number) {
  // compare function that simply uses > / < comparators
  // expect casting numeric strings with Number before calling this function
  return lhs > rhs ? 1 : lhs < rhs ? -1 : 0;
}

export default function compareRouteNameOrder(lhs: string, rhs: string) {
  const {
    prefix: prefix1,
    num: num1,
    suffix: suffix1,
  } = lhs.match(/(?<prefix>[A-Z]*)(?<num>\d+)(?<suffix>[A-Z]*)/)!.groups!;

  const {
    prefix: prefix2,
    num: num2,
    suffix: suffix2,
  } = rhs.match(/(?<prefix>[A-Z]*)(?<num>\d+)(?<suffix>[A-Z]*)/)!.groups!;

  return (
    compareSimpleOrder(prefix1, prefix2) ||
    compareSimpleOrder(Number(num1), Number(num2)) ||
    compareSimpleOrder(suffix1, suffix2)
  );
}
