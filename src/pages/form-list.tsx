import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteForm } from "@/redux/slices/published-forms";
import { RootState } from "@/redux/store";
import { Eye, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FormList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allForms } = useSelector((store: RootState) => store.publishedForms);

  const handleDeleteForm = (index: number) => {
    if (!window.confirm("Are you sure to delete this form")) return;
    dispatch(deleteForm(index));
  };

  return (
    <div className="flex flex-col gap-5 py-2 px-4">
      <h1 className="text-2xl font-semibold">Form List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allForms?.length > 0 ? (
            allForms?.map((form, index) => (
              <TableRow key={index}>
                <TableCell>{form?.name}</TableCell>
                <TableCell>{form?.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      onClick={() => navigate(`/preview-form/${index}`)}
                    >
                      <Eye />
                    </Button>
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      onClick={() => handleDeleteForm(index)}
                    >
                      <Trash className="text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No form added!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default FormList;
