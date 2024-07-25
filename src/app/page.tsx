"use client";
import styles from "./page.module.css";
import React, { ComponentProps, ReactNode } from "react";

export default function Home() {
  const calculatorLayout: string[][] = [
    ["1", "2", "3", "C", "*"],
    ["4", "5", "6", "-", "/"],
    [".", "0", "=", "+", "+"],
  ];
  const numberOfRows = calculatorLayout.length;
  const numberOfColumns = calculatorLayout[0].length;
  const buttonWidth = "100px";
  const buttonHeight = "100px";

  const buttonPad = React.useRef(null);
  const equationPreview = React.useRef(null);
  const [equation, setEquation] = React.useState("");
  const [calculatorWidth, setCalculatorWidth] = React.useState(0);

  const calculate = (equation: string) => {
    try {
      const result = eval(equation);
      setEquation(result.toString());
    } catch (error) {
      setEquation("Error");
    }
  };
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.target as HTMLButtonElement;
    const buttonText = button.textContent;
    if (buttonText === "=") {
      // setEquation(equation);
      calculate(equation);
    } else if (buttonText === "C") {
      setEquation("");
    } else {
      setEquation(equation + buttonText);
    }
  };

  React.useEffect(() => {
    if (buttonPad.current) {
      // @ts-expect-error
      setCalculatorWidth(buttonPad.current.clientWidth);
    }
  }, []);

  React.useEffect(() => {
    if (equationPreview.current) {
      //@ts-expect-error
      equationPreview.current.scrollLeft =
        // @ts-expect-error
        equationPreview.current.scrollWidth + 20;
    }
  }, [equationPreview.current]);
  return (
    <main
      style={{ width: calculatorWidth }}
      className={styles.main}>
      <div
        ref={equationPreview}
        className={styles.equationPreview}>
        {equation}
      </div>

      <div
        ref={buttonPad}
        className={styles.buttonsContainer}
        style={{
          gridTemplateRows: `repeat(${numberOfRows + 1}, ${buttonHeight})`,
        }}>
        {calculatorLayout.map((row: string[], index: number) => {
          const elements: ReactNode[] = row.map(
            (ele: string, index: number) => {
              if (ele === row[index - 1]) return;
              return (
                <button
                  onClick={handleButtonClick}
                  className={styles.button}
                  style={{
                    gridColumn:
                      ele === row[index + 1]
                        ? `${index + 1}/${index + 3}`
                        : "initial",
                  }}
                  key={index}>
                  {ele}
                </button>
              );
            },
          );
          return (
            <div
              style={{
                gridTemplateColumns: `repeat(${numberOfColumns}, ${buttonWidth})`,
              }}
              key={index}>
              {elements}
            </div>
          );
        })}
      </div>
    </main>
  );
}
