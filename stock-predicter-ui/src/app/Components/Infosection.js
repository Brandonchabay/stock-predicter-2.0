"use client";

import Link from "next/link";
import TextGeneratorEffect from "./TextGeneratorEffect";

export default function InfoSection() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Already have an account?{"    "}
              <Link href="/login" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Login here <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-5">
              Your AI stock feedback friend
            </h1>
            <TextGeneratorEffect
              className="mt-6 text-lg leading-8 text-gray-600"
              text="A  company uses an AI bot to analyze stock trends, providing real-time insights, personalized advice, and buy/sell recommendations to help investors make informed decisions."
              speed={40}
            />
            <div className="mt-10 flex items-center justify-center align items: center;">
              <Link
                href="signup"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </Link>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
