import { NextResponse } from "next/server"

export function GET() {
    const result = "Hello, this is cron";
    return NextResponse.json({ msg: result }, {status: 200});
}