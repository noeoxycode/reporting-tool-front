'use client';

import { useState } from 'react';
import {deleteLegalEntity} from "@/lib/api/legal-entity";
import DeleteModal from "@/components/delete-confirmation-modal";

interface DeleteButtonProps {
  id: string;
  name: string;
}

export default function DeleteButton({ id, name }: DeleteButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

    const handleDelete = async (id: string) => {
        await deleteLegalEntity(id);
    };

  return (
    <>
      <button
        onClick={openModal}
        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
      >
        Delete
      </button>
        <DeleteModal
            id={id}
            name={name}
            isOpen={isModalOpen}
            onClose={closeModal}
            onDelete={handleDelete}
            redirectAfterDelete="/legal-entities"
            successMessage="Legal Entity"
        />
    </>
  );
}
