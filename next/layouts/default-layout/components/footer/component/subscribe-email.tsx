const SubscribeEmail = () => {
  return (
    <form className="flex items-center mt-6">
      <div className="w-full">
        <label
          className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
          htmlFor="grid-last-name"
        >
          Subscribe for our Newsletter
        </label>
        <div className="flex flex-wrap items-stretch w-full mb-4 relative">
          <input
            type="email"
            className="flex-shrink flex-grow leading-normal w-px flex-1 border h-10 border-grey-light rounded rounded-r-none px-3 relative"
            placeholder="Input your email here"
          />
          <div className="flex -mr-px">
            <button className="flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SubscribeEmail;
