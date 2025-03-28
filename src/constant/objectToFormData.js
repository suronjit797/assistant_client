export function objectToFormData(obj) {
  const formData = new FormData();

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      formData.append(key, obj[key]);
    }
  }

  return formData;
}
