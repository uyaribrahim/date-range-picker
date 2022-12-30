import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import {DateRangePicker} from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/DateRangePicker',
  component: DateRangePicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'}
  }
} as ComponentMeta<typeof DateRangePicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DateRangePicker> = args => {
  const [range, setRange] = useState({
    startDate: new Date(2022, 11, 12),
    endDate: new Date()
  });

  const handleChangeDateRange = (range: any) => {
    setRange(range);
    console.log(range);
    //  range: {
    //     startDate: Date,
    //     endDate: Date,
    //   }
  };

  return (
    <DateRangePicker range={range} onChangeDateRange={handleChangeDateRange} />
  );
};
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: 'Button'
// };
