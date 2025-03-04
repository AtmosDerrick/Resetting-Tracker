"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import Input from "@/components/ui/Input";

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const registerResponse = await axios.post(
        "https://resetting-tracker.onrender.com/api/users/register/",
        {
          username: values.username,
          password: values.password,
        }
      );

      if (registerResponse.status !== 201) {
        throw new Error(registerResponse.data.message || "Registration failed");
      }

      const signInResponse = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      if (signInResponse?.error) {
        throw new Error(signInResponse.error);
      }

      alert("Registration and sign-in successful!");
      router.push("/dashboard/overview");
    } catch (error: any) {
      alert(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <Formik
          initialValues={{ username: "", password: "", confirmPassword: "" }}
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

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
