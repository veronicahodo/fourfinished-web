interface PieProps {
    value: number; // 0 to 100
    size?: number; // in pixels
    stroke?: string;
    fill?: string;
    background?: string;
}

export const PieChart = ({
    value,
    size = 100,
    stroke = "#1c98eb",
    fill = "none",
    background = "#e6e6e6",
}: PieProps) => {
    const radius = size / 2;
    const r = radius - 8;
    const circumference = 2 * Math.PI * r;
    const clampedValue = Math.max(0, Math.min(100, value));
    const offset = circumference * (1 - clampedValue / 100);

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle */}
            <circle
                cx={radius}
                cy={radius}
                r={r}
                stroke={background}
                strokeWidth={4}
                fill={fill}
            />
            {/* Progress arc */}
            <circle
                cx={radius}
                cy={radius}
                r={r}
                stroke={stroke}
                strokeWidth={4}
                fill={fill}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${radius} ${radius})`}
            />
        </svg>
    );
};
