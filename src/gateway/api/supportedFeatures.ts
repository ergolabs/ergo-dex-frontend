import { publishReplay, refCount, switchMap } from 'rxjs';

import { selectedNetwork$ } from '../common/network';

export const supportedFeatures$ = selectedNetwork$.pipe(
  switchMap((network) => network.supportedFeatures$),
  publishReplay(1),
  refCount(),
);
