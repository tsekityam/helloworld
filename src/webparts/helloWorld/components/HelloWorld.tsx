import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { IHelloWorldStates } from './IHelloWorldStates';
import { ComboBox, IComboBoxOption, VirtualizedComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/utilities/selectableOption/SelectableOption.types';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

const INITIAL_OPTIONS = [
  { key: 'Header', text: 'Theme Fonts', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Arial Black', fontFamily: '"Arial Black", "Arial Black_MSFontService", sans-serif' },
  { key: 'B', text: 'Time New Roman', fontFamily: '"Times New Roman", "Times New Roman_MSFontService", serif' },
  { key: 'C', text: 'Comic Sans MS', fontFamily: '"Comic Sans MS", "Comic Sans MS_MSFontService", fantasy' },
  { key: 'C1', text: 'Calibri', fontFamily: 'Calibri, Calibri_MSFontService, sans-serif' },
  { key: 'divider_2', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header1', text: 'Other Options', itemType: SelectableOptionMenuItemType.Header },
  { key: 'D', text: 'Option d' },
  { key: 'E', text: 'Option e' },
  { key: 'F', text: 'Option f' },
  { key: 'G', text: 'Option g' },
  { key: 'H', text: 'Option h' },
  { key: 'I', text: 'Option i' },
  { key: 'J', text: 'Option j' }
];

const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',

  isRequiredErrorMessage: 'Field is required.',

  invalidInputErrorMessage: 'Invalid date format.'
};

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldStates> {
  private locations = [
    { key: 'SITES', text: 'Sites', itemType: SelectableOptionMenuItemType.Header },
    { key: 'EEL', text: 'EEL' },
    { key: 'GET', text: 'GET' },
    { key: 'GLE', text: 'GLE' },
    { key: 'DIVIDER', text: '-', itemType: SelectableOptionMenuItemType.Divider },
    { key: 'CITIES', text: 'Cities', itemType: SelectableOptionMenuItemType.Header },
    { key: 'Hong Kong', text: 'Hong Kong' },
    { key: 'Guangzhou', text: 'Guangzhou' },
    { key: 'Beijing', text: 'Beijing' },
  ];

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { origin: '', destination: '', departing: new Date(), returning: new Date() };
  }

  public componentDidMount() {
    this.setState({
      origin: this.props.origin,
      destination: this.props.destination,
      departing: this.props.departing,
      returning: this.props.returning
    });
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div className="ms-Grid">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
            <ComboBox
              label="Origin"
              allowFreeform={true}
              autoComplete="on"
              options={this.locations}
              required={true}
              value={this.props.origin}
              onChanged={(option?: IComboBoxOption, index?: number, value?: string) => {
                console.log(option, index, value);
              }}
            />
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
            <ComboBox
              label="Destination"
              allowFreeform={true}
              autoComplete="on"
              options={this.locations}
              required={true}
              value={this.props.destination}
              onChanged={(option?: IComboBoxOption, index?: number, value?: string) => {
                console.log(option, index, value);
              }}
            />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
            <DatePicker
              label="Departing"
              isRequired={true}
              firstDayOfWeek={DayOfWeek.Sunday}
              strings={DayPickerStrings}
              minDate={new Date()}
              value={this.props.departing}
            />
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
            <DatePicker
              label="Returning"
              isRequired={true}
              firstDayOfWeek={DayOfWeek.Sunday}
              strings={DayPickerStrings}
              minDate={this.props.departing}
              value={this.props.returning}
            />
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-textAlignRight">
            <Label></Label>
            <DefaultButton
              primary={true}
              text="Plan my trip"
            />
          </div>
        </div>
      </div>
    );
  }
}
