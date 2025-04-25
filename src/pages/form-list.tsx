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
import { Eye, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const FormList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allForms } = useSelector((store: RootState) => store.publishedForms);

  const handleDeleteForm = (index: number) => {
    if (!window.confirm("Are you sure to delete this form")) return;
    dispatch(deleteForm(index));
  };

  return (
    <div className="bg-white rounded-lg flex flex-col gap-5 py-2 px-4 min-h-72">
      {allForms?.length > 0 ? (
        <div>
        <h1 className="text-2xl font-semibold mb-4">Form List</h1>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allForms?.length > 0 ? (
              allForms?.map((form, index) => (
                <TableRow key={index}>
                  <TableCell>{form?.name}</TableCell>
                  <TableCell>{form?.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
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
      ):(
        <div className="h-full min-h-72 text-center flex flex-col justify-center items-center">
          <p className="text-2xl font-semibold">No forms created yet</p>
          <p className="text-muted-foreground mb-4">Start building your dynamic form</p>
          <Link to="/create-form"><Button><Plus />Create Form</Button></Link>
        </div>
      )}
    </div>
  );
};
export default FormList;
