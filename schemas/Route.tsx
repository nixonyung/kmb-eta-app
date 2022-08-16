export default interface Route {
  route: string;
  bound: 'I' | 'O';
  service_type: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  orig_tc: string;
  dest_tc: string;
}
