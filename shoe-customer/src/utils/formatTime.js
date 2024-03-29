import { format, formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale'
// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm');
}
export function fDateLocal(date) {
  return format(new Date(date), 'dd MMMM yyyy', { locale: vi })
}
export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}