import appConfig from "@/config/appConfig";

function Footer() {
  return (
    <footer className="mt-auto px-3 md:px-6 pb-3 text-sm">
      <div className="text-center pb-1 md:pb-0"> {appConfig.copyright} </div>
      <div className="text-center md:text-end md:mt-[-20px]">Version: {appConfig.version}</div>
    </footer>
  );
}

export default Footer;
