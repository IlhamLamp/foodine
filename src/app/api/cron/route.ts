import { NextResponse } from "next/server"

export function GET(req: Request) {
    const result = "Hello, this is cron"
    return NextResponse.json({ data: result })
}