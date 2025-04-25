import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Card } from "./ui/card";
import { FieldPalette } from "./field-palette";
import { FormCanvas } from "./form-canvas";
import UpdateSettings from "./update-fields-setting";
import FieldType from "@/types/form-builder";
import { Button } from "./ui/button";
import FieldTypeInterface from "@/types/form-builder";
import { FormFieldItem } from "./form-field-item";
import { useDispatch } from "react-redux";
import { publishNewForm } from "@/redux/slices/published-forms";
import PublishedFormInterface from "@/types/published-forms";
import { useNavigate } from "react-router-dom";

const BuilderCard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formName, setFormName] = useState<string>("New Form");
  const [formDescription, setFormDescription] =
    useState<string>("Creating new form");
  const [globalSettings, setGlobalSettings] = useState({
    isLabel: true,
    isOutLine: true,
  });
  const [selectedFormFields, setSelectedFormFields] = useState<FieldType[]>([]);
  const [selectedFieldForUpdate, setSelectedFieldForUpdate] = useState<
    FieldType | undefined
  >(undefined);
  const [isOpenUpdateSettingDialog, setIsOpenUpdateSettingDialog] =
    useState<boolean>(false);

  const [isOpenFormNameDialog, setIsOpenFormNameDialog] =
    useState<boolean>(false);

  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);

  const handleCloseFormNameDialog = () => {
    setIsOpenFormNameDialog(false);
  };
  const handleOpenFormNameDialog = () => {
    setIsOpenFormNameDialog(true);
  };

  // HANDLE UPDATE FORM NAME
  const handleUpdateFormName = (name: string, description: string) => {
    setFormName(name);
    setFormDescription(description);
    handleCloseFormNameDialog();
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Check if we're dropping over the dropzone
    if (!over || over.id !== "dropzone") {
      return; // Not dropping on the target zone, do nothing
    }

    const item = active?.data?.current as FieldType | undefined;
    if (!item) return;

    const generateRandomNumber = Math.floor(
      Math.random() * (999 - 100 + 1) + 100
    );
    const newItem = {
      ...item,
      serialNumber: `${item.type}${generateRandomNumber}`,
    };

    // Add default options for specific field types
    if (item.type === "select") {
      newItem.selectOptions = ["Option 1", "Option 2"];
    } else if (item.type === "checkboxgroup") {
      newItem.checkboxGroupOption = [
        { label: "Option 1" },
        { label: "Option 2" },
      ];
    } else if (item.type === "radio") {
      newItem.radioOptions = ["Option 1", "Option 2"];
    }

    setSelectedFormFields((prev) => [...prev, newItem]);
  };

  const handleDeleteFields = (index: number) => {
    const filterArr = selectedFormFields.filter((_, id) => index !== id);
    setSelectedFormFields(filterArr);
  };

  const handleSetting = (field: FieldType) => {
    setSelectedFieldForUpdate(field);
    setIsOpenUpdateSettingDialog(true);
  };

  const closeUpdateDialog = () => {
    setIsOpenUpdateSettingDialog(false);
    setSelectedFieldForUpdate(undefined);
  };

  const handleSaveNewForm = () => {
    if (selectedFormFields.length <= 0) {
      window.alert("Please select at least one input field");
      return;
    }
    const obj: PublishedFormInterface = {
      name: formName,
      isLabel: globalSettings.isLabel,
      isOutLine: globalSettings.isOutLine,
      description: formDescription,
      fields: selectedFormFields,
    };

    dispatch(publishNewForm(obj));
    setSelectedFormFields([]);
    setFormName("New Form");
    setFormDescription("Creating new form");
    navigate("/");
  };

  return (
    <>
      {!isShowPreview ? (
        <DndContext onDragEnd={handleDragEnd}>
          <Card className="px-4 py-5 h-full w-full shadow-none">
            <div className="flex justify-between items-center gap-2">
              <h1 className="text-2xl font-semibold">Create Form</h1>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsShowPreview(true);
                  }}
                >
                  Preview
                </Button>
                <Button onClick={handleSaveNewForm} className="cursor-pointer">
                  Save
                </Button>
              </div>
            </div>
            <div className="flex gap-7 w-full">
              <FieldPalette />
              <FormCanvas
                formName={formName}
                formDescription={formDescription}
                selectedFormFields={selectedFormFields}
                setSelectedFormFields={setSelectedFormFields}
                isOpenFormNameDialog={isOpenFormNameDialog}
                handleCloseFormNameDialog={handleCloseFormNameDialog}
                handleOpenFormNameDialog={handleOpenFormNameDialog}
                handleUpdateFormName={handleUpdateFormName}
                handleSetting={handleSetting}
                handleDeleteFields={handleDeleteFields}
                globalSettings={globalSettings}
                setGlobalSettings={setGlobalSettings}
              />
            </div>
          </Card>
        </DndContext>
      ) : (
        <Card className="px-4 py-5 h-full w-full shadow-none">
          <div className="flex justify-between items-center gap-2">
            <h1 className="text-2xl font-semibold">Form Preview</h1>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setIsShowPreview(false);
                }}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  handleSaveNewForm();
                }}
              >
                Save
              </Button>
            </div>
          </div>
          <form>
            <Card className="mx-auto w-full max-w-[500px] max-h-[550px] p-5 flex flex-col gap-5 overflow-y-auto">
              <div>
                <p className="text-lg font-semibold">{formName}</p>
                <p className="text-muted-foreground text-sm">
                  {formDescription}
                </p>
              </div>

              {selectedFormFields.map(
                (field: FieldTypeInterface, index: number) => (
                  <FormFieldItem
                    key={field.serialNumber || index}
                    field={field}
                    isLabel={globalSettings.isLabel}
                    isOutLine={globalSettings.isOutLine}
                  />
                )
              )}
            </Card>
          </form>
        </Card>
      )}

      {isOpenUpdateSettingDialog && (
        <UpdateSettings
          isOpen={isOpenUpdateSettingDialog}
          selectedField={selectedFieldForUpdate}
          closeUpdateDialog={closeUpdateDialog}
          allSelectedFormFields={selectedFormFields}
          setSelectedFormFields={setSelectedFormFields}
        />
      )}
    </>
  );
};

export default BuilderCard;
