// app/legal-entity/new/page.tsx

import CreateLegalEntityForm from "@/components/legal-entity/legal-entity-create-form";

export default function NewLegalEntityPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <CreateLegalEntityForm />
    </div>
  );
}
