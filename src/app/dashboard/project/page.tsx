"use client";
import { useGetAllProjectsQuery } from "@/redux/slices/projectApiSlice";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import DateObject from "react-date-object";
import { useRouter } from "next/navigation";

const ProjectPage = () => {
  const { data: projects, isLoading, isError } = useGetAllProjectsQuery();
  const router = useRouter();

  var date = new DateObject();

  if (isLoading) return <p className="text-center py-4">Loading...</p>;
  if (isError)
    return (
      <p className="text-center py-4 text-red-500">Error loading projects</p>
    );

  return (
    <div className="p-6">
      <div className="w-full flex justify-between items-center mb-12">
        <h1 className="text-2xl font-semibold mb-4">Projects</h1>
        <button
          className="bg-blue-500 py-2 px-6 text-white "
          onClick={() => {
            router.push("/dashboard/project/create");
          }}>
          Create +
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Partner</th>
              <th className="p-3 border">Beneficiary-mmdce</th>
              <th className="p-3 border">Beneficiary_community</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Currency</th>

              <th className="p-3 border">Start Date</th>
              <th className="p-3 border">End Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects?.data?.map((project: any) => (
              <tr key={project.id} className="border">
                <td className="p-3 border">{project.name}</td>
                <td className="p-3 border">{project.partner}</td>
                <td className="p-3 border">{project.beneficiary_mmdce}</td>
                <td className="p-3 border">{project.beneficiary_community}</td>
                <td className="p-3 border">{project.amount}</td>
                <td className="p-3 border">{project.amount_currency}</td>
                <td className="p-3 border">{date.format(project.startDate)}</td>
                <td className="p-3 border">{project.amount}</td>

                <td
                  className={`p-3 border ${
                    project.status === "In Progress"
                      ? "text-yellow-600"
                      : project.status === "Delayed"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}>
                  {project.status}
                </td>
                <td className="p-3 flex space-x-2">
                  <Link href={`/dashboard/project/${project.id}`}>
                    <FaEye className="text-blue-500 cursor-pointer" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectPage;
