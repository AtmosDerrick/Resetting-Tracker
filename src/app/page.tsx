"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Home: React.FC = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      console.log(result);

      if (result?.error) {
        return result.error === "CredentialsSignin"
          ? alert(
              "Invalid credentials. Please check your username and password."
            )
          : alert("Failed to sign-in. Please try again.");
      } else {
        router.push("/dashboard/overview");
      }
    } catch (err: any) {
      console.log(err, "kl");
      alert(err?.data?.message || "Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <Input
                label="Username"
                name="username"
                type="text"
                placeholder="Enter your username"
              />

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
