import React, { useState } from 'react';
import { filter, skip } from 'rxjs';

import { InfoTooltip } from '../../../components/InfoTooltip/InfoTooltip';
import { MIN_NITRO } from '../../../constants/erg';
import { useSettings } from '../../../context';
import {
  Box,
  Button,
  Flex,
  Popover,
  SettingOutlined,
  Typography,
} from '../../../ergodex-cdk';
import {
  CheckFn,
  Form,
  Messages,
  useForm,
} from '../../../ergodex-cdk/components/Form/NewForm';
import { useSubscription } from '../../../hooks/useObservable';
import { NitroInput } from './NitroInput/NitroInput';
import { SlippageInput } from './SlippageInput/SlippageInput';

interface SettingsModel {
  readonly slippage: number;
  readonly nitro: number;
}

const warningMessages: Messages<SettingsModel> = {
  slippage: {
    transactionFrontrun: 'Your transaction may be frontrun',
  },
};

const errorMessages: Messages<SettingsModel> = {
  nitro: {
    minNitro: `Minimal Nitro value is ${MIN_NITRO}`,
  },
};

const slippageCheck: CheckFn<number> = (value) => {
  return value > 1 ? 'transactionFrontrun' : undefined;
};

const nitroCheck: CheckFn<number> = (value) => {
  return value < MIN_NITRO ? 'minNitro' : undefined;
};

const TransactionSettings = (): JSX.Element => {
  const [settings, setSettings] = useSettings();
  const [isPopoverShown, setIsPopoverShown] = useState(false);

  const form = useForm<SettingsModel>({
    slippage: useForm.ctrl(settings.slippage, [], [slippageCheck]),
    nitro: useForm.ctrl(settings.nitro, [nitroCheck]),
  });
  const handlePopoverShown = (visible: boolean) => {
    if (!visible) {
      form.reset(
        {
          slippage: settings.slippage,
          nitro: settings.nitro,
        },
        { emitEvent: 'system' },
      );
    }
    setIsPopoverShown((prev) => !prev);
  };

  useSubscription(
    form.controls.slippage.valueChanges$.pipe(skip(1), filter(Boolean)),
    (slippage) =>
      setSettings({
        ...settings,
        slippage: slippage,
      }),
  );

  useSubscription(
    form.controls.nitro.valueChanges$.pipe(
      skip(1),
      filter((value) => !!value && value >= MIN_NITRO),
    ),
    (nitro) =>
      setSettings({
        ...settings,
        nitro: nitro,
      }),
  );

  const Setting: JSX.Element = (
    <Box transparent padding={4} width={360}>
      <Form
        form={form}
        onSubmit={() => {}}
        warningMessages={warningMessages}
        errorMessages={errorMessages}
      >
        <Flex col>
          <Flex.Item marginBottom={4}>
            <Typography.Title level={5}>Transaction Settings</Typography.Title>
          </Flex.Item>
          <Flex.Item>
            <Typography.Footnote>Slippage tolerance</Typography.Footnote>
            <InfoTooltip content="Distinctively monetize cost effective networks for cross-media bandwidth" />
          </Flex.Item>
          <Flex.Item marginBottom={2}>
            <Form.Item name="slippage">
              {({ onChange, value, withWarnings, warningMessage }) => (
                <SlippageInput
                  withWarnings={withWarnings}
                  warningMessage={warningMessage}
                  onChange={onChange}
                  value={value}
                />
              )}
            </Form.Item>
          </Flex.Item>
          <Flex.Item>
            <Typography.Footnote>Nitro</Typography.Footnote>
            <InfoTooltip content="Maximum DEX fee multiplier" />
          </Flex.Item>
          <Flex.Item>
            <Form.Item name="nitro">
              {({ onChange, value, invalid, errorMessage }) => (
                <NitroInput
                  invalid={invalid}
                  errorMessage={errorMessage}
                  onChange={onChange}
                  value={value}
                />
              )}
            </Form.Item>
          </Flex.Item>
        </Flex>
      </Form>
    </Box>
  );

  return (
    <Popover
      content={Setting}
      trigger="click"
      placement="bottomRight"
      visible={isPopoverShown}
      onVisibleChange={handlePopoverShown}
    >
      <Button type="text" size="large" icon={<SettingOutlined />} />
    </Popover>
  );
};

export { TransactionSettings };