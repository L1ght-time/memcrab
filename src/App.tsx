import { TableSetupForm } from "./views/components/table-setup-form/table-setup-form.tsx";

const App = () => {
  const handleSubmit = (rows: number, cols: number) => {
    console.log("Rows:", rows, "Cols:", cols);
  };

  return (
    <div>
      <TableSetupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
