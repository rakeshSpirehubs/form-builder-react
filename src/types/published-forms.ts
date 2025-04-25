import FormBuilderInterface from "./form-builder";

interface PublishedFormInterface {
  name: string;
  isLabel: Boolean;
  isOutLine: Boolean;
  description: string;
  fields: FormBuilderInterface[];
}

export default PublishedFormInterface;
