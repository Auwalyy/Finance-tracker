// import { createContext, useState } from "react";

// interface FinancialRecord {
//     id: String,
//     userId: String,
//     date: Date,
//     amount: number,
//     category: String,
//     description: String,
//     paymentMethod: String,
// }

// interface FinancialRecordsContextType {
//     records: FinancialRecord[];
//     addRecord: { records: FinancialRecord} => void;
//     updateRecord: { id: String, newRecord: FinancialRecord} => void;
//     deleteRecord: { id: String } => void
// }

// export const FinancialRecordContext = createContext<
// FinancialRecordsContextType | undefined
// >(undefined);

// export const FinancialRecordsProvider = ({
//     children,
// }: {
//     children: React.ReactMode;
// }) => {

//     const [records, setRecords] = useState<FinancialRecord[]>({});

//     retrun (
//         <FinancialRecordContext.Provider value={{}}>
//             {""}
//             {children}
//         </FinancialRecordContext.Provider>
//     )
// }


import { createContext, useState } from "react";

const FinancialRecordContext = createContext({
    records: [],
    addRecord: () => {},
    updateRecord: () => {},
});

export const FinancialRecordProvider = ({ children }) => {
    const [records, setRecords] = useState([]);

    const addRecord = async (record) => {
        try {
            const response = await fetch("http://localhost:5000/financial-record", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(record)
            });

            if (response.ok) {
                const newRecord = await response.json();
                setRecords([...records, newRecord]); // Use the returned newRecord
            } else {
                console.error("Failed to add record:", response.statusText);
            }
        } catch (err) {
            console.error("Error adding record:", err);
        }
    };

    const updateRecord = (id, newRecord) => {
        setRecords(records.map(record => 
            record.id === id ? { ...record, ...newRecord } : record
        ));
    };

    return (
        <FinancialRecordContext.Provider value={{ records, addRecord, updateRecord }}>
            {children}
        </FinancialRecordContext.Provider>
    );
};

export default FinancialRecordContext;
