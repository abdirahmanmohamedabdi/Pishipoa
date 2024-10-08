import { NextResponse } from "next/server";
import { createUser } from "@/app/queries/users";
import { connectDB } from "@/app/lib/mongo";
import bcrypt from "bcrypt";

export const POST = async (request)  => {
    const {name, email, password} = await request.json();

    console.log(name, email, password);
    // Create a db connection
await connectDB();
    // encrypt the password
const hashedPassword = await bcrypt.hash(password, 5);
    // for a db payload
const newUser = {
        name,
        email,
        password: hashedPassword,
    }
    
    // update the db
    try {
        await createUser(newUser);
    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }
    
return new NextResponse("User has been created successfully", {
        status: 201,
    });
    }
