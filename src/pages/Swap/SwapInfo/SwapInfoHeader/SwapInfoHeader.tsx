import { DownOutlined, Flex, Typography, UpOutlined } from '@ergolabs/ui-kit';
import React, { FC } from 'react';
import styled from 'styled-components';

import { SwapFormModel } from '../../SwapFormModel';
import { RatioView } from './RatioView/RatioView';
import { SlippageTag } from './SlippageTag/SlippageTag';

export interface SwapInfoHeaderProps {
  readonly value: SwapFormModel;
  readonly collapsed?: boolean;
  readonly className?: string;
  isReversed: boolean;
  setReversed: (reversed: boolean) => void;
}

const _SwapInfoHeader: FC<SwapInfoHeaderProps> = ({
  value,
  collapsed,
  className,
  isReversed,
  setReversed,
}) => (
  <Flex justify="space-between" align="center" className={className}>
    <RatioView
      value={value}
      isReversed={isReversed}
      setReversed={setReversed}
    />
    <Flex align="center">
      {!collapsed && (
        <Flex.Item marginRight={4}>
          <SlippageTag />
        </Flex.Item>
      )}
      <Typography.Body>
        {collapsed ? <UpOutlined /> : <DownOutlined />}
      </Typography.Body>
    </Flex>
  </Flex>
);

export const SwapInfoHeader = styled(_SwapInfoHeader)`
  width: 100%;
`;
