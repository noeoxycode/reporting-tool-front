'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface OwnershipChartProps {
    ownershipData: Array<{
        name: string;
        value: number;
        individualId: string;
    }>;
    colorsArray: string[];
}

export default function OwnershipChart({ ownershipData, colorsArray }: OwnershipChartProps) {
    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={ownershipData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {ownershipData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colorsArray[index % colorsArray.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => [`${value}%`, 'Pourcentage']}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
