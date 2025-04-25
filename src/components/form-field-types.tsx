import IFormBuilderField from "@/types/form-builder";
import {
  Calendar1,
  Check,
  CheckCheck,
  CircleDot,
  CloudUpload,
  Heading,
  MessageSquareText,
  Phone,
  SquareChevronDown,
  ToggleRight,
  Type,
} from "lucide-react";

export const formFieldTypes: IFormBuilderField[] = [
  {
    id: 1,
    type: "heading",
    label: "Heading",
    icon: <Heading size={18} strokeWidth={3} />,
  },
  {
    id: 2,
    type: "input",
    label: "Text field",
    placeholder: "Text field",
    icon: <Type size={18} strokeWidth={3} />,
  },
  {
    id: 3,
    type: "number",
    label: "Number",
    placeholder: "1234567890",
    icon: <Phone size={18} strokeWidth={3} />,
  },
  {
    id: 4,
    type: "select",
    label: "Select",
    placeholder: "Select",
    icon: <SquareChevronDown size={18} strokeWidth={3} />,
  },
  {
    id: 5,
    type: "textarea",
    label: "Textarea",
    placeholder: "Textarea",
    icon: <MessageSquareText size={18} strokeWidth={3} />,
  },
  {
    id: 6,
    type: "date",
    label: "Date",
    placeholder: "",
    icon: <Calendar1 size={18} strokeWidth={3} />,
  },
  {
    id: 7,
    type: "checkbox",
    label: "Checkbox",
    icon: <Check size={18} strokeWidth={3} />,
  },
  {
    id: 8,
    type: "checkboxgroup",
    label: "Checkbox Group",
    icon: <CheckCheck size={18} strokeWidth={3} />,
  },
  {
    id: 9,
    type: "radio",
    label: "Radio",
    icon: <CircleDot size={18} strokeWidth={3} />,
  },
  {
    id: 10,
    type: "toggle",
    label: "Toggle",
    icon: <ToggleRight size={18} strokeWidth={3} />,
  },
  {
    id: 11,
    type: "file",
    label: "File Upload",
    icon: <CloudUpload size={18} strokeWidth={3} />,
  },
];
