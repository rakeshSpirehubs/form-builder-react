import { Card } from "./ui/card";
import { DroppableZone } from "./droppable-zone";
import { FieldRenderer } from "./field-renderer";
import UpdateFormName from "./update-form-name";
import IFormBuilderField from "@/types/form-builder";
import { Button } from "./ui/button";
import { SquarePen } from "lucide-react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface FormCanvasProps {
  formName: string;
  formDescription: string;
  setSelectedFormFields: (prev: IFormBuilderField[]) => void;
  selectedFormFields: IFormBuilderField[];
  isOpenFormNameDialog: boolean;
  handleCloseFormNameDialog: () => void;
  handleOpenFormNameDialog: () => void;
  handleUpdateFormName: (name: string, description: string) => void;
  handleSetting: (field: IFormBuilderField) => void;
  handleDeleteFields: (index: number) => void;
  globalSettings: {
    isLabel: boolean;
    isOutLine: boolean;
  };
  setGlobalSettings: (settings: {
    isLabel: boolean;
    isOutLine: boolean;
  }) => void;
}

export const FormCanvas = ({
  formName,
  formDescription,
  setSelectedFormFields,
  selectedFormFields,
  isOpenFormNameDialog,
  handleCloseFormNameDialog,
  handleOpenFormNameDialog,
  handleUpdateFormName,
  handleSetting,
  handleDeleteFields,
  globalSettings,
  setGlobalSettings,
}: FormCanvasProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const fieldIds = useMemo(
    () => selectedFormFields.map((f, i) => f.id ?? `field-${i}`),
    [selectedFormFields]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over }: any = event;
    if (!over || active.id === over.id) return;

    const oldIndex = fieldIds.indexOf(active.id);
    const newIndex = fieldIds.indexOf(over.id);

    const reordered = arrayMove(selectedFormFields, oldIndex, newIndex);
    setSelectedFormFields(reordered);
  };

  return (
    <Card className="w-full md:w-[50%] lg:w-[60%] shadow-none p-3 h-full max-h-[70vh] overflow-hidden">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">{formName}</p>
          <p className="text-muted-foreground text-sm">{formDescription}</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleOpenFormNameDialog}
        >
          <SquarePen size={18} />
        </Button>
        {isOpenFormNameDialog && (
          <UpdateFormName
            formName={formName}
            formDescription={formDescription}
            isOpenFormNameDialog={isOpenFormNameDialog}
            handleUpdate={handleUpdateFormName}
            handleCloseFormNameDialog={handleCloseFormNameDialog}
          />
        )}
      </div>
      <div className="flex gap-4 -mt-3">
        <div className="flex gap-2 items-center">
          <Label>Label</Label>
          <Switch
            checked={globalSettings.isLabel}
            onCheckedChange={(e: boolean) =>
              setGlobalSettings({ ...globalSettings, isLabel: e })
            }
          />
        </div>
        <div className="flex gap-2 items-center">
          <Label>Outline</Label>
          <Switch
            checked={globalSettings.isOutLine}
            onCheckedChange={(e: boolean) =>
              setGlobalSettings({ ...globalSettings, isOutLine: e })
            }
          />
        </div>
      </div>

      {/* Dragged Form Field */}
      <DroppableZone>
        {selectedFormFields.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-lg font-semibold">No form field selected</p>
            <p className="text-sm text-muted-foreground">
              Select and drag a field type here to begin building your form
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={fieldIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-4 h-full max-h-[70vh] overflow-y-auto pr-3">
                {selectedFormFields.map(
                  (field: IFormBuilderField, index: number) => (
                    <SortableFieldItem
                      key={field.serialNumber || index}
                      id={field.id ?? `field-${index}`}
                      field={field}
                      index={index}
                      handleSetting={handleSetting}
                      handleDeleteFields={handleDeleteFields}
                      isLabel={globalSettings.isLabel}
                      isOutLine={globalSettings.isOutLine}
                    />
                  )
                )}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </DroppableZone>
    </Card>
  );
};

interface SortableFieldItemProps {
  id: string | number;
  field: IFormBuilderField;
  index: number;
  handleSetting: (field: IFormBuilderField) => void;
  handleDeleteFields: (index: number) => void;
  isLabel: Boolean;
  isOutLine: Boolean;
}

const SortableFieldItem = ({
  id,
  field,
  index,
  handleSetting,
  handleDeleteFields,
  isLabel,
  isOutLine,
}: SortableFieldItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <FieldRenderer
        key={field.serialNumber || index}
        field={field}
        index={index}
        handleSetting={handleSetting}
        handleDeleteFields={handleDeleteFields}
        dragHandleProps={{ attributes, listeners }}
        isLabel={isLabel}
        isOutLine={isOutLine}
      />
    </div>
  );
};
