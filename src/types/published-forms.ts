import IFormBuilderField from "./form-builder";

interface PublishedFormInterface {
  name: string;
  isLabel: boolean;
  isOutLine: boolean;
  description: string;
  fields: IFormBuilderField[];
}

export default PublishedFormInterface;
