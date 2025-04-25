import { Settings, Trash2, GripVertical } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Switch } from "./ui/switch";
import FieldTypeInterface from "@/types/form-builder";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

interface FieldRendererProps {
  field: FieldTypeInterface;
  index: number;
  handleSetting: (field: FieldTypeInterface) => void;
  handleDeleteFields: (index: number) => void;
  dragHandleProps?: {
    attributes: any;
    listeners: any;
  };
  isLabel: Boolean;
  isOutLine: Boolean;
}

export const FieldRenderer = ({
  field,
  index,
  handleSetting,
  handleDeleteFields,
  dragHandleProps,
  isLabel,
  isOutLine,
}: FieldRendererProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="w-full flex justify-between gap-2 items-center py-2 px-3 group rounded-sm duration-300 border border-dashed border-gray-300">
        {/* Heading Field */}
        {field.type === "heading" && (
          <h2 className="text font-semibold" style={field.styles}>
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
              className={cn(!isOutLine && "bg-gray-200")}
            />
          </div>
        )}

        {/* Textarea Field */}
        {field.type === "textarea" && (
          <div className="flex flex-col gap-2 w-full">
            {isLabel && <Label style={field.labelStyles}>{field.label}</Label>}
            <Textarea
              placeholder={field.placeholder}
              style={field.styles}
              required={field.isRequired}
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
              className={cn(!isOutLine && "bg-gray-200")}
            />
          </div>
        )}

        {/* Checkbox Field */}
        {field.type === "checkbox" && (
          <div className="flex flex-col gap-2 w-full">
            <Label style={field.labelStyles}>{field.label}</Label>
            <Checkbox style={field.styles} required={field.isRequired} />
          </div>
        )}

        {/* Checkbox Group Field */}
        {field.type === "checkboxgroup" && (
          <div className="flex flex-col gap-3 w-full">
            <Label style={field.labelStyles}>{field.label}</Label>
            <div className="flex flex-col gap-2">
              {field.checkboxGroupOption &&
                field.checkboxGroupOption?.length > 0 &&
                field.checkboxGroupOption?.map((checkbox, idx) => (
                  <div className="flex items-center gap-2" key={idx}>
                    <Checkbox name={checkbox.label} />
                    <Label className="text-xs">{checkbox?.label}</Label>
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
              defaultValue="male"
              style={field.styles}
              required={field.isRequired}
            >
              {field.radioOptions &&
                field.radioOptions?.map((radio) => (
                  <div className="flex items-center space-x-2" key={radio}>
                    <RadioGroupItem value={radio} id={radio} />
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
              required={field.isRequired}
              className={cn(
                "border py-1 px-2 rounded-md",
                !isOutLine && "bg-gray-200"
              )}
            />
          </div>
        )}

        {/* Toggle Field */}
        {field.type === "toggle" && (
          <div className="flex flex-col gap-2 w-full">
            <Label style={field.labelStyles}>{field.label}</Label>
            <Switch style={field.styles} required={field.isRequired} />
          </div>
        )}
        <div className="flex-col items-center gap-2 flex z-10">
          <div>
            <Settings
              size={16}
              className="cursor-pointer"
              onClick={() => {
                handleSetting(field);
              }}
            />
          </div>
          <div>
            <Trash2
              onClick={() => handleDeleteFields(index)}
              className="text-red-600 cursor-pointer"
              size={16}
            />
          </div>
          <div
            className="cursor-move"
            {...(dragHandleProps?.attributes || {})}
            {...(dragHandleProps?.listeners || {})}
          >
            <GripVertical size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
