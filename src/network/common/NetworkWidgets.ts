import { FC } from 'react';

import { SwapFormModel } from '../../pages/Swap/SwapFormModel';

export interface NetworkWidgets {
  GlobalSettingsModal?: FC<{ onClose: () => void }>;
  SwapInfoContent: FC<{ value: SwapFormModel }>;
}