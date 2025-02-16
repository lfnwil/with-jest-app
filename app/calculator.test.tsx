import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./calculator";

describe("Calculatrice", () => {
    const setup = () => {
        render(<Calculator />);
        const inputA = screen.getByPlaceholderText("Nombre A");
        const inputB = screen.getByPlaceholderText("Nombre B");
        const select = screen.getByRole("combobox");
        const button = screen.getByText("Calculer");
        const result = screen.getByText(/Résultat/i);
        return { inputA, inputB, select, button, result };
    };

    test("Addition fonctionne correctement", () => {
        const { inputA, inputB, select, button, result } = setup();
        fireEvent.change(inputA, { target: { value: "5" } });
        fireEvent.change(inputB, { target: { value: "3" } });
        fireEvent.change(select, { target: { value: "+" } });
        fireEvent.click(button);
        expect(result).toHaveTextContent("8");
    });

    test("Soustraction fonctionne correctement", () => {
        const { inputA, inputB, select, button, result } = setup();
        fireEvent.change(inputA, { target: { value: "10" } });
        fireEvent.change(inputB, { target: { value: "4" } });
        fireEvent.change(select, { target: { value: "-" } });
        fireEvent.click(button);
        expect(result).toHaveTextContent("6");
    });

    test("Multiplication fonctionne correctement", () => {
        const { inputA, inputB, select, button, result } = setup();
        fireEvent.change(inputA, { target: { value: "7" } });
        fireEvent.change(inputB, { target: { value: "6" } });
        fireEvent.change(select, { target: { value: "*" } });
        fireEvent.click(button);
        expect(result).toHaveTextContent("42");
    });

    test("Division fonctionne correctement", () => {
        const { inputA, inputB, select, button, result } = setup();
        fireEvent.change(inputA, { target: { value: "20" } });
        fireEvent.change(inputB, { target: { value: "4" } });
        fireEvent.change(select, { target: { value: "/" } });
        fireEvent.click(button);
        expect(result).toHaveTextContent("5");
    });

    test("Division par zéro renvoie une erreur", () => {
        const { inputA, inputB, select, button, result } = setup();
        fireEvent.change(inputA, { target: { value: "10" } });
        fireEvent.change(inputB, { target: { value: "0" } });
        fireEvent.change(select, { target: { value: "/" } });
        fireEvent.click(button);
        expect(result).toHaveTextContent("Erreur : Division par zéro");
    });

    test("Entrées non numériques renvoient une erreur", () => {
        const { inputA, inputB, button, result } = setup();
        fireEvent.change(inputA, { target: { value: "abc" } });
        fireEvent.change(inputB, { target: { value: "5" } });
        fireEvent.click(button);
        expect(result).toHaveTextContent("Veuillez entrer des nombres valides");
    });

    test("Opérateur non supporté renvoie une erreur", () => {
        const { inputA, inputB, select, button, result } = setup();
        fireEvent.change(inputA, { target: { value: "5" } });
        fireEvent.change(inputB, { target: { value: "3" } });
        fireEvent.change(select, { target: { value: "%" } }); // Opérateur non supporté
        fireEvent.click(button);
        expect(result).toHaveTextContent("Opérateur non supporté");
    });
});