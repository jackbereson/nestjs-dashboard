const DecoHeader = (props: any) => {
  return (
    <>
      {/* Header */}
      <div className="relative bg-primary-dark md:pt-10 h-40">
        <div className="px-4 md:px-2 mx-auto w-full">
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default DecoHeader;
