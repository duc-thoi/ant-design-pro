import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    card: {
      marginBottom: '24px',
    },
    descriptions: {
      overflow: 'hidden',
      background: token.colorBgContainer,
      borderRadius: token.borderRadiusLG,
    },
    descriptionsLabel: {
      width: 112,
      color: token.colorTextSecondary,
      whiteSpace: 'nowrap',
    },
    descriptionsContent: {
      color: token.colorText,
      fontWeight: 500,
      wordBreak: 'break-all',
    },
    amount: {
      '&&': {
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
        color: token.colorPrimary,
        fontSize: token.fontSizeHeading3,
        fontWeight: 600,
        lineHeight: 1.2,
        fontVariantNumeric: 'tabular-nums',
      },
    },
    amountAffix: {
      color: token.colorTextSecondary,
      fontSize: token.fontSize,
      fontWeight: 400,
    },
    result: {
      maxWidth: '560px',
      margin: '0 auto',
      padding: '24px 0 8px',
    },
  };
});
export default useStyles;
