const multer = require('multer');

const uploadFile = multer({
    storage: multer.diskStorage({     
      destination: (req, file, cb) => {   //儲存位置  
        // if(file){
          cb(null, 'uploads')
      // }
    },
      filename: (req, file, cb) =>{
        // if(file){
          const filename=Buffer.from(file.originalname,"latin1").toString("utf8");
          cb(null, filename)       //檔名因為跟windows預設不一樣，所以要轉回
      // }
    }}),
    // limits: {
    //     fileSize: 100000    // 限制上傳檔案的大小為 0.1MB
    // },
    // fileFilter: function (req, file, cb) {
    //     if (!file.originalname.match(/\.(docx)$/)) {  // 只接受docx格式
    //       cb(new Error('請上傳Word檔'))
    //     }
    //     cb(null, true)
    //   }
  });

module.exports = uploadFile.single('myFile');