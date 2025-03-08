import { cn } from "@/lib/utils";
import IndividualForm from "./individuals/new/individual.form";

export default function Home() {
  return (
    <main className="p-6">
        <ul>
            <li><a href="individuals/new">individuals</a></li>
            <li><a href="advisers/new">advisers</a></li>
            <li><a href="legal-entities/new">legal entities</a></li>
            <li><a href="goals/new">goals</a></li>
            <li><a href="other-users/new">other users</a></li>
        </ul>


    </main>
  );
}
