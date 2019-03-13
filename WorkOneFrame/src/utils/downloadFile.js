export const downloadPDF = function (dataBaseUrl, fileName) {
  let aLink = document.createElement('a');
  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = dataBaseUrl;
  aLink.click();
};

export const downloadExcel = function (blob, fileName) {
  //for IE
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  } else {// for Non-IE (chrome, firefox etc.)
    let aLink = document.createElement('a');
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    let url = window.URL.createObjectURL(blob);
    aLink.href = url;
    aLink.click();
    window.URL.revokeObjectURL(url);
  }
}