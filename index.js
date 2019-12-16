const path =require("path");
const Axios=require("axios");
const fs=require("fs");
const FormData=require("form-data");
function WebpackOnBuildPlugin(config) {
    this.callback = function(){
       const {root,url,maxContentLength}=config
        //上传文件逻辑
        function uploadFile(paths){
            let formData = new FormData();
            paths.forEach(item=>{
              const readStream=fs.createReadStream(item)
              formData.append(`${path.basename(item)}`,readStream)
            })
            let config = {
                headers: formData.getHeaders()
            }
            Axios.post(url,formData, config,{maxContentLength:maxContentLength}).then(
            (res)=>{
            console.log(res.data)
            });
          }
    
          //遍历文件夹逻辑
        
          var list = fs.readdirSync(root);
          let results=[];
          list.forEach(file=>{
            if(path.extname(file)=='.map'){
              results=results.concat(path.resolve(root,file));
            }
          })
          uploadFile(results);
    };
  };
  WebpackOnBuildPlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', this.callback);
  };
  
  module.exports = WebpackOnBuildPlugin;
