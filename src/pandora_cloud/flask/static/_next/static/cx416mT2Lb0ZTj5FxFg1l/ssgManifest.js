// 初始化一个空的集合，可根据需求存储一些数据
window.customManifest = new Set();
// 检查是否有自定义的回调函数，如果有则调用
if (window.customManifestCallback) {
    window.customManifestCallback();
}
