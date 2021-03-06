import { publishReplay, refCount, switchMap } from 'rxjs';

import { useObservable } from '../../common/hooks/useObservable';
import { Balance } from '../../common/models/Balance';
import { selectedNetwork$ } from '../common/network';

export const assetBalance$ = selectedNetwork$.pipe(
  switchMap((n) => n.assetBalance$),
  publishReplay(1),
  refCount(),
);

export const useAssetsBalance = (): [Balance, boolean, Error] =>
  useObservable(assetBalance$, [], new Balance([]));
