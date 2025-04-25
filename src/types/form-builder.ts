interface IStyles {
  backgroundColor?: string;
  color?: string;
  border?: string;
  borderColor?: string;
  borderStyle?: string;
}

interface ILabelStyles {
  backgroundColor?: string;
  color?: string;
  border?: string;
  borderColor?: string;
  borderStyle?: string;
}

export default interface IFormBuilderField {
  id: number;
  type: string;
  label: string;
  placeholder?: string;
  icon: any;
  serialNumber?: string;
  styles?: IStyles;
  isRequired?: boolean;
  labelStyles?: ILabelStyles;
  selectOptions?: string[];
  radioOptions?: string[];
  checkboxGroupOption?: { label: string }[];
}
