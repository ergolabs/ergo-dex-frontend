import { from, Observable, throwError } from 'rxjs';

export const connectWallet = (): Observable<boolean> => {
  if (!cardano.yoroi) {
    return throwError(() => new Error('EXTENSION_NOT_FOUND'));
  }
  return from(window.ergo_request_read_access());
};
