import { format } from "date-fns";

export const formatTanggal = (tanggal) =>
  format(tanggal, "eeee, dd LLL yyy - kk:mm");
