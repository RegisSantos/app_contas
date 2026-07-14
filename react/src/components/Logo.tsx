// src/components/Logo.tsx

export default function Logo() {
  return (
    <svg
      width="200"
      height="35"
      viewBox="0 0 190 33"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[190px] h-auto"
    >
      <text
        x="0"
        y="33"
        fill="currentColor"
        className="font-bold"
        style={{
          fontSize: "40px",
          fontFamily: "Segoe UI, Arial, sans-serif",
        }}
      >
        Contas
      </text>

      <text
        x="128"
        y="34"
        fill="#2563eb"
        style={{
          fontSize: "44px",
          fontWeight: 700,
          fontFamily: "Segoe UI, Arial, sans-serif",
        }}
      >
        Go
      </text>
    </svg>
  );
}