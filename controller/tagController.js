const User = require('../models/Customer')
const Tag = require('../models/Tag')

const activeTag = async (req, res, next) => {
  try {
    const { email } = req.body

    let tag = await Tag.findOne({ email })
    if (!tag) {
      return res
        .status(400)
        .json({ success: false, msg: 'User does not have an active tag.' })
    }
    return res.status(200).json({ success: true, tag })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      errorMessage: 'Internal Server Error',
      errorType: 'Internal Server Error',
    })
  }
}

const attachTagToUser = async (req, res) => {
  try {
    const { email, tagID } = req.body

    const user = await User.findOne({ email })
    if (user == undefined) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      })
    }

    const activeTag = await Tag.findOne({
      $or: [{ email }, { tagID }],
    })
    if (activeTag) {
      return res.status(400).json({
        success: false,
        message:
          activeTag.email == email
            ? 'User already has an active tag'
            : 'Scanned tag is assigned to another user. Please choose another tag',
        tag: activeTag,
      })
    }

    const tag = await Tag.findOneAndUpdate({ tagID }, { email })

    return res.status(200).json({
      success: true,
      tag,
      message: 'Tag attached with user sucessfully. Happy Shopping!',
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      error: {
        message: 'Internal Server Error',
        type: 'Internal Server Error',
      },
    })
  }
}

const clearTag = async (req, res) => {
  try {
    const { email } = req.body

    const tag = await Tag.findOne({ email })
    await tag.resetTag()

    return res.status(200).json({ success: true, tag })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      errorMessage: 'Internal Server Error',
      errorType: 'Internal Server Error',
    })
  }
}

module.exports = {
  activeTag,
  attachTagToUser,
  clearTag,
}
