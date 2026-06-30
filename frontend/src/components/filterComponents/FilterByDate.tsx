// export interface FilterByDateProps {
//   onFilter: (formData: any) => void;
// }

export function FilterByDate() {
  return (
    <>
      <label>
        Початкова дата
        <input type="date" name="startDate"></input>
      </label>
      <label>
        Кінцева дата
        <input type="date" name="endDate"></input>
      </label>
    </>
  );
}
