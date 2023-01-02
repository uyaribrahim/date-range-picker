# date-range-picker

A simple and easy to use date range picker component for React.

## Features

- Provides a user-friendly interface for selecting a range of dates
- Allows users to specify a start and end date
- Can be easily integrated into any React project

<img width="480" alt="react-date-range-picker" src="https://i.hizliresim.com/852xh14.png">

## Installation

To install the Date Range Picker component, run the following command:

```
npm install @uyaribrahim/date-range-picker
```

## Usage

Import the component in your React project and use it like any other component:

```javascript
import DateRangePicker from '@uyaribrahim/date-range-picker';
const App = () => {
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date()
  });
  const handleChangeDateRange = range => {
    setRange(range);
  };
  return (
    <DateRangePicker range={range} onChangeDateRange={handleChangeDateRange} />
  );
};
```

## Props

The Date Range Picker component accepts the following props:

|       Prop        |    Type    | Required |                                                                                   Description                                                                                    |
| :---------------: | :--------: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|       range       |  `Object`  |   Yes    |                                                     An object with a `startDate` and `endDate` property, both of type `Date`                                                     |
| onChangeDateRange | `Function` |   Yes    | A callback function that is called when the selected date range changes. The callback function receives an object with a `startDate` and `endDate` property, both of type `Date` |

## Development

To develop the Date Range Picker component locally, follow these steps:

### 1. Clone the repository:

```
git clone https://github.com/uyaribrahim/date-range-picker.git
```

### 2. Install the dependencies:

```
npm install
```

### 3. Start the development server:

```
npm run watch
```

This will start the Parcel development server, which will automatically rebuild the component when changes are made.

You can also start the Storybook development server by running the following command:

```
npm run storybook
```

This will start a local server at http://localhost:6006 where you can view and interact with the component.

To build the component and generate the production files, run the following command:

```
npm run build
```

To build the Storybook documentation, run the following command:

```
npm run build-storybook
```

## License

The Date Range Picker component is licensed under the MIT License.
