import mongoose from "mongoose";
const ReportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    labId: {
      type: String,
      required: [true, "lab id is required"],
    },
    date: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    results: [
        {
          test: String,
          result: String,
          unit: String,
          range: String,
        },
      ],
    patientNumber: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ReportModel = mongoose.model("testreport", ReportSchema);




---------------------------------------------------------------------------------------

import Link from "next/link";
import React from "react";

interface CardComponentProps {
  image: string;
  name: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ image, name }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg" style={{ margin: "1%", borderRadius: "10px" }}>
      <Link href={`/auth/test-result?test=${encodeURIComponent(name)}`}>
        <img className="w-full" style={{ height: "200px", width: "400px", objectFit: "cover" }} src={image} alt={name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 ml-28">
            <svg height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M192 48c0-26.5 21.5-48 48-48H400c26.5 0 48 21.5 48 48V512H368V432c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H192V48zM48 96H160V512H48c-26.5 0-48-21.5-48-48V320H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V224H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V144c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v48H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80V464c0 26.5-21.5 48-48 48H480V96H592zM312 64c-8.8 0-16 7.2-16 16v24H272c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h24v24c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V152h24c8.8 0 16-7.2 16-16V120c0-8.8-7.2-16-16-16H344V80c0-8.8-7.2-16-16-16H312z"/>
            </svg>
            {name}
          </div>
        </div>
      </Link>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const cardData = [
    { image: "https://www.nirujahealthtech.com/wp-content/uploads/2020/04/cardiology.png", name: "Heart Test" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOwIO8B2WExEg7MnExi2q0iRkIHmnjkD_Vg&s", name: "Eye's Test" },
    { image: "https://www.brighamandwomens.org/assets/BWH/lung-center/images/tlc-promo-diseases-and-conditions-700x400.jpg", name: "Lungs Test" },
    { image: "https://compote.slate.com/images/fb3403a0-6ffc-471a-8568-b0f01fa3bd6b.jpg", name: "Brain Test" },
    { image: "https://www.metropolisindia.com/upgrade/blog/upload/2023/08/WhatsApp-Image-2023-08-29-at-4.17.55-PM.webp", name: "Blood Test" },
    { image: "https://www.fda.gov/files/COVID%20testing%20policy%20drupal.jpg", name: "Covid Test" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {cardData.map((card, index) => (
        <CardComponent key={index} image={card.image} name={card.name} />
      ))}
    </div>
  );
};

export default Dashboard;


-------------------------------------------------------------------------------------------------------------------

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TestResults: React.FC = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
    { test: "heart lp", result: "", unit: "mmol/L", range: "2.2 - 2.7" },
    { test: "heart", result: "", unit: "mmol/L", range: "0.8 - 1.5" },
    { test: "heart bh", result: "", unit: "mmol/L", range: "136 - 146" },
    { test: "heart hy", result: "", unit: "mmol/L", range: "3.5 - 5.1" },
    { test: "heart ew", result: "", unit: "mmol/L", range: "101 - 109" },
    { test: "heart Acid", result: "", unit: "mmol/L", range: "101 - 109" },
  ];

  const [results, setResults] = useState(initialResults);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:7099/api/v1/auth/testresult",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            labId: localStorage.getItem("labId"),





            name,
            date,
            patientNumber,
            age,
            sex,
            phoneNumber,
            results,
          }),
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
      : results.filter((result) => result.test.toLowerCase().includes(selectedCategory));

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <input hidden value={localStorage.getItem("labId") || ""} />
      <div style={styles.header}>
        <div style={styles.logo}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
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
        <div style={styles.timing}>Timing: 7:00 AM to 7:00 PM</div>
        <div style={styles.Phone}>Phone No. 99999-99999</div>
      </div>
      <h2 style={styles.title}>TEST RESULTS</h2>
      <div style={styles.patientInfo}>
        <div>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            autoFocus
            required
          />
        </div>
        <div>
          Date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div>
          Patient No:{" "}
          <input
            type="text"
            value={patientNumber}
            onChange={(e) => setPatientNumber(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div>
          Age:{" "}
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={styles.input}
            required
          />{" "}
        </div>
        <div>
          Sex:{" "}
          <input
            type="text"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div>
          Phone Number:{" "}
          <input
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={styles.input}
            required
          />
        </div>
      </div>
      <div style={styles.categoryButtons}>
        <button type="button" onClick={() => setSelectedCategory("all")} style={styles.categoryButton}>
          All
        </button>
        <button type="button" onClick={() => setSelectedCategory("heart")} style={styles.categoryButton}>
          Heart
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Test</th>
            <th style={styles.th}>Results</th>
            <th style={styles.th}>Reference Range</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((result, index) => (
            <tr key={index}>
              <td style={styles.td}>{result.test}</td>
              <td style={styles.td}>
                <input
                  type="text"
                  value={result.result}
                  onChange={(e) => handleResultChange(index, e.target.value)}
                  style={styles.input}
                />
              </td>
              <td style={styles.td}>{result.range}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit" style={styles.submitButton}>Submit</button>
    </form>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
  },
  timing: {
    fontSize: "16px",
  },
  Phone: {
    fontSize: "16px",
  },
  title: {
    margin: "20px 0",
    fontSize: "24px",
  },
  patientInfo: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  categoryButtons: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  categoryButton: {
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  submitButton: {
    padding: "10px 20px",
    marginTop: "20px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
};

export default TestResults;





--------------------------------------------------------------------------------------------------------------------------------------




"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import twilio from "twilio";

const TestResults: React.FC = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
    {
      test: "Blood Urea Nitrogen",
      result: "",
      unit: "mmol/L",
      range: "35.9 - 154.7",
    },
    { test: "Ig G", result: "", unit: "g/L", range: "2.86 - 7.14" },
    { test: "Ig A", result: "", unit: "mg/L", range: "0.7 - 1.6" },
    { test: "Ig M", result: "", unit: "mg/L", range: "700 - 4000" },
    { test: "heart lp", result: "", unit: "mmol/L", range: "2.2 - 2.7" },
    { test: "heart", result: "", unit: "mmol/L", range: "0.8 - 1.5" },
    { test: "heart bh", result: "", unit: "mmol/L", range: "136 - 146" },
    { test: "heart hy", result: "", unit: "mmol/L", range: "3.5 - 5.1" },
    { test: "heart ew", result: "", unit: "mmol/L", range: "101 - 109" },
    { test: "heart Acid", result: "", unit: "mmol/L", range: "101 - 109" },
  ];

  const [results, setResults] = useState(initialResults);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:7099/api/v1/auth/testresult",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            labId: localStorage.getItem("labId"),
            name,
            date,
            patientNumber,
            age,
            sex,
            phoneNumber,
            results,
          }),
        }
      );

      if (response.ok) {
        alert("Data saved successfully");

        // Create ZIP file
        const zip = new JSZip();
        const resultsStr = results.map(result => `${result.test}: ${result.result} ${result.unit} (Range: ${result.range})`).join("\n");
        zip.file("results.txt", resultsStr);
        const zipBlob = await zip.generateAsync({ type: "blob" });

        // Send ZIP file to WhatsApp
        const twilioClient = twilio("TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN");
        const mediaUrl = await uploadToServer(zipBlob); // Function to upload the blob to your server and get a URL

        await twilioClient.messages.create({
          from: "whatsapp:+14155238886", // Twilio sandbox number
          to: `whatsapp:+${phoneNumber}`,
          body: "Here are your test results.",
          mediaUrl: mediaUrl,
        });

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
      : results.filter((result) => result.test.toLowerCase().includes(selectedCategory));

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <input hidden value={localStorage.getItem("labId") || ""} />
      <div style={styles.header}>
        <div style={styles.logo}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
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
        <div style={styles.timing}>Timing: 7:00 AM to 7:00 PM</div>
        <div style={styles.Phone}>Phone No. 99999-99999</div>
      </div>
      <h2 style={styles.title}>TEST RESULTS</h2>
      <div style={styles.patientInfo}>
        <div>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            autoFocus
            required
          />
        </div>
        <div>
          Date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div>
          Patient No:{" "}
          <input
            type="text"
            value={patientNumber}
            onChange={(e) => setPatientNumber(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div>
          Age:{" "}
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={styles.input}
            required
          />{" "}
        </div>
        <div>
          Sex:{" "}
          <input
            type="text"

          value={sex}
          onChange={(e) => setSex(e.target.value)}
          style={styles.input}
          required
        />
      </div>
      <div>
        Phone Number:{" "}
        <input
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={styles.input}
          required
        />
      </div>
    </div>
    <div style={styles.categoryButtons}>
      <button type="button" onClick={() => setSelectedCategory("all")} style={styles.categoryButton}>
        All
      </button>
      <button type="button" onClick={() => setSelectedCategory("heart")} style={styles.categoryButton}>
        Heart
      </button>
    </div>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Test</th>
          <th style={styles.th}>Results</th>
          <th style={styles.th}>Reference Range</th>
        </tr>
      </thead>
      <tbody>
        {filteredResults.map((result, index) => (
          <tr key={index}>
            <td style={styles.td}>{result.test}</td>
            <td style={styles.td}>
              <input
                type="text"
                value={result.result}
                onChange={(e) => handleResultChange(index, e.target.value)}
                style={styles.input}
                required
              />
              {isOutOfRange(result.result, result.range) && <span style={{ color: "red" }}> (Out of Range)</span>}
            </td>
            <td style={styles.td}>{result.range}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button type="submit" style={styles.submitButton}>Submit</button>
  </form>
  );
};

// Placeholder function for uploading the ZIP blob to your server
async function uploadToServer(zipBlob) {
  const formData = new FormData();
  formData.append('file', zipBlob, 'results.zip');

  const response = await fetch('/upload-endpoint', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    return data.url; // Return the URL where the ZIP file is accessible
  } else {
    throw new Error('Failed to upload ZIP file');
  }
}

const styles = {
  container: { maxWidth: "600px", margin: "0 auto", padding: "20px" },
  header: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
  logo: { display: "flex", alignItems: "center" },
  timing: { fontSize: "14px" },
  Phone: { fontSize: "14px" },
  title: { textAlign: "center", marginBottom: "20px" },
  patientInfo: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" },
  input: { width: "100%", padding: "8px", margin: "5px 0" },
  categoryButtons: { textAlign: "center", marginBottom: "20px" },
  categoryButton: { margin: "0 5px", padding: "10px 20px" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { border: "1px solid #ddd", padding: "8px", textAlign: "left" },
  td: { border: "1px solid #ddd", padding: "8px" },
  submitButton: { width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" },
};

export default TestResults;

---------------------------------------------------------------------------------------------------------

// models/TestResult.js
const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  labId: String,
  name: String,
  date: Date,
  patientNumber: String,
  age: String,
  sex: String,
  phoneNumber: String,
  results: [
    {
      test: String,
      result: String,
      unit: String,
      range: String,
    },
  ],
  zipFileUrl: String,
});

module.exports = mongoose.model('TestResult', testResultSchema);





export default ReportModel;
