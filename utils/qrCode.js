const qrcode = require('qrcode')
const jsQR = require('jsqr')

const data = {
  name: 'Employee Name',
  age: 27,
  department: 'Police',
  id: 'aisuoiqu3234738jdhf100223',
}

const generateQRCode = (data) => {
  return qrcode.toString(
    JSON.stringify(data),
    { type: 'utf8' },
    (err, QRCode) => {
      if (err) return err
      return QRCode
    }
  )
}

const qr = generateQRCode(data)
console.log(typeof(qr))
