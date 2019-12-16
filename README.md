# 自动上传map文件插件
## 使用方法
1. 安装npm包`npm install zy-map`
2. 引入WebpackOnBuildPlugin插件`const WebpackOnBuildPlugin = require("zy-map");`
3. 当做webpack插件使用，例子
```
plugins:[
    new WebpackOnBuildPlugin({
      root:path.resolve("./dist"),
      url:"http://localhost:7001/fileuploadsStream",
      maxContentLength:5000
    })
  ]
```
4.参数
* root:打包后的文件夹绝对路径，也就是output的路径
* url:指定的服务器地址
* maxContentLength:指定上传文件的大小