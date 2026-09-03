import { site } from "@/data/site";

export type Credential = { label: string; value: string };

export const lenders = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "LIC Housing Finance",
    "Axis Bank",
    "Bank of Baroda",
    "PNB Housing",
];

export const credentials: Credential[] = [
    { label: "Registration", value: `CIN ${site.cin}` },
    { label: "Membership", value: "CREDAI Bengal member" },
    { label: "Quality", value: "ISO 9001:2015 processes" },
    { label: "Audit", value: "Third-party structural audit" },
];
