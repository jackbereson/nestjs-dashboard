const PageLoading = ({ isLoading }: any) => {
  if (isLoading) {
    return (
      <div className="loading bg-seconds-dark bg-opacity-50">
        <div className="load-wrapper bg-primary-dark">
          <div className="group">
            <div className="bigSqr">
              <div className="square first"></div>
              <div className="square second"></div>
              <div className="square third"></div>
              <div className="square fourth"></div>
            </div>
            <div className="text">LOADING...</div>
          </div>
        </div>
      </div>
    );
  } 
  else {
    return <></>;
  }
};

export default PageLoading;
