const passport = require("passport");
var validator = require("email-validator");
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
// const cloudinary = require("cloudinary").v2;

const UserModel = require('../models/UserModel');

// check user
const authUser = (req, res, next) => {
	// console.log(req.body)
	passport.authenticate('local', (err, user) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json({ success: false });
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			req.session.name = user.username; // email
			req.session.role = user.role; // role
			return res.json({ success: true, id: user._id, role: user.role });
		});
	})(req, res, next);
};

const session = (req, res) => {
	res.json(req.session);
}

// Register a User
const registerUser = (req, res) => {
	if (validator.validate(req.body.username)) {
		UserModel.register({ username: req.body.username, role: "user" }, req.body.password, function (err, user) {
			if (err) {
				console.error(err);
				res.json({ success: false })
			} else {
				passport.authenticate("local")(req, res, function () {
					res.json({ success: true, role: 'user' })
				})
			}
		});
	} else {
		res.json({ success: false })
	}
}

// logout user
const logoutuser = (req, res) => {
	const name = req.session.name;
	req.logout(function (err) {
		if (err) { return next(err); }
		res.clearCookie(name);
		res.json({ success: true, message: "Logged out" });
	});
}

// check authentication
const checkauthentication = (req, res) => {
	// console.log("checkauthentication is called")
	if (req.session.name && req.session.role) {
		passport.authenticate("local")(req, res, () => {
			res.json('Authenticated')
		});
	} else {
		res.send({ success: false });
	}
}

const forgotpassword = async (req, res) => {
	const { username } = req.body;
	try {
		// Find the user with the given email
		const user = await UserModel.findOne({ username: username });

		if (!user) {
			return res.json({ success: false, message: 'User not found' });
		}

		const otp = otpGenerator.generate(7, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

		user.otp = otp;
		user.otpExpiry = Date.now() + 10 * 60 * 1000;
		await user.save();

		let transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_ADDRESS,
				pass: process.env.EMAIL_PASSWORD
			}
		})

		let mailOptions = {
			from: "fitme@gmail.com",
			to: username,
			subject: "Reset Password OTP",
			text: `Your OTP is ${otp}. It will expire in 10 minutes.`
		}

		transporter.sendMail(mailOptions, function (err, success) {
			if (err) {
				console.log(err)
			} else {
				console.log("Message sent" + otp)
			}
		})
		req.session.name = user.username; // email
		return res.json({ success: true, name: user.username });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};

const checkotp = async (req, res) => {
	const otp = req.body.otp;
	const username = req.session.name

	try {
		const user = await UserModel.findOne({ username: username });
		console.log("Checkotp is called" + otp)
		if (!user) {
			return res.json({ success: false, message: 'User not found' });
		}

		// Check if OTP is valid and not expired
		if (user.otp == otp && user.otpExpiry > Date.now()) {
			return res.json({ success: true, id: user._id, role: user.role });
		} else {
			return res.json({ success: false, message: 'Invalid OTP' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Server error' });
	}
}

const update = async (req, res) => {
	// const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
	// 	folder: "avatars",
	// 	width: 150,
	// 	crop: "scale",
	// });

	try {
		// if (!req.body.avatar) {
		await UserModel.findOneAndUpdate({ username: req.body.username }, { $set: req.body });
		// } else {
		// 	const user = await UserModel.findOneAndUpdate({ username: req.body.username }, { $set: req.body });
		// 	user.avatar.public_id = myCloud.public_id,
		// 	user.avatar.url = myCloud.secure_url
		// 	user.save();
		// }
		return res.status(200).send({ success: true, message: "Updation done" });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Server error' });
	}
};

const isAdmin = async (req, res) => {
	const user = req.session.name;

	if (req.session && req.session.role === "admin") {
		try {
			const userexists = await UserModel.findOne({ username: user })
			if (userexists && userexists.role === req.session.role) {
				res.json({ success: true, userexist: userexists });
			} else {
				res.json({ success: false, message: "Not Authorized" })
			}
		} catch (error) {
			res.json({ success: false, message: "Service Error" })
			console.log(error);
		}
	}
}

const isUser = async (req, res) => {
	const user = req.session.name;
	try {
		const userexists = await UserModel.findOne({ username: user })
		if (userexists) {
			res.json({ success: true, userexists: (userexists) });
		}
	} catch (error) {
		res.json({ success: false, message: "Service Error" })
		console.log(error);
	}
}

const userid = async (req, res) => {
	const id = req.params.id;
	try {
		const userexists = await UserModel.findOne({ _id: id })
		if (userexists) {
			res.json({ success: true, userexists: (userexists) });
		}
	} catch (error) {
		res.json({ success: false, message: "Service Error" })
		console.log(error);
	}
}

const user = async (req, res) => {
	const user = await UserModel.find({ role: "user" })
	res.json(user);
}

const changepass = async (req, res) => {

	// Get the old and new passwords from the request body
	const { newPassword, username } = req.body;

	const user = await UserModel.findOne({ username: username })

	// Update the user's password with the new password
	user.setPassword(newPassword, (err, user) => {
		if (err) {
			console.error(err);
			return res.json({ success: false, message: 'Error changing password' });
		}

		// Save the updated user object
		user.save()
		// Send success response
		return res.json({ success: true, message: 'Password changed successfully' });
	});
}

module.exports = {
	authUser,
	registerUser,
	logoutuser,
	checkauthentication,
	forgotpassword,
	checkotp,
	update,
	isAdmin,
	isUser,
	userid,
	user,
	changepass,
	session
};