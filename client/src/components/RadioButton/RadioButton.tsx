import React, { memo } from 'react';
import { useDispatch } from 'react-redux';

import { Radio } from '@mui/material';

import filterPosts from '../../redux/actions/search';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface IRadioProps {
  value: string
}

const RadioButton = (props: IRadioProps): JSX.Element => {
  const dispatch = useDispatch();

  const { searchValue, category } = useTypedSelector((state) => state.search);

  const { value } = props;

  const changeCategoryValue = () => {
    dispatch(filterPosts({ searchValue, category: value }));
  };

  return (
    <>
      <Radio
        color="warning"
        checked={category === value}
        onChange={changeCategoryValue}
        value={value}
        name="radio-buttons"
        inputProps={{ 'aria-label': value }}
      />
      {value[0].toUpperCase() + value.substring(1)}
    </>
  );
};

export default memo(RadioButton);
