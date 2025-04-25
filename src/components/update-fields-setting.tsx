import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FieldTypeInterface from "@/types/form-builder";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { CirclePlus, X } from "lucide-react";

interface UpdateSettingProps {
  isOpen: boolean;
  selectedField: FieldTypeInterface | undefined;
  closeUpdateDialog: () => void;
  allSelectedFormFields: FieldTypeInterface[];
  setSelectedFormFields: any;
}

const requiredElements = [
  "input",
  "number",
  "select",
  "textarea",
  "date",
  "radio",
];

const UpdateSettings: React.FC<UpdateSettingProps> = ({
  isOpen,
  selectedField,
  closeUpdateDialog,
  allSelectedFormFields,
  setSelectedFormFields,
}) => {
  const [selectedFieldData, setSelectedFieldData] = useState(selectedField);

  const handleUpdateValues = (value: string | boolean, key: string) => {
    setSelectedFieldData((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleApplySetting = () => {
    const index = allSelectedFormFields?.findIndex(
      (item) => item.serialNumber === selectedField?.serialNumber
    );
    allSelectedFormFields[index] = selectedFieldData as FieldTypeInterface;
    setSelectedFormFields([...allSelectedFormFields]);
    closeUpdateDialog();
  };

  const handleUpdateStyles = (value: string | Number, key: string) => {
    setSelectedFieldData((prev) =>
      prev ? { ...prev, styles: { ...prev.styles, [key]: value } } : prev
    );
  };

  // SELECT TYPE OPERATIONS START

  const handleUpdateSelectOptionsValue = (index: number, value: string) => {
    const arr = selectedFieldData?.selectOptions;
    if (arr && arr?.length > 0) {
      arr[index] = value;
      setSelectedFieldData({ ...selectedFieldData });
    }
  };

  const handleDeleteSelectOption = (index: number) => {
    const filterArr = selectedFieldData?.selectOptions?.filter(
      (_, id) => index !== id
    );
    if (selectedFieldData) {
      setSelectedFieldData({
        ...selectedFieldData,
        selectOptions: filterArr,
      });
    }
  };

  const handleAddMoreSelectOption = () => {
    if (selectedFieldData && selectedFieldData?.selectOptions) {
      selectedFieldData.selectOptions = [
        ...selectedFieldData.selectOptions,
        "option",
      ];
      setSelectedFieldData({
        ...selectedFieldData,
      });
    }
  };

  // SELECT TYPE OPERATIONS ENDS

  // GROUP CHECKBOX OPERATIONS START
  const handleAddMoreCheckbox = () => {
    if (selectedFieldData && selectedFieldData?.checkboxGroupOption) {
      selectedFieldData.checkboxGroupOption = [
        ...selectedFieldData.checkboxGroupOption,
        { label: "new checkbox" },
      ];
      setSelectedFieldData({
        ...selectedFieldData,
      });
    }
  };

  const handleDeleteCheckbox = (index: number) => {
    const filterArr = selectedFieldData?.checkboxGroupOption?.filter(
      (_, id) => index !== id
    );
    if (selectedFieldData) {
      setSelectedFieldData({
        ...selectedFieldData,
        checkboxGroupOption: filterArr,
      });
    }
  };

  // GROUP CHECKBOX OPERATIONS ENDS

  const handleUpdateCheckboxLabel = (index: number, value: string) => {
    const arr = selectedFieldData?.checkboxGroupOption;
    if (arr && arr?.length > 0) {
      arr[index].label = value;
      setSelectedFieldData({ ...selectedFieldData });
    }
  };

  // RADIO OPERATION STARTS
  const handleUpdateRadioLabel = (index: number, value: string) => {
    const arr = selectedFieldData?.radioOptions;
    if (arr && arr?.length > 0) {
      arr[index] = value;
      setSelectedFieldData({ ...selectedFieldData });
    }
  };

  const handleDeleteRadioOpt = (index: number) => {
    const filterArr = selectedFieldData?.radioOptions?.filter(
      (_, id) => index !== id
    );
    if (selectedFieldData) {
      setSelectedFieldData({
        ...selectedFieldData,
        radioOptions: filterArr,
      });
    }
  };

  const handleAddMoreRadioOpt = () => {
    if (selectedFieldData && selectedFieldData?.radioOptions) {
      selectedFieldData.radioOptions = [
        ...selectedFieldData.radioOptions,
        "option",
      ];
      setSelectedFieldData({
        ...selectedFieldData,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeUpdateDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogHeader>
            <DialogTitle>
              Customise{" "}
              <span className="capitalize">{selectedFieldData?.type}</span>
            </DialogTitle>
          </DialogHeader>
        </DialogHeader>
        {/* SETTING  */}
        <div className="w-full grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label id="label">Label</Label>
            <Input
              value={selectedFieldData?.label}
              id="label"
              name="label"
              onChange={(e) => handleUpdateValues(e.target.value, "label")}
            />
          </div>
          {selectedFieldData?.type === "heading" && (
            <div className="flex flex-col gap-1">
              <Label>Label Color</Label>
              <Input
                type="color"
                value={selectedFieldData?.labelStyles?.color}
                onChange={(e) => handleUpdateStyles(e.target.value, "color")}
              />
            </div>
          )}
          {selectedFieldData?.placeholder && (
            <div className="flex flex-col gap-2">
              <Label id="label">Placeholder</Label>
              <Input
                value={selectedFieldData?.placeholder}
                id="label"
                name="label"
                onChange={(e) =>
                  handleUpdateValues(e.target.value, "placeholder")
                }
              />
            </div>
          )}
          {selectedFieldData?.type !== "heading" && (
            <div className="flex flex-col gap-2">
              <Label id="label">Name Attribute</Label>
              <Input
                value={selectedFieldData?.serialNumber}
                id="label"
                name="label"
                onChange={(e) =>
                  handleUpdateValues(e.target.value, "serialNumber")
                }
              />
            </div>
          )}

          {requiredElements.includes(selectedFieldData?.type as string) && (
            <div className="flex gap-2 col-span-full">
              <Checkbox
                checked={selectedFieldData?.isRequired as boolean}
                onCheckedChange={(e) => handleUpdateValues(e, "isRequired")}
              />
              <Label id="label">Is Required ?</Label>
            </div>
          )}

          {selectedFieldData?.type === "select" && (
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2">
                <Label id="label">Options</Label>
                <CirclePlus
                  size={14}
                  onClick={handleAddMoreSelectOption}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                {selectedFieldData?.selectOptions?.map((item, index) => (
                  <div className="flex items-center gap-2 w-full" key={index}>
                    <Input
                      value={item}
                      id="label"
                      name="label"
                      onChange={(e) =>
                        handleUpdateSelectOptionsValue(index, e.target.value)
                      }
                      className="w-full"
                    />{" "}
                    <X
                      size={14}
                      onClick={() => handleDeleteSelectOption(index)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedFieldData?.type === "checkboxgroup" && (
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2">
                <Label id="label">Checkbox Labels</Label>
                <CirclePlus
                  size={14}
                  onClick={handleAddMoreCheckbox}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                {selectedFieldData?.checkboxGroupOption?.map((item, index) => (
                  <div className="flex items-center gap-2 w-full" key={index}>
                    <Input
                      value={item.label}
                      id="label"
                      name="label"
                      onChange={(e) =>
                        handleUpdateCheckboxLabel(index, e.target.value)
                      }
                      className="w-full"
                    />{" "}
                    <X
                      size={14}
                      onClick={() => handleDeleteCheckbox(index)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedFieldData?.type === "radio" && (
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2">
                <Label id="label">Radio Options</Label>
                <CirclePlus
                  size={14}
                  onClick={handleAddMoreRadioOpt}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                {selectedFieldData?.radioOptions?.map((item, index) => (
                  <div className="flex items-center gap-2 w-full" key={index}>
                    <Input
                      value={item}
                      id="label"
                      name="label"
                      onChange={(e) =>
                        handleUpdateRadioLabel(index, e.target.value)
                      }
                      className="w-full"
                    />{" "}
                    <X
                      size={14}
                      onClick={() => handleDeleteRadioOpt(index)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleApplySetting}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default UpdateSettings;
