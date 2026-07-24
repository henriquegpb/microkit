"use client";

import { useRouter } from "next/navigation";
import { SponsorsPage } from "../page";

export default function SponsorsRoute() {
  const router = useRouter();
  return <SponsorsPage onBack={() => router.push("/")} />;
}
