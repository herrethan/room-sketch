import { Global } from '@emotion/react';

// use as a component to inject custom fonts
function Typography() {
  return (
    <Global
      styles={`
        @font-face {
          font-family: 'Circular';
          src: url('/fonts/CircularStd-Black.woff') format('woff');
          font-weight: 800;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Circular';
          src: url('/fonts/CircularStd-Bold.woff') format('woff');
          font-weight: 600;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Circular';
          src: url('/fonts/CircularStd-Medium.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Circular';
          src: url('/fonts/CircularStd-Book.woff') format('woff');
          font-weight: 200;
          font-style: normal;
          font-display: swap;
        }
      `}
    />
  );
}

export default Typography;
