import React from "react";
import testData from "../assets/questions.json";
import { IQuestionData, ICategory, IQuestion } from "../types/types";

const STAGE_LABELS: Record<string, string> = {
  SINGLE_LEOPARDY: "Single Leopardy",
  DOUBLE_LEOPARDY: "Double Leopardy",
  TRIPLE_LEOPARDY: "Triple Leopardy",
  QUADRUPLE_LEOPARDY: "Quadruple Leopardy",
  FINAL_LEOPARDY: "Final Leopardy",
};

const HostKey: React.FC = () => {
  const stages: IQuestionData[] = testData.data as IQuestionData[];

  return (
    <div
      style={{
        backgroundColor: "#060CE9",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "Swiss911, Arial Narrow, Arial, sans-serif",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "2rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        Host Answer Key
      </h1>

      {stages.map((stage) => (
        <section key={stage.stage} style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.6rem",
              textTransform: "uppercase",
              backgroundColor: "#000080",
              padding: "0.5rem 1rem",
              marginBottom: "1.5rem",
              borderRadius: "4px",
              letterSpacing: "0.08em",
            }}
          >
            {STAGE_LABELS[stage.stage] ?? stage.stage}
          </h2>

          {stage.categories.map((category: ICategory) => (
            <div key={category.id} style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  textTransform: "uppercase",
                  backgroundColor: "#000060",
                  padding: "0.4rem 0.75rem",
                  marginBottom: "0",
                  borderRadius: "4px 4px 0 0",
                  letterSpacing: "0.06em",
                }}
              >
                {category.name}
              </h3>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#000050" }}>
                    <th style={thStyle}>Value</th>
                    <th style={thStyle}>Answer (read aloud)</th>
                    <th style={thStyle}>Question (correct response)</th>
                  </tr>
                </thead>
                <tbody>
                  {category.questions.map((q: IQuestion) => (
                    <tr
                      key={q.id}
                      style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
                    >
                      <td style={{ ...tdStyle, whiteSpace: "nowrap", width: "5rem", textAlign: "center" }}>
                        {q.isDailyDouble ? (
                          <span>
                            ${q.value}{" "}
                            <span
                              style={{
                                fontSize: "0.7rem",
                                backgroundColor: "#FFD700",
                                color: "#000",
                                padding: "1px 4px",
                                borderRadius: "2px",
                                marginLeft: "4px",
                              }}
                            >
                              DD
                            </span>
                          </span>
                        ) : (
                          `$${q.value}`
                        )}
                      </td>
                      <td style={tdStyle}>{q.answer}</td>
                      <td style={tdStyle}>{q.question}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

const thStyle: React.CSSProperties = {
  padding: "0.4rem 0.75rem",
  textAlign: "left",
  textTransform: "uppercase",
  fontSize: "0.75rem",
  letterSpacing: "0.05em",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
};

const tdStyle: React.CSSProperties = {
  padding: "0.5rem 0.75rem",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  verticalAlign: "top",
  lineHeight: "1.4",
};

export default HostKey;
