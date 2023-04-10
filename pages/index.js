import { Inter } from "next/font/google";
import VerificationForm from "@/components/VerficationForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`mt-40 ${inter.className}`}>
      <VerificationForm />
    </main>
  );
}
