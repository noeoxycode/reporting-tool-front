import { cn } from "@/lib/utils";
import IndividualForm from "./individual.form";

export default function Home() {
  return (
    <main className="p-6">
        <ul>
            <li><a href="individuals/new">individuals</a></li>
            <li><a href="advisers/new">advisers</a></li>
        </ul>


    </main>
  );
}
