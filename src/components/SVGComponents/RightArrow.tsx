import * as React from 'react';

const RightArrow = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    viewBox="0 0 32 32"
    style={{
      enableBackground: 'new 0 0 512 512',
      marginLeft: 2
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M8.94 27.06a1.5 1.5 0 0 1 0-2.12L17.878 16l-8.94-8.94a1.5 1.5 0 0 1 2.122-2.12l10 10a1.5 1.5 0 0 1 0 2.12l-10 10a1.5 1.5 0 0 1-2.122 0z"
      fill="#22ccce"
      fillRule="evenodd"
      data-original="#000000"
    />
  </svg>
);

export default RightArrow;
