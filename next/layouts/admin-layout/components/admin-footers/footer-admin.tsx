const FooterAdmin = () => {
  return (
    <footer className="block py-4">
      <div className="container mx-auto px-4">
        <hr className="mb-4 border-b-1 border-blueGray-200" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4">
            <div className="text-sm text-gray-500 font-semibold py-1 text-center md:text-left">
              Copyright © {new Date().getFullYear()}{" "}
              <a
                href="https://dashboarddc8"
                className="text-gray-500 hover:text-gray-700 text-sm font-semibold py-1"
              >
                Dashboard DC8
              </a>
            </div>
          </div>
          <div className="w-full md:w-8/12 px-4">
            <ul className="flex flex-wrap list-none md:justify-end  justify-center">
              <li>
                <a
                  href="https://dc8-dashboard.web5dev.tech"
                  className="text-primary-dark hover:text-gray-800 text-sm font-semibold block py-1 px-3"
                >
                  DC8
                </a>
              </li>
              <li>
                <a
                  href="https://dashboarddc8/about"
                  className="text-primary-dark hover:text-gray-800 text-sm font-semibold block py-1 px-3"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://dashboarddc8/blog"
                  className="text-primary-dark hover:text-gray-800 text-sm font-semibold block py-1 px-3"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterAdmin;
