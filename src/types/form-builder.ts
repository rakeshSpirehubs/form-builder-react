interface styles {
  backgroundColor?: string;
  color?: string;
  border?: string;
  borderColor?: string;
  borderStyle?: string;
}

interface labelStyles {
  backgroundColor?: string;
  color?: string;
  border?: string;
  borderColor?: string;
  borderStyle?: string;
}

export default interface FormBuilderInterface {
  id: number;
  type: string;
  label: string;
  placeholder?: string;
  icon: any;
  serialNumber?: string;
  styles?: styles;
  isRequired?: boolean;
  labelStyles?: labelStyles;
  selectOptions?: string[];
  radioOptions?: string[];
  checkboxGroupOption?: { label: string }[];
}
