import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type UpdateFormNameProps = {
  formName: string;
  formDescription: string;
  isOpenFormNameDialog: boolean;
  handleUpdate: (newName: string, newDescription: string) => void;
  handleCloseFormNameDialog: () => void;
};

const UpdateFormName: React.FC<UpdateFormNameProps> = ({
  formName,
  formDescription,
  isOpenFormNameDialog,
  handleUpdate,
  handleCloseFormNameDialog
}) => {
  const [name, setName] = useState<string>(formName);
  const [description, setDescription] = useState<string>(formDescription);
  return (
    <Dialog open={isOpenFormNameDialog} onOpenChange={handleCloseFormNameDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update form name and description</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              className="col-span-3"
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              className="col-span-3"
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              handleUpdate(name, description);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFormName;
