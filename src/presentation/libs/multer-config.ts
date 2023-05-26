const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
  limits: { fileSize: 4597152 },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedMimes = [
      'excel',
      'spreadsheetml',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(new Error('Invalid file type.'))
    }
  }
}
