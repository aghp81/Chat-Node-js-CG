const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
    const { mobile, code } = req.body;
    const user = await User.findOne({ mobile });

    if (!user) return res.status(400).json({ msg: 'User not found' });

    // فرض کنید که قبلاً کد ارسال شده از طریق پیامک را اعتبارسنجی کرده‌اید
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};
