// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@repo/db/client";
const client = new PrismaClient();

export default function Home() {
  return <div className='font-bold text-3xl underline'>Hello</div>;
}
