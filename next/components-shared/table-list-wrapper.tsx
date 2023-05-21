
const TableListWrapper = (props:any) => {
  return (
    <div className="block w-full overflow-x-auto bg-seconds-light dark:bg-seconds-dark dark:text-seconds-light rounded-b">
      {props.children}
    </div>
  );
};

export default TableListWrapper;
