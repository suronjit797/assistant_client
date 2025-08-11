import Swal from "sweetalert2";

export const copyHandler = async (text: string, name: string) => {
  if (text) {
    await navigator.clipboard.writeText(text);
    Swal.fire({
      title: "Copied!",
      text: name + " copied to clipboard.",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({ title: "Failed", text: name + " Copy failed.", icon: "error" });
  }
};
