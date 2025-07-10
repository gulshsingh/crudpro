import { NextRequest, NextResponse } from "next/server";
import MongoConnect from "../../mongoconnect/MongoConnect";



export async function POST(requst) {
    

    await MongoConnect()

    const body = await requst.json();

    return NextResponse.json(body , {status:200})

}