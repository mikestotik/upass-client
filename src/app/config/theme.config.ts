import { Slider } from 'antd';
import { theme, ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {},
  components: {
    Badge: {
      textFontSize: 14,
    },
    Button: {
      fontSize: 14,
      fontSizeSM: 13,
      fontSizeLG: 14,
      fontSizeXL: 16,
      colorLink: '#3d87ef',
      colorLinkHover: '#64a1fa',
      colorLinkActive: '#3d87ef',
      colorBgContainer: '#212125',
    },
    Form: {
      itemMarginBottom: 16,
      verticalLabelPadding: '0 0 4px 0',
    },
    Input: {
      colorBgContainer: '#1e1e1e',
    },
    Slider: {
      controlHeight: 16
    },
    Switch: {
      handleSize: 16,
      trackHeight: 16,
      trackPadding: 0,
      trackMinWidth: 24
    },
    Message: {
      contentBg: '#282828',
      colorText: '#ffffff',
      fontSize: 44,
    }
  },
};
