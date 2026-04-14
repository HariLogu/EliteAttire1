// import userModel from "../models/userModel.js"
// import validator from "validator";
// import bcrypt from "bcryptjs";
// import jsonwebtoken from "jsonwebtoken";


// function generateToken(id) {
//     return jsonwebtoken.sign({ id }, process.env.JWT_SECRET);
// }

// // login
// export async function loginUser(req, res) {
//     try {
//         const { email, password } = req.body;
//         const user = await userModel.findOne({ email })
//         if (!user) {
//             return res.json({ success: false, message: "user not exists" })
//         }

//         const isMatch = await bcrypt.compare(password, user.password)
//         if (isMatch) {
//             const token = generateToken(user._id);
//             res.status(200).json({ success: true, token })
//         }
//         else {
//             res.json({ success: false, message: "invalid credentials" })
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// //register
// export async function registerUser(req, res) {
//     try {
//         // using obj destru
//         const { name, email, password } = req.body;

//         // check user already exists or not
//         const exists = await userModel.findOne({ email })
//         if (exists) {
//             return res.json({ success: false, message: "User exists already" })
//         }

//         // invalid email
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Invalid email" })
//         }

//         //invalid password
//         if (password.length < 8) {
//             res.json({ success: false, message: "invalid password,too small" })
//         }

//         // hashing pword
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new userModel({
//             name,
//             email,
//             password: hashedPassword
//         })

//         const user = await newUser.save();
//         const token = generateToken(user._id);
//         res.json({ success: true, token });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// // getAll(unnecessary)
// export async function getUsers(req, res) {
//     const user = await userModel.find();
//     if (user.length > 0)
//         res.status(200).json({ success: true, user })
//     else
//         res.json({ success: false, message: "No registered users" })

// }

// // getbyId(unnecessary)
// export async function getuserById(req, res) {
//     try {
//         const user = await userModel.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "user not found" })
//         }
//         else {
//             res.status(200).json({ success: true, user })
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// // deleteUserById(unnecessary)
// export async function deleteUserById(req, res) {
//     try {
//         const user = await userModel.findByIdAndDelete(req.params.id);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "user not found" })
//         }
//         else {
//             res.status(200).json({ success: true, message: "user deleted successfully" })
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// // adminlogin
// export async function adminLogin(req, res) {
//     try {
//         const { email, password } = req.body;

//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const token = jsonwebtoken.sign(email + password, process.env.JWT_SECRET)
//             res.status(200).json({ success: true, token })
//         }
//         else {
//             res.json({ success: false, message: "Invalid Credentials" })
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }


import userModel from "../models/userModel.js"
import validator from "validator";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";


function generateToken(id) {
    return jsonwebtoken.sign({ id }, process.env.JWT_SECRET);
}

// login
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "user not exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = generateToken(user._id);
            res.status(200).json({ success: true, token }) 
        }
        else {
            res.json({ success: false, message: "invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//register
export async function registerUser(req, res) {
    try {
        // using obj destru
        const { name, email, password } = req.body;

        // check user already exists or not
        const exists = await userModel.findOne({ email })
        if (exists) return res.json({ success: false, message: "User already exists " })

        // invalid email
        if (!validator.isEmail(email)) return res.json({ success: false, message: "Invalid email" })


        //invalid password  -----------we should use return to return back the flow of program or else it will show the error but the data(weak password) will be added in DB
        if (password.length < 8) return res.json({ success: false, message: "weak password ,too small" })


        // hashing pword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = generateToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// getAll(unnecessary)
export async function getUsers(req, res) {
    //     const user = await userModel.find();
    //     if (user.length > 0)
    //         res.status(200).json({ success: true, user })
    //     else
    //         res.json({ success: false, message: "No registered users" })

}

// getbyId(unnecessary)
// export async function getuserById(req, res) {
//     try {
//         const user = await userModel.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "user not found" })
//         }
//         else {
//             res.status(200).json({ success: true, user })
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// deleteUserById(unnecessary)
// export async function deleteUserById(req, res) {
//     try {
//         const user = await userModel.findByIdAndDelete(req.params.id);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "user not found" })
//         }
//         else {
//             res.status(200).json({ success: true, message: "user deleted successfully" })
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// adminlogin
export async function adminLogin(req, res) {
        try {
            const { email, password } = req.body;

            if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                const token = jsonwebtoken.sign(email + password, process.env.JWT_SECRET)
                res.status(200).json({ success: true, token })
            }
            else {
                res.json({ success: false, message: "Invalid Credentials" })
            }

        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message })
        }
}