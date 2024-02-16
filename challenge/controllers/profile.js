import { query } from "../database/database.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const profilePage= async(req,res)=>{
    const sqlQuery = `SELECT * FROM Users where id=?`
    const valArray = [req.params.id]
    console.log(req.params.id)
    const result =await query({query:sqlQuery,values:valArray})
    console.log(result)
    if(result.length===0)
    {
        res.send("user doesn't exist")
    }
    console.log(result[0].username)

    console.log("cookie:",req.cookies)
    if(req.cookies?.user_cookie)
    {
        try{

            let decryptedCookie = jwt.verify(req.cookies.user_cookie,process.env.JWT_SECRET_KEY)
            if(decryptedCookie.id ==result[0].id)
            {
                res.render('profile',{name:result[0].username})
            }
            else{
                res.send('cannot access this')
            }
        }
        catch{
            res.send("dont mess with the cookie")
        }
    }
    else{

        res.send("Cannot access this");
    }
}