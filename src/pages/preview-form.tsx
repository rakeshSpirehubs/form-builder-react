import { FormFieldItem } from "@/components/form-field-item";
import { Button } from "@/components/ui/button";
import { findField } from "@/lib/utils";
import { RootState } from "@/redux/store";
import PublishedFormInterface from "@/types/published-forms";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const PreviewForm = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const { allForms } = useSelector((store: RootState) => store.publishedForms);
  const [formData, setFormData] = useState<PublishedFormInterface | undefined>(
    undefined
  );

  const [previewData, setPreviewData] = useState<any>(undefined);

  useEffect(() => {
    if (formId) {
      setFormData(allForms[Number(formId) | 0]);
    }
  }, [formId]);

  if (!formData) {
    return <div className="w-full py-10 text-center text-xl">Loading...</div>;
  }

  const handleSubmitForm = (event: any) => {
    event.preventDefault();
    const arr = [] as any;
    const result: any = {};

    for (let pair of new FormData(event.target).entries()) {
      const key = pair[0];
      const value =
        typeof pair[1] === "object"
          ? URL.createObjectURL(pair[1])
          : `${pair[1]}`;

      if (result[key]) {
        result[key] += `, ${value}`;
      } else {
        result[key] = value;
      }
    }

    for (const [key, value] of Object.entries(result)) {
      arr.push({ key, value });
    }

    setPreviewData(arr);
  };

  return (
    <div className="max-w-[600px] m-auto p-10">
      <div className="border flex flex-col gap-5 py-4 px-6 rounded-lg">
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex flex-col gap-0">
            <h1 className="text-xl font-semibold">{formData?.name}</h1>
            <p className="text-sm">{formData?.description}</p>
          </div>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
              if (previewData) {
                setPreviewData(false);
              } else {
                navigate("/");
              }
            }}
          >
            Back
          </Button>
        </div>
        {previewData?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {previewData.map((item: any, index: number) => (
              <div className="flex items-center gap-2" key={index}>
                <p className="text-sm font-semibold">
                  {findField(formData?.fields, item?.key)?.label}
                </p>
                : <p>{item?.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
            {formData?.fields?.map((field, index) => (
              <FormFieldItem
                key={field.serialNumber || index}
                field={field}
                isLabel={formData.isLabel}
                isOutLine={formData.isOutLine}
              />
            ))}

            <div className="col-span-full w-full flex items-center gap-3 mt-5">
              <Button className="cursor-pointer">Submit</Button>
              <Button
                className="cursor-pointer"
                variant="outline"
                type="button"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default PreviewForm;
