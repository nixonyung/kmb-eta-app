type RouteETA = {
  co: 'KMB';
  data_timestamp: string;
  dest_en: string;
  dest_sc: string;
  dest_tc: string;
  dir: 'I' | 'O';
  eta: string;
  eta_seq: number;
  rmk_en: string;
  rmk_sc: string;
  rmk_tc: string;
  route: string;
  seq: number;
  service_type: number;
};

export default RouteETA;
