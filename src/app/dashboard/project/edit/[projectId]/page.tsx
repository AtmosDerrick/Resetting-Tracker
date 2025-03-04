"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "@/redux/slices/projectApiSlice";

const ProjectEditPage = () => {
  const router = useRouter();
  const { projectId }: { projectId: string } = useParams();

  const {
    data: projectData,
    isLoading,
    isError,
  } = useGetProjectQuery(projectId);

  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const [project, setProject] = useState<any>(projectData?.data);

  useEffect(() => {
    if (projectData) {
      setProject(projectData.data);
    }
  }, [projectData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProject((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!project) {
      alert("No project data found.");
      return;
    }

    try {
      const updatedProject = await updateProject({
        id: projectId,
        data: project,
      }).unwrap();

      console.log("Project updated successfully:", updatedProject);
      alert("Project updated successfully!");

      router.push(`/dashboard/project/${projectId}`);
    } catch (error) {
      console.error("Failed to update project:", error);
      alert("Failed to update project. Please try again.");
    }
  };

  if (isLoading)
    return (
      <p className="text-center text-gray-600">Loading project details...</p>
    );
  if (isError)
    return <p className="text-center text-red-600">Error loading project.</p>;
  if (!project)
    return <p className="text-center text-gray-600">Project not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <button
          onClick={() => router.back()}
          className="text-blue-500 hover:underline mb-4">
          &larr; Back
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Edit Project
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Project Name", name: "name", type: "text" },
            { label: "Partner", name: "partner", type: "text" },
            {
              label: "Beneficiary MMDCE",
              name: "beneficiary_mmdce",
              type: "text",
            },
            {
              label: "Beneficiary Community",
              name: "beneficiary_community",
              type: "text",
            },
            { label: "Amount", name: "amount", type: "number" },
            { label: "Currency", name: "amount_currency", type: "text" },
            { label: "Start Date", name: "startDate", type: "date" },
            { label: "End Date", name: "endDate", type: "date" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="text-gray-700 font-semibold">{label}</label>
              <input
                type={type}
                name={name}
                value={project?.[name] || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          ))}

          <div>
            <label className="text-gray-700 font-semibold">Status</label>
            <select
              name="status"
              value={project?.status || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required>
              <option value="Not Started">Not Started</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="text-gray-700 font-semibold">Description</label>
            <textarea
              name="description"
              value={project?.description || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>

          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-500 text-white rounded">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-4 py-2 bg-blue-600 text-white rounded">
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectEditPage;
