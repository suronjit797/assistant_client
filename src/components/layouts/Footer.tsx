import appConfig from "@/config/appConfig";

function Footer() {
  return (
    <footer className="mt-auto px-6 py-8 bg-gray-50 dark:bg-slate-800 text-sm">
      <div className="text-center"> {appConfig.copyright} </div>
      <div className="text-end mt-[-20px]">Version: {appConfig.version}</div>
    </footer>
  );
}

export default Footer;
