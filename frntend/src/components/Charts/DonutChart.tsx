'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Box, Typography } from '@mui/material';

interface DonutChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  title: string;
}

export const DonutChart = ({ data, title }: DonutChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid #e2e8f0',
        p: 3,
        height: 400,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#0f172a',
          fontWeight: 600,
          fontSize: '16px',
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="70%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Box sx={{ mt: 2 }}>
        {data.map((item) => (
          <Box
            key={item.name}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: item.color,
                }}
              />
              <Typography variant="body2" sx={{ color: '#64748b', fontSize: '13px' }}>
                {item.name}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#0f172a', fontWeight: 600, fontSize: '13px' }}>
              {((item.value / total) * 100).toFixed(0)}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
