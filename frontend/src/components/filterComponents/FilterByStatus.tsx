export function FilterByStatus() {
  return (
    <select name="status">
      <option value={""}></option>
      <option value={"lost"}>Загублено</option>
      <option value={"found"}>Знайдено</option>
    </select>
  );
}
