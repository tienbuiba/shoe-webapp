import { Checkbox } from "@mui/material";
import React from 'react';

export class CheckboxField extends React.PureComponent {

  handleCheck = (event, isInputChecked) => {
    this.props.onChange(event, isInputChecked, this.props.category);
  };

  render() {
    return (
          <Checkbox
            label={this.props.category}
            iconStyle={{fill: '#000'}}
            value={this.props.category}
            onCheck={this.handleCheck}
          />
    )}
}