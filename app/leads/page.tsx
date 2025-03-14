"use client";
import { useState, useEffect } from "react";
import styles from "./leads.module.css";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedIn: string;
  visas: string[];
  resume: string | null;
  additionalInfo: string;
  status: "PENDING" | "REACHED_OUT";
}

export default function Leads() {
  const placeholderLeads: Lead[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      linkedIn: "https://linkedin.com/in/johndoe",
      visas: ["H1B", "F1"],
      resume: null, // Assuming no file is uploaded initially
      additionalInfo: "Looking for remote work",
      status: "PENDING",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      linkedIn: "https://linkedin.com/in/janesmith",
      visas: ["Green Card"],
      resume: null, // Assuming no file is uploaded initially
      additionalInfo: "Has work experience in AI",
      status: "PENDING",
    },
    {
      id: "3",
      firstName: "Alex",
      lastName: "Johnson",
      email: "alex.johnson@example.com",
      linkedIn: "https://linkedin.com/in/alexjohnson",
      visas: ["F1"],
      resume: null, // Assuming no file is uploaded initially
      additionalInfo: "Looking for a software engineering role",
      status: "PENDING",
    },
  ];
  const [leads, setLeads] = useState<Lead[]>(placeholderLeads);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/get-leads");
        const data = await response.json();
        const formattedLeads = data.map((lead: Lead) => ({
          ...lead,
          status: lead.status as "PENDING" | "REACHED_OUT",
        }));

        setLeads(formattedLeads); // Now it's typed correctly
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };
    fetchLeads();
  }, []);

  const handleStatusChange = (id: string) => {
    const updatedLeads = leads.map((lead) =>
      lead.id === id
        ? { ...lead, status: "REACHED_OUT" as "PENDING" | "REACHED_OUT" }
        : lead
    );
    console.log("updatedLeads ", updatedLeads);
    setLeads(updatedLeads);
  };

  return (
    <div className={styles.leadsContainer}>
      <h1 className={styles.title}>Leads</h1>
      <table className={styles.leadsTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>First Name</th>
            <th className={styles.tableHeader}>Last Name</th>
            <th className={styles.tableHeader}>Email</th>
            <th className={styles.tableHeader}>Visas</th>
            <th className={styles.tableHeader}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className={styles.tableData}>{lead.firstName}</td>
              <td className={styles.tableData}>{lead.lastName}</td>
              <td className={styles.tableData}>{lead.visas.join(", ")}</td>
              <td className={styles.tableData}>{lead.status}</td>
              <td className={styles.tableData}>
                <button
                  className={styles.statusButton}
                  onClick={() => handleStatusChange(lead.id)}
                >
                  Change Status to REACHED_OUT
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
