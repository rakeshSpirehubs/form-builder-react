import { Routes, Route } from "react-router-dom";
import FormList from "./pages/form-list.tsx";
import FormBuilder from "./pages/form-builder.tsx";
import CommonLayout from "./components/common-layout.tsx";
import PreviewForm from "./pages/preview-form.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout />}>
        <Route path="/" element={<FormList />} />
        <Route path="/create-form" element={<FormBuilder />} />
        <Route path="/preview-form/:formId" element={<PreviewForm />} />
      </Route>
    </Routes>
  );
};

export default App;
