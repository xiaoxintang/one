import { prisma } from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log("users==>", users);
  return <div>home {JSON.stringify(users)}</div>;
}
