"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useDeleteProjectMutation,
  useGetProjectQuery,
} from "@/redux/slices/projectApiSlice";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-700 font-semibold">{label}</p>
    <p className="text-gray-600">{value || "N/A"}</p>
  </div>
);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const Page = () => {
  const router = useRouter();
  const { projectId }: { projectId: string } = useParams();

  const {
    data: projectData,
    isLoading,
    isError,
  } = useGetProjectQuery(projectId);
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id).unwrap();
        alert("Project deleted successfully!");
      } catch (error) {
        console.error("Failed to delete project:", error);
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <p className="text-center text-gray-600">Loading project details...</p>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <p className="text-center text-red-600">
          Error loading project details.
        </p>
      </div>
    );

  if (!projectData)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <p className="text-center text-gray-600">Project not found.</p>
      </div>
    );

  const project: any = projectData.data;

  return (
    <div className="min-h-screen bg-gray-100 flex p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="text-blue-500 hover:underline mb-4">
            &larr; Back
          </button>
          <div className="flex justify-end gap-x-4 items-center">
            <Link href={`/dashboard/project/edit/${project.id}`}>
              <BiEdit className="text-green-500 cursor-pointer" />
            </Link>
            <BsTrash
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(project.id)}
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {project.name.toUpperCase()}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem label="Partner" value={project.partner} />
          <DetailItem
            label="Beneficiary MMDCE"
            value={project.beneficiary_mmdce}
          />
          <DetailItem
            label="Beneficiary Community"
            value={project.beneficiary_community}
          />
          <DetailItem
            label="Amount"
            value={`${project.amount} ${project.amount_currency}`}
          />
          <DetailItem label="Status" value={project.status} />
          <DetailItem
            label="Start Date"
            value={formatDate(project.startDate)}
          />
          <DetailItem label="End Date" value={formatDate(project.endDate)} />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Description
          </h3>
          <p className="text-gray-600">{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
