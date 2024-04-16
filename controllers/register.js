
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const {name, email, password:Npassword} = req.body
    if(!name || !email || !Npassword) return res.json({ status:"error", error:"Please Enter all the details"});
    else{
        console.log(email);
        db.query('SELECT email from users WHERE email = ?', [email], async (err, result) => {
            if (err) throw err;
            if(result[0]) return res.json({ status:"error", error:"Email has already been registered"});
            else{
                const password = await bcrypt.hash(Npassword, 8);
                console.log(password);
                db.query('INSERT INTO users SET ?', {name:name, email:email, password:password}, (error, results) =>{
                    if(error) throw error;
                    return res.json({ status:"success", success:"User has been registered"});
                })
            }
        })
    }
}

module.exports = register;