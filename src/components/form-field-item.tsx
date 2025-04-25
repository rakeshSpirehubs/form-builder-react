import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Switch } from "./ui/switch";
import FieldTypeInterface from "@/types/form-builder";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FormFieldItemProps {
  field: FieldTypeInterface;
  isLabel: Boolean;
  isOutLine: Boolean;
}

export const FormFieldItem = ({
  field,
  isLabel,
  isOutLine,
}: FormFieldItemProps) => {
  return (
    <>
      {/* Heading Field */}
      {field.type === "heading" && (
        <h2 className="text font-semibold col-span-full" style={field.styles}>
          {field.label}
        </h2>
      )}

      {/* Text Field */}
      {field.type === "input" && (
        <div className="flex flex-col gap-2 w-full">
          {isLabel && <Label style={field.labelStyles}>{field.label}</Label>}
          <Input
            placeholder={field.placeholder}
            style={field.styles}
            required={field.isRequired}
            id={field.serialNumber}
            name={field.serialNumber}
            className={cn(!isOutLine && "bg-gray-200")}
          />
        </div>
      )}

      {/* Text Field Type Number */}
      {field.type === "number" && (
        <div className="flex flex-col gap-2 w-full">
          {isLabel && <Label style={field.labelStyles}>{field.label}</Label>}
          <Input
            placeholder={field.placeholder}
            style={field.styles}
            required={field.isRequired}
            type="number"
            id={field.serialNumber}
            name={field.serialNumber}
            className={cn(!isOutLine && "bg-gray-200")}
          />
        </div>
      )}

      {/* Textarea Field */}
      {field.type === "textarea" && (
        <div className="col-span-full flex flex-col gap-2 w-full">
          {isLabel && <Label style={field.labelStyles}>{field.label}</Label>}
          <Textarea
            placeholder={field.placeholder}
            style={field.styles}
            required={field.isRequired}
            id={field.serialNumber}
            name={field.serialNumber}
            className={cn("bg-transparent", !isOutLine && "bg-gray-200")}
          />
        </div>
      )}

      {/* Select Field */}
      {field.type === "select" && (
        <div className="flex flex-col gap-2 w-full">
          <Label style={field.labelStyles}>{field.label}</Label>
          <Select required={field.isRequired} name={field.serialNumber}>
            <SelectTrigger
              style={field.styles}
              id={field.serialNumber}
              className={cn("w-full", !isOutLine && "bg-gray-200")}
            >
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup
                className={cn("w-full", !isOutLine && "bg-gray-200")}
              >
                {field?.selectOptions?.map((item) => (
                  <SelectItem value={item} key={item}>
                    {" "}
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Date Field */}
      {field.type === "date" && (
        <div className="flex flex-col gap-2 w-full">
          <Label style={field.labelStyles}>{field.label}</Label>
          <Input
            placeholder={field.placeholder}
            type="date"
            style={field.styles}
            required={field.isRequired}
            id={field.serialNumber}
            name={field.serialNumber}
            className={cn(!isOutLine && "bg-gray-200")}
          />
        </div>
      )}

      {/* Checkbox Field */}
      {field.type === "checkbox" && (
        <div className="flex gap-2 items-center w-full">
          <Checkbox
            style={field.styles}
            required={field.isRequired}
            id={field.serialNumber}
            name={field.serialNumber}
          />
          <Label style={field.labelStyles}>{field.label}</Label>
        </div>
      )}

      {/* Checkbox Group Field */}
      {field.type === "checkboxgroup" && (
        <div className="flex flex-col gap-3 w-full">
          <Label style={field.labelStyles}>{field.label}</Label>
          <div className="flex gap-4">
            {field.checkboxGroupOption &&
              field.checkboxGroupOption?.length > 0 &&
              field.checkboxGroupOption?.map((checkbox, idx) => (
                <div className="flex items-center gap-1" key={idx}>
                  <Checkbox
                    name={field.serialNumber}
                    id={checkbox?.label}
                    value={checkbox?.label}
                  />
                  <Label className="text-xs" htmlFor={checkbox?.label}>
                    {checkbox?.label}
                  </Label>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Radio Field */}
      {field.type === "radio" && (
        <div className="flex flex-col gap-2 w-full">
          <Label style={field.labelStyles}>{field.label}</Label>
          <RadioGroup
            style={field.styles}
            required={field.isRequired}
            id={field.serialNumber}
            name={field.serialNumber}
            orientation="horizontal"
          >
            {field.radioOptions &&
              field.radioOptions?.map((radio) => (
                <div className="flex items-center space-x-2" key={radio}>
                  <RadioGroupItem value={radio} id={field.serialNumber} />
                  <Label htmlFor={radio}>{radio}</Label>
                </div>
              ))}
          </RadioGroup>
        </div>
      )}

      {/* File Upload Field */}

      {field.type === "file" && (
        <div className="flex flex-col gap-2 w-full">
          <Label style={field.labelStyles}>{field.label}</Label>
          <Input
            type="file"
            id={field.serialNumber}
            name={field.serialNumber}
            className={cn(!isOutLine && "bg-gray-200")}
          />
        </div>
      )}

      {/* Toggle Field */}
      {field.type === "toggle" && (
        <div className="flex  gap-2 w-full">
          <Label style={field.labelStyles}>{field.label}</Label>
          <Switch
            style={field.styles}
            required={field.isRequired}
            id={field.serialNumber}
            name={field.serialNumber}
          />
        </div>
      )}
    </>
  );
};
