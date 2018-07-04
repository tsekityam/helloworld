import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorldWebPartStrings';
import HelloWorld from './components/HelloWorld';
import { IHelloWorldProps } from './components/IHelloWorldProps';
import { PropertyFieldDateTimePicker, DateConvention, TimeConvention, IDateTimeFieldValue } from '@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker';

export interface IHelloWorldWebPartProps {
  origin: string;
  destination: string;
  departing: IDateTimeFieldValue;
  returning: IDateTimeFieldValue;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHelloWorldProps > = React.createElement(
      HelloWorld,
      {
        origin: this.properties.origin,
        destination: this.properties.destination,
        departing: this.properties.departing ? this.properties.departing.value : new Date(),
        returning: this.properties.returning ? this.properties.returning.value : new Date(),
        onSubmitPackage: this.submitPackage,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Travel Planner Package Form is used to collect the basic info of a trip'
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('origin', {
                  label: 'Origin'
                }),
                PropertyPaneTextField('destination', {
                  label: 'Destination'
                }),
                PropertyFieldDateTimePicker('departing', {
                  label: 'Departing',
                  initialDate: this.properties.departing,
                  dateConvention: DateConvention.DateTime,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'departing'
                }),
                PropertyFieldDateTimePicker('returning', {
                  label: 'Returning',
                  initialDate: this.properties.returning,
                  dateConvention: DateConvention.Date,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'returning'
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private submitPackage(origin: string, destination: string, departing: Date, returning: Date): void {
    console.log([origin, destination, departing, returning]);
  }
}
