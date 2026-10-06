import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    card: {
      marginBottom: '24px',
    },
    result: {
      maxWidth: '560px',
      margin: '0 auto',
      padding: '24px 0 8px',
    },
    layout: {
      display: 'flex',
      alignItems: 'stretch',
      width: '100%',
    },
    rail: {
      flex: '0 0 220px',
      width: '220px',
      paddingRight: '24px',
      borderRight: `1px solid ${token.colorBorderSecondary}`,
    },
    railInner: {
      position: 'sticky',
      top: '24px',
    },
    panel: {
      flex: '1 1 auto',
      minWidth: 0,
      paddingLeft: '40px',
    },
    panelHeader: {
      marginBottom: '24px',
      paddingBottom: '16px',
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
    },
    stepCount: {
      marginBottom: '4px',
      fontSize: token.fontSizeSM,
      color: token.colorTextSecondary,
      fontVariantNumeric: 'tabular-nums',
    },
    stepHeading: {
      margin: 0,
      fontSize: token.fontSizeHeading4,
      fontWeight: 600,
      lineHeight: 1.4,
      color: token.colorText,
    },
    panelBody: {
      maxWidth: '560px',
    },
    faq: {
      maxWidth: '480px',
      marginBottom: '24px',
    },
    faqList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    faqHeading: {
      margin: '0 0 4px',
      fontSize: '13px',
      fontWeight: 600,
      color: token.colorText,
    },
    faqText: {
      margin: 0,
      fontSize: '13px',
      lineHeight: 1.6,
      color: token.colorTextSecondary,
    },
  };
});
export default useStyles;
