"use client";

import { useRouter } from "next/navigation";
import { SubmissionPage } from "../page";

export default function SubmitRoute() {
  const router = useRouter();
  return <SubmissionPage onBack={() => router.push("/")} />;
}
