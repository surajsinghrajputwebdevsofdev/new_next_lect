"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TestResults: React.FC = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

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
  ];

  const [results, setResults] = useState(initialResults);
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
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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
            onChange={(e) => setphoneNumber(e.target.value)}
            style={styles.input}
            required
          />
        </div>
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
          {results.map((result, index) => (
            <tr key={index}>
              <td style={styles.td}>{result.test}</td>
              <td style={styles.td}>
                <div style={styles.resultContainer}>
                  <input
                    type="text"
                    value={result.result}
                    onChange={(e) => handleResultChange(index, e.target.value)}
                    style={{
                      ...styles.resultInput,
                      borderColor: isOutOfRange(result.result, result.range)
                        ? "red"
                        : "#ccc",
                    }}
                    required
                  />
                  <span>{result.unit}</span>
                </div>
              </td>
              <td style={styles.td}>{result.range}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit" style={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "'Arial', sans-serif",
    width: "75%",
    margin: "20px auto",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  logo: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  timing: {
    textAlign: "right" as "right",
  },
  title: {
    textAlign: "center" as "center",
    fontSize: "1.5em",
    marginBottom: "20px",
  },

  patientInfo: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "3px",
    fontSize: "1em",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    width: "150px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #ccc",
    padding: "10px",
    textAlign: "left" as "left",
  },
  td: {
    borderBottom: "1px solid #ccc",
    padding: "10px",
  },
  resultContainer: {
    display: "flex",
    alignItems: "center",
  },
  resultInput: {
    padding: "3px",
    fontSize: "1em",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "80px",
    marginRight: "5px",
  },
  submitButton: {
    padding: "10px 100px",
    fontSize: "1em",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default TestResults;
