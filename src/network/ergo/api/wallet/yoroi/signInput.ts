import { UnsignedErgoTx, unsignedErgoTxToProxy } from '@ergolabs/ergo-sdk';
import { Input as TxInput } from '@ergolabs/ergo-sdk/build/main/entities/input';

export const signInput = async (
  tx: UnsignedErgoTx,
  input: number,
): Promise<TxInput> => {
  const proxy = unsignedErgoTxToProxy(tx);

  return ergo.sign_tx_input(proxy, input);
};
