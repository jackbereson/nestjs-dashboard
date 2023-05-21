const FooterInfo = () =>{
    return (
        <>
         <h5 className="uppercase tracking-wider font-semibold">
            Contact Details
          </h5>
          <ul className="mt-4">
            <li>
              <a
                href="#"
                title=""
                className="flex items-center opacity-75 hover:opacity-100"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M12,2C7.589,2,4,5.589,4,9.995C3.971,16.44,11.696,21.784,12,22c0,0,8.029-5.56,8-12C20,5.589,16.411,2,12,2z M12,14 c-2.21,0-4-1.79-4-4s1.79-4,4-4s4,1.79,4,4S14.21,14,12,14z"></path>
                  </svg>
                </span>
                <span className="ml-3">9 Empire Stadium St., G2PRA, GZR 1300 Malta</span>
              </a>
            </li>
            <li className="mt-4">
              <a
                href="#"
                title=""
                className="flex items-center opacity-75 hover:opacity-100"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path>
                    <path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path>
                  </svg>
                </span>
                <span className="ml-3">
                  Mon - Sun: 00:00 - 23:59
                </span>
              </a>
            </li>
            <li className="mt-4">
              <a
                href="#"
                title=""
                className="flex items-center opacity-75 hover:opacity-100"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M20,4H4C2.896,4,2,4.896,2,6v12c0,1.104,0.896,2,2,2h16c1.104,0,2-0.896,2-2V6C22,4.896,21.104,4,20,4z M20,8.7l-8,5.334 L4,8.7V6.297l8,5.333l8-5.333V8.7z"></path>
                  </svg>
                </span>
                <span className="ml-3">DC8@dr.com</span>
              </a>
            </li>
          </ul>
        </>
    )
}

export default FooterInfo;