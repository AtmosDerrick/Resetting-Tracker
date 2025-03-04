"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCreateProjectMutation } from "@/redux/slices/projectApiSlice";
import Input from "@/components/ui/Input";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Project Name is required"),
  partner: Yup.string().required("Partner is required"),
  beneficiary_mmdce: Yup.string().required("Beneficiary MMDCE is required"),
  beneficiary_community: Yup.string().required(
    "Beneficiary Community is required"
  ),
  amount: Yup.number().required("Amount is required").positive(),
  amount_currency: Yup.string().required("Currency is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be after Start Date"),
});

const Page = () => {
  const router = useRouter();
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const initialValues = {
    name: "",
    partner: "",
    beneficiary_mmdce: "",
    beneficiary_community: "",
    amount: "",
    amount_currency: "GHS",
    description: "",
    status: "Not Started",
    startDate: "",
    endDate: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await createProject(values).unwrap();
      alert("Project created successfully!");
      router.push("/dashboard/project/");
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to create project. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Project
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {() => (
            <Form className="grid grid-cols-2 gap-4">
              <Field
                as={Input}
                label="Project Name"
                type="text"
                name="name"
                required
              />
              <Field
                as={Input}
                label="Partner"
                type="text"
                name="partner"
                required
              />
              <Field
                as={Input}
                label="Beneficiary MMDCE"
                type="text"
                name="beneficiary_mmdce"
                required
              />
              <Field
                as={Input}
                label="Beneficiary Community"
                type="text"
                name="beneficiary_community"
                required
              />
              <Field
                as={Input}
                label="Amount"
                type="number"
                name="amount"
                required
              />

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">
                  Currency
                </label>
                <Field
                  as="select"
                  name="amount_currency"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  required>
                  <option value="GHS">GHS</option>
                  <option value="USD">USD</option>
                </Field>
                <ErrorMessage
                  name="amount_currency"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <Field
                as={Input}
                label="Start Date"
                type="date"
                name="startDate"
                required
              />
              <Field
                as={Input}
                label="End Date"
                type="date"
                name="endDate"
                required
              />

              {/* Status Selector */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">
                  Status
                </label>
                <Field
                  as="select"
                  name="status"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  required>
                  <option value="Not Started">Not Started</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Delayed">Delayed</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div className="mb-4 col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={3}
                  required
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="col-span-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                {isLoading ? "Creating..." : "Create Project"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Page;
