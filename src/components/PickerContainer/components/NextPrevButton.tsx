import React, {FC} from 'react';
import LeftArrow from '../icons/LeftArrow';
import RightArrow from '../icons/RightArrow';

interface INextPrevButtonProps {
  direction: 'prev' | 'next';
  handleClick: () => void;
}
const NextPrevButton: FC<INextPrevButtonProps> = ({direction, handleClick}) => {
  return (
    <div className="next-prev-button-wrapper">
      <div className="next-prev-button" onClick={handleClick}>
        {direction === 'prev' ? <LeftArrow /> : <RightArrow />}
      </div>
    </div>
  );
};

export default NextPrevButton;
