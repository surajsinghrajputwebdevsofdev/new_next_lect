"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import initialResults from "../(staticData)/test-result";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { TestResultData, TestResult } from "../(zipfileiterfaces)/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TestresultSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "../(network)/instance";

const TestResults: React.FC = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [results, setResults] = useState<TestResult[]>(initialResults);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [submitCategory, setSubmitCategory] = useState("all");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { test } = router.query;

  const form = useForm<z.infer<typeof TestresultSchema>>({
    resolver: zodResolver(TestresultSchema),
    defaultValues: {
      name,
      date,
      patientNumber,
      age,
      sex,
      phoneNumber,
    },
  });

  useEffect(() => {
    if (test) {
      const filteredResults = initialResults.filter((result) => result.id === test);
      setResults(filteredResults);
      setSelectedCategory(test);
    }
  }, [test]);

  const handleResultChange = (index: number, value: string) => {
    const newResults = [...results];
    newResults[index].result = value;
    setResults(newResults);
  };

  const isOutOfRange = (result: string, range: string) => {
    const [min, max] = range.split(" - ").map(Number);
    const resultValue = parseFloat(result);
    return resultValue < min || resultValue > max;
  };

  const generateZipFile = (data: TestResultData) => {
    const zip = new JSZip();
    const jsonData = JSON.stringify(data, null, 2);
    zip.file("test-results.json", jsonData);

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "test-results.zip");
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const filledResults = results.filter(
        (result) => result.result.trim() !== ""
      );
      const filteredResults =
        submitCategory === "all"
          ? filledResults
          : filledResults.filter((result) =>
              result.test.toLowerCase().includes(submitCategory)
            );

      const dataToSave: TestResultData = {
        labId: localStorage.getItem("labId"),
        name,
        date,
        patientNumber,
        age,
        sex,
        phoneNumber,
        results: filteredResults,
      };

      generateZipFile(dataToSave);
      const response = await fetch(
       `${BASE_URL}/auth/testresult`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSave),
        }
      );

      if (response.ok) {
        alert("Data saved successfully");
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        alert(`Failed to save data: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving data. Please try again.");
    }
  };

  const filteredResults =
    selectedCategory === "all"
      ? results
      : results.filter((result) =>
          result.test.toLowerCase().includes(selectedCategory)
        );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center p-8 bg-gray-100"
      >
        <input hidden value={localStorage.getItem("labId") || ""} />
        <div className="flex justify-between w-full p-4 border-b border-gray-300">
          <div className="flex items-center text-lg">
            <svg
              className="w-6 h-6 mr-2 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
              />
            </svg>
            PAHUJA LABORATORY
          </div>
          <div className="text-base">Timing: 7:00 AM to 7:00 PM</div>
          <div className="text-base">Phone No. 99999-99999</div>
        </div>
        <h2 className="my-8 text-2xl font-bold">TEST RESULTS</h2>
        <div className="grid w-full gap-4 mb-4 sm:grid-cols-2 md:grid-cols-3">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border rounded-lg"
                    autoFocus
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date:</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border rounded-lg"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="patientNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient No:</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={patientNumber}
                    onChange={(e) => setPatientNumber(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border rounded-lg"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age:</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border rounded-lg"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sex:</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border rounded-lg"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number:</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border rounded-lg"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center mb-6">
          <Button



















---------------------------------------------------------------------------------------------------




const initialResults = [
  { test: "White cells blood", result: "", unit: "/ L", range: "4.0 - 10.0" },
  { test: "Hemoglobin", result: "", unit: "g/L", range: "350 - 350" },
  { test: "Protein", result: "", unit: "g/L", range: "66 - 83" },
  { test: "Albumin", result: "", unit: "g/L", range: "35 - 52" },
  { test: "Creatinine", result: "", unit: "mmol/L", range: "44.2 - 79.6" },
  { test: "Calcium", result: "", unit: "mmol/L", range: "2.2 - 2.7" },
  { test: "Phosphorus", result: "", unit: "mmol/L", range: "0.8 - 1.5" },
  { test: "Sodium", result: "", unit: "mmol/L", range: "136 - 146" },
  { test: "Potassium", result: "", unit: "mmol/L", range: "3.5 - 5.1" },
  { test: "Chloride", result: "", unit: "mmol/L", range: "101 - 109" },
  { test: "Uric Acid", result: "", unit: "mmol/L", range: "101 - 109" },
  { test: "Blood Urea Nitrogen", result: "", unit: "mmol/L", range: "35.9 - 154.7" },
  { test: "Ig G", result: "", unit: "g/L", range: "2.86 - 7.14" },
  { test: "Ig A", result: "", unit: "mg/L", range: "0.7 - 1.6" },
  { test: "Ig M", result: "", unit: "mg/L", range: "700 - 4000" },
  { id: "heart", test: "heart lp", result: "", unit: "mmol/L", range: "2.2 - 2.7" },
  { id: "heart", test: "heart", result: "", unit: "mmol/L", range: "0.8 - 1.5" },
  { id: "heart", test: "heart bh", result: "", unit: "mmol/L", range: "136 - 146" },
  { id: "heart", test: "heart hy", result: "", unit: "mmol/L", range: "3.5 - 5.1" },
  { id: "heart", test: "heart ew", result: "", unit: "mmol/L", range: "101 - 109" },
  { id: "heart", test: "heart Acid", result: "", unit: "mmol/L", range: "101 - 109" },
  { id: "lung", test: "lung Acid", result: "", unit: "mmol/L", range: "101 - 109" },
];

export default initialResults;





-------------------------------------------------------------------------------------------------


import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import Link from "next/link";
import cardData from "../(staticData)/dashboard-images";

interface CardComponentProps {
  image: string;
  name: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ image, name }) => {
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg"
      style={{ margin: "1%", borderRadius: "10px" }}
    >
      <Link href={`/test-result?test=${encodeURIComponent(name)}`}>
        <img className="w-full h-52 object-cover" src={image} alt={name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-center flex items-center justify-center space-x-2">
            <svg
              height={30}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M192 48c0-26.5 21.5-48 48-48H400c26.5 0 48 21.5 48 48V512H368V432c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H192V48zM48 96H160V512H48c-26.5 0-48-21.5-48-48V320H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V224H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V144c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v48H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80V464c0 26.5-21.5 48-48 48H480V96H592zM312 64c-8.8 0-16 7.2-16 16v24H272c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h24v24c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V152h24c8.8 0 16-7.2 16-16V120c0-8.8-7.2-16-16-16H344V80c0-8.8-7.2-16-16-16H312z" />
            </svg>
            <span>{name}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        useKeyboardArrows={true}
        autoPlay={true}
        interval={5000}
      >
        {cardData.map((card, index) => (
          <div key={index}>
            <CardComponent image={card.image} name={card.name} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Dashboard;
