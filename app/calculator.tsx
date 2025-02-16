"use client";

import { useState, useEffect } from "react";

export default function Calculator() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [operator, setOperator] = useState("+");
    const [result, setResult] = useState<number | string>("");
    const [history, setHistory] = useState<{ a: number; b: number; operator: string; result: number | string }[]>([]);

    const operations: { [key: string]: (x: number, y: number) => number | string } = {
        "+": (x, y) => x + y,
        "-": (x, y) => x - y,
        "*": (x, y) => x * y,
        "/": (x, y) => y !== 0 ? (x / y) : "Erreur : Division par zéro"
    };

    async function calculate() {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        if (isNaN(numA) || isNaN(numB)) {
            setResult("Veuillez entrer des nombres valides");
            return;
        }

        const operation = operations[operator];

        if (operation) {
            const operationResult = operation(numA, numB);
            setResult(operationResult);

            // Envoyer l'opération à l'API
            await fetch("/api/history", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ a: numA, b: numB, operator, result: operationResult }),
            });

            // Mettre à jour l'historique
            const res = await fetch("/api/history");
            const data = await res.json();
            setHistory(data);
        } else {
            setResult("Opérateur non supporté");
        }
    }

    return (
        <div className="p-4 max-w-sm mx-auto border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Calculatrice</h2>
            <input 
                type="text" 
                value={a} 
                onChange={(e) => setA(e.target.value)} 
                placeholder="Nombre A" 
                className="border p-2 mb-2 w-full rounded"
            />
            <select 
                value={operator} 
                onChange={(e) => setOperator(e.target.value)} 
                className="border p-2 mb-2 w-full rounded"
            >
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
            <input 
                type="text" 
                value={b} 
                onChange={(e) => setB(e.target.value)} 
                placeholder="Nombre B" 
                className="border p-2 mb-2 w-full rounded"
            />
            <button 
                onClick={calculate} 
                className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            >
                Calculer
            </button>
            <h3 className="mt-4 text-lg font-semibold">Résultat : {result}</h3>

            <h3 className="mt-4 text-lg font-semibold">Historique :</h3>
            <ul className="list-disc pl-5">
                {history.map((entry, index) => (
                    <li key={index}>
                        {entry.a} {entry.operator} {entry.b} = {entry.result}
                    </li>
                ))}
            </ul>
        </div>
    );
} 