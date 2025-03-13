import CreateForm from "@/components/individual/CreateForm";
import Link from "next/link";


export default function CreateIndividualPage() {
  return (
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="mb-6">
            <Link
                href="/individuals"
            >
              &larr; Back to the list
            </Link>
            <h1 className="mt-2 text-2xl font-semibold ">Add new individual</h1>
          </div>

          <CreateForm />
        </div></div>
  );
}
